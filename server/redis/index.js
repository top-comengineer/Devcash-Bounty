"use strict";

const Redis = require("ioredis");
const redislock = require("ioredis-lock");
const JSONCache = require("redis-json");
const { BigNumber } = require("ethers/utils/bignumber");
const { Op, sequelize, Submission } = require("../models");

// Prefix all DB calls with this
const prefix = process.env.NODE_ENV == "production" ? "devcash" : "devcash:dev";

class RedisDB {
  constructor() {
    // TODO allow customizing host/port
    this.redis = new Redis();
    this.jsonCache = new JSONCache(this.redis);
    this.locker = redislock.createLock(this.redis, { timeout: 500000 });
    this.retryingLocker = redislock.createLock(this.redis, {
      timeout: 200000,
      retries: 10,
      delay: 1000,
    });
  }

  // Cached on-chain uBounties
  async getUBounties() {
    let uBounties = await this.jsonCache.get(`${prefix}:uBounties`);
    if (uBounties == null) {
      return [];
    }
    return uBounties;
  }

  async setUBounties(uBounties, clobber = false) {
    if (typeof uBounties != "object") {
      console.log(
        `Bad call to setUbounties, expected 'object' but got '${typeof uBounties}'`
      );
      return null;
    }
    // Don't add ones we already have
    let toAdd;
    if ((await this.getNUbounties()) > 0 && !clobber) {
      let curUbounties = await this.getUBounties();
      let newBounties = uBounties.concat(curUbounties);
      // Remove duplicates
      toAdd = Array.from(new Set(newBounties.map(bounty => bounty.index)))
      .map(index => {
        return newBounties.find(bounty => bounty.index === index)
      })
    } else {
      toAdd = uBounties;
    }
    await this.jsonCache.set(`${prefix}:uBounties`, toAdd);
    return toAdd;
  }

  async setEventLogCache(event_log, block_number) {
    await this.jsonCache.set(`${prefix}:event_log`, event_log);
    await this.redis.set(`${prefix}:last_block_count`, block_number.toString());
  }

  async getEventLogCache() {
    return await this.jsonCache.get(`${prefix}:event_log`);
  }

  async getLastBlockCount() {
    let asStr = await this.redis.get(`${prefix}:last_block_count`);
    if (asStr == null) {
      return -1;
    }
    return parseInt(asStr);
  }

  async setUBountiesIfNotExistsWithLock(uBounties) {
    try {
      try {
        await this.retryingLocker.acquire(`${prefix}:bountycachelock`);
        await this.setUBounties(uBounties, false);
      } catch (e) {
        console.log(`Error updating bounty cache ${e}`);
      }
      await this.retryingLocker.release();
    } catch (e) {
      // Squish lock-related errors
      console.log(`Exception setting bounty ${e}`);
    }
  }

  async getNUbounties() {
    return (await this.getUBounties()).length;
  }

  async updateBountyCache(etherClient) {
    try {
      try {
        await this.locker.acquire(`${prefix}:bountycachelock`);
        console.log("Updating Bounty Cache");
        let curNUbounties = await this.getNUbounties();
        let onChainUBounties = await etherClient.getNUbounties();
        if (onChainUBounties > curNUbounties) {
          console.log(
            `Adding ${onChainUBounties - curNUbounties} new bounties`
          );
          let uBounties = await etherClient.getUbounties(
            onChainUBounties - curNUbounties
          );
          await this.setUBounties(uBounties);
        } else {
          console.log("No new bounties to add");
        }
        // Update submissions and revisions
        let allUBounties = await this.getUBounties();
        for (const bounty of allUBounties) {
          bounty.submissions = await etherClient.getBountySubmissions(bounty);
        }
        await this.setUBounties(allUBounties, true);
      } catch (e) {
        console.log(`Error updating bounty cache ${e}`);
      }
      await this.locker.release();
    } catch (e) {
      // Squish lock-related errors
    }
  }
}

// exports
module.exports = {
  RedisDB,
};

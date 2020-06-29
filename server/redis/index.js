"use strict";

const Redis = require("ioredis");
const redislock = require("ioredis-lock");
const JSONCache = require("redis-json");

// Prefix all DB calls with this
const prefix = process.env.NODE_ENV == "production" ? "devcash" : "devcash:dev";

class RedisDB {
  constructor() {
    // TODO allow customizing host/port
    this.redis = new Redis();
    this.jsonCache = new JSONCache(this.redis);
    this.locker = redislock.createLock(this.redis, { timeout: 600000 });
    this.retryingLocker = redislock.createLock(this.redis, {
      timeout: 200000,
      retries: 10,
      delay: 1000,
    });
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

  async addBounty(bounty) {
    if (bounty && bounty.index) {
      await this.redis.hset(`${prefix}:bounties`, bounty.index.toString(), JSON.stringify(bounty))
    }
  }

  async getUBounty(index) {
    let cached = await this.redis.hget(`${prefix}:bounties`, index.toString())
    if (cached) {
      return JSON.parse(cached)
    }
    return null
  }

  async getUBounties() {
    let cached = await this.redis.hgetall(`${prefix}:bounties`)
    let ret = []
    if (cached) {
      for (const [key, value] of Object.entries(cached)) {
        try {
          ret.push(JSON.parse(value))
        } catch (e) {

        }
      }
    }
    return ret
  }

  async updateBountyCache(etherClient) {
    let lock = this.locker
    lock.acquire(`${prefix}:bountycachelock`).then(async () => {
      console.log("Updating bounty cache")
      let nBounties = await etherClient.getNUbounties()
      let uBounties = await etherClient.getUbounties(nBounties)
      for (const bounty of uBounties) {
        await this.redis.hset(`${prefix}:bounties`, bounty.index.toString(), JSON.stringify(bounty))
      }
      console.log("Finished updating cache")
      return lock.release();
    }, (err) => {
      console.log(err)
    })
  }
}

// exports
module.exports = {
  RedisDB,
};

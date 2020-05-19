"use strict"

const Redis = require('ioredis')
const JSONCache = require('redis-json')
const { BigNumber } = require('ethers/utils/bignumber')

// Prefix all DB calls with this
const prefix = 'devcash'

class RedisDB {
    constructor() {
        // TODO allow customizing host/port
        this.redis = new Redis()
        this.jsonCache = new JSONCache(this.redis)
    }

    // Cached on-chain uBounties
    async getUBounties() {
        let uBounties = await this.jsonCache.get(`${prefix}:uBounties`)
        if (uBounties == null) {
            return []
        }
        return uBounties
    }

    async setUBounties(uBounties) {
        if (typeof uBounties != 'object') {
            console.log(`Bad call to setUbounties, expected 'object' but got '${typeof uBounties}'`)
            return null
        }
        // Don't add ones we already have
        let toAdd
        if (await this.getNUbounties() > 0) {
            toAdd = new Array()
            let curUbounties = await this.getUBounties()
            uBounties.forEach(newUBounty => {
                console.log(newUBounty)
                curUbounties.forEach(uBounty => {
                    console.log(uBounty)
                    if (newUBounty.index != uBounty.index) {
                        toAdd.unshift(newUBounty)
                        return
                    }
                })
            })
            toAdd = toAdd.concat(curUbounties)
            console.log(toAdd)
        } else {
            toAdd = uBounties
        }
        await this.jsonCache.set(`${prefix}:uBounties`, toAdd)
        return toAdd
    }

    async getNUbounties() {
        return (await this.getUBounties()).length
    }

    async updateBountyCache(etherClient) {
        console.log("Updating Bounty Cache")
        let curNUbounties = await this.getNUbounties()
        let onChainUBounties = await etherClient.getNUbounties()
        if (onChainUBounties > curNUbounties) {
          console.log(`Adding ${onChainUBounties-curNUbounties} new bounties`)
          uBounties = await etherClient.getUbounties(onChainUBounties-curNUbounties)
          await this.setUBounties(uBounties)
        } else {
          console.log("No new bounties to add")
        }
        console.log("Done updating cache")        
    }
}

// exports
module.exports = {
    RedisDB
}

"use strict"

const { ethers, utils } = require('ethers')
const { tokenAddress, tokenABI, uBCAddress, uBCABI } = require('../../plugins/devcash/config.js')

class EtherClient {
    constructor(async_param) {
        if (typeof async_param === 'undefined') {
            throw new Error('Cannot be called directly');
        }
        this.tokenContract = async_param.tokenContract
        this.tokenName = async_param.tokenName
        this.tokenSymbol = async_param.tokenSymbol
        this.tokenDecimals = async_param.tokenDecimals
        this.uBCContract = async_param.uBCContract
    }

    /**
     * init() - connect to ethereum and initialize devcash contracts
     *
     * @returns EtherClient instance
     */
    static async init() {
        let provider
        let tokenContract
        let uBCContract

        // Etherscan provider (no signer)
        provider = new ethers.getDefaultProvider(process.env.NODE_ENV !== 'production' ? "ropsten" : undefined);
        tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider)
        uBCContract = new ethers.Contract(uBCAddress,uBCABI,provider)

        let tokenName = await tokenContract.name()
        let tokenSymbol = await tokenContract.symbol()
        let tokenDecimals = await tokenContract.decimals()

        return new EtherClient(
            {
                tokenContract: tokenContract,
                tokenName: tokenName,
                tokenSymbol: tokenSymbol,
                tokenDecimals: tokenDecimals,
                uBCContract: uBCContract
            }
        )
    }

    async getNUbounties() {
        return (await this.uBCContract.numUbounties()).toNumber()
    }

    async getUBounty(id) {
        let rawUBounty = await this.uBCContract.ubounties(id)
        if (rawUBounty == null || rawUBounty == undefined) {
            return null
        }
        // Convert smart contract data into a plain object
        let uBounty = {}
        uBounty.numLeft = rawUBounty[0]
        uBounty.numSubmissions = rawUBounty[1]
        uBounty.hunterIndex = rawUBounty[2]
        uBounty.creatorIndex = rawUBounty[3]
        uBounty.bountyChestIndex = rawUBounty[4]
        uBounty.deadline = rawUBounty[5]
        uBounty.name = rawUBounty[6]
        uBounty.description = rawUBounty[7]
        uBounty.infoHash = rawUBounty[8]
        uBounty.index = id
        // Get submissions
        uBounty.submissions = await this.getBountySubmissions(uBounty)
        return uBounty
    }

    async getUbounties(count) {
        let uBounties = new Array()
        let numUbounties = await this.getNUbounties()
        // Assert count <= numUBounties
        count = Math.min(count, numUbounties)
        for (let i=numUbounties-count; i < numUbounties; i++) {
            let uBounty = await this.getUBounty(i)
            if (uBounty != null && uBounty != undefined) {
                uBounties.push(uBounty)
            }
        }
        return uBounties
    }

    async getBountySubmissions(uBounty) {
        let submissions = new Array()
        for (let i=0; i < uBounty.numSubmissions; i++) {
            let submission = {}
            let subRaw = await this.uBCContract.getSubmission(uBounty.index, i)
            submission.index = i
            submission.submissionString = subRaw[0]
            submission.submitterIndex = subRaw[1]
            submission.approved = subRaw[2]
            submission.numRevisions = subRaw[3]
            if (submission.numRevisions > 0) {
                submission.revisions = await this.getSubmissionRevisions(uBounty, submission)
            } else {
                submission.revisions = []
            }
            submissions.push(submission)
        }
        return submissions
    }

    async getSubmissionRevisions(uBounty, submission) {
        let revisions = new Array()
        for (let i=0; i < submission[3]; i++) {
            let revision = {}
            revision.index = i
            revision.revision = await this.uBCContract.getRevision(uBounty.index, submission.index, revision.index)
            revisions.push(revision)            
        }
        return revisions
    }
}

// exports
module.exports = {
    EtherClient
}

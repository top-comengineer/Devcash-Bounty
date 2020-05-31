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
        provider = new ethers.getDefaultProvider("ropsten");
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
        //TODO - hunter broken
        //uBounty.hunter = await this.uBCContract.hunterList(uBounty.hunterIndex)
        // Get balance
        /*
        let bc = await this.uBCContract.bCList(uBounty.bountyChestIndex)
        let tokenBalance = await this.tokenContract.balanceOf(bc)
        if (uBounty.numLeft != 0) {
            tokenBalance = tokenBalance.div(uBounty.numLeft)
        }
        uBounty.tokenBalanceRaw = tokenBalance
        tokenBalance = utils.formatUnits(tokenBalance, this.tokenDecimals)
        tokenBalance = utils.commify(tokenBalance)
        uBounty.tokenBalance = tokenBalance.endsWith(".0") ? tokenBalance.replace(".0", "") : tokenBalance*/
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
            uBounty = await this.getUBounty(i)
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
            submission.index = i
            submission.submission = await this.uBCContract.getSubmission(uBounty.index, submission.index)
            submission.revisions = await this.getSubmissionRevisions(uBounty, submission.submission)
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
            //submission.submissionHash = await this.uBCContract.getSubmissionHash(uBounty.index, i)
            //let submitterIndex = await this.uBCContract.getSubmitter(uBounty.index, i)
            //submission.submitter = await uBCContract.hunterList(submitterIndex)
            revisions.push(revision)            
        }
        return revisions
    }
}

// exports
module.exports = {
    EtherClient
}

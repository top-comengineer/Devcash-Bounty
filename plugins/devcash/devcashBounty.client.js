import { ethers, utils } from 'ethers'
import { tokenAddress, tokenABI, uBCAddress, uBCABI } from './config.js'

export class DevcashBounty {
    constructor(async_param) {
        if (typeof async_param === 'undefined') {
            throw new Error('Cannot be called directly');
        }
        this.provider = async_param.provider
        this.accounts = async_param.accounts
        this.signer = async_param.signer,
        this.tokenContract = async_param.tokenContract
        this.tokenName = async_param.tokenName
        this.tokenSymbol = async_param.tokenSymbol
        this.tokenDecimals = async_param.tokenDecimals
        this.uBCContract = async_param.uBCContract
    }

    /**
     * init() - connect to ethereum and initialize devcash contracts
     * @returns DevcashBounty instance
     */
    static async init() {
        let signer
        let provider
        let accounts
        let tokenContract
        let uBCContract

        // window.ethereum is provided by metamask
        if (window.ethereum) {
            // Use web3 provider with signer
            window.ethereum.enable()
            provider = new ethers.providers.Web3Provider(web3.currentProvider);
            accounts = await provider.listAccounts()
            signer = provider.getSigner(accounts[0])
            tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer)
            uBCContract = new ethers.Contract(uBCAddress,uBCABI,signer)
        } else {
            // Use default/etherscan provider
            provider = new ethers.getDefaultProvider();
            tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider)
            uBCContract = new ethers.Contract(uBCAddress,uBCABI,provider)
        }

        let tokenName = await tokenContract.name()
        let tokenSymbol = await tokenContract.symbol()
        let tokenDecimals = await tokenContract.decimals()

        return new DevcashBounty(
            {
                provider: provider,
                accounts: accounts,
                signer: signer,
                tokenContract: tokenContract,
                tokenName: tokenName,
                tokenSymbol: tokenSymbol,
                tokenDecimals: tokenDecimals,
                uBCContract: uBCContract
            }
        )
    }

    async getOpenBounties() {
        let uBounties = new Array()
        let numOpenBounties = await this.uBCContract.numUbounties()
        for (let i=0; i < numOpenBounties; i++) {
            let uBounty = await this.uBCContract.ubounties(i)
            uBounty.index = i
            uBounty.hunter = await this.uBCContract.hunterList(uBounty.hunterIndex)
            uBounties.push(uBounty)
        }
        return uBounties
    }

    async getBountySubmissions(uBounty) {
        let submissions = new Array()
        for (let i=0; i < uBounty.numSubmissions; i++) {
            submission = new Object()
            submission.submissionString = await uBCContract.getSubmissionString(uBounty.index, i)
            submission.submissionHash = await uBCContract.getSubmissionHash(uBounty.index, i)
            let submitterIndex = await uBCContract.getSubmitter(uBounty.index, i)
            submission.submitter = await uBCContract.hunterList(submitterIndex)
            submissions.push(submission)            
        }
        return submissions
    }
}
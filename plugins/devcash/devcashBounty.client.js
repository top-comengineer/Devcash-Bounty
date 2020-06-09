import { ethers, utils } from 'ethers'
import { crypto } from 'crypto'
import { Authereum, AuthereumSigner } from 'authereum'
import { tokenAddress, tokenABI, uBCAddress, uBCABI } from './config.js'
import { NoAccountsFoundError, AccountNotFoundError, InvalidAddressError, InvalidHunterAddressError, InvalidEmailError } from './errors.js'

if (process.client) {
    var Portis = require('@portis/web3')
}

export const WalletProviders = {
    metamask: 'metamask',
    portis: 'portis',
    authereum: 'authereum',
    etherscan: 'etherscan'
}

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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
     * hasMetamask() - returns true if metamask is available
     */
    static hasMetamask() {
        if (window.ethereum) {
            return true
        }
        return false
    }

    static formatAmount(bounty, tokenDecimals) {
        let delta = bounty.numLeft - bounty.submissions.length
        if (delta <= 0) {
            return "0"
        }
        let totalAmount = utils.bigNumberify(bounty.bountyAmount)
        totalAmount = totalAmount.div(bounty.numLeft)
        totalAmount = utils.commify(utils.formatUnits(totalAmount, tokenDecimals))
        return totalAmount  
    }

    static formatTimeLeft(bounty) {
        if (
            bounty.deadline >= 281474976710655 ||
            bounty.deadline <= 0
        ) {
            return "∞";
        }

        const currentDate = new Date();
        const deadlineDate = new Date(bounty.deadline * 1000);

        const delta = deadlineDate.getTime() - currentDate.getTime();

        if (delta >= 2629746) {
            let monthsLeft = Math.floor(delta / 2629746);
            return `${monthsLeft} months`;
        } else if (delta >= 86400) {
            let daysLeft = Math.floor(delta / 86400);
            return `${daysLeft} days`;
        } else if (delta >= 3600) {
            let hoursLeft = Math.floor(delta / 3600);
            return `${hoursLeft} hours`;
        }
        let minutesLeft = Math.floor(delta / 60);
        return `${minutesLeft} minutes`;
    }

    /**
     * init() - connect to ethereum and initialize devcash contracts
     * @params account - logged in account
     * @params walletProvider - WalletProvider to use, if missing then default is used
     *
     * @returns DevcashBounty instance
     * @throws AccountNotFoundError if account is not null and account doesn't exist
     */
    static async init(accountToLogin, walletProvider) {
        accountToLogin = accountToLogin || null
        walletProvider = walletProvider || WalletProviders.etherscan

        let needsSigner = false
        let signer
        let provider
        let accounts
        let tokenContract
        let uBCContract

        // Get provider
        if (this.hasMetamask() && walletProvider == WalletProviders.metamask) {
            // Use web3 provider with signer
            await window.ethereum.enable()
            provider = new ethers.providers.Web3Provider(web3.currentProvider, process.env.NODE_ENV !== 'production' ? "ropsten" : "mainnet");
            needsSigner = true
        } else if (walletProvider == WalletProviders.authereum) {
            // Authereum
            const authereum = new Authereum(process.env.NODE_ENV !== 'production' ? "ropsten" : "mainnet")
            const authereumProvider = authereum.getProvider()
            await authereumProvider.enable()
            provider = new ethers.providers.Web3Provider(authereumProvider, process.env.NODE_ENV !== 'production' ? "ropsten" : "mainnet")
            needsSigner = true
        } else if (walletProvider == WalletProviders.portis) {
            // Portis
            const portis = new Portis('5395216c-1124-49de-bfbe-7893409825be', process.env.NODE_ENV !== 'production' ? "ropsten" : "mainnet")
            const portisProvider = portis.provider
            await portisProvider.enable()
            provider = new ethers.providers.Web3Provider(portis.provider, process.env.NODE_ENV !== 'production' ? "ropsten" : "mainnet")
            needsSigner = true
        } else {
            // Etherscan provider (no signer)
            provider = new ethers.getDefaultProvider(process.env.NODE_ENV !== 'production' ? "ropsten" : "mainnet");
            needsSigner = false
        }

        // If using default provider, signer isn't required
        if (needsSigner) {
            accounts = await provider.listAccounts()
            // Check to see if they have any accounts created
            if (accounts.length == 0) {
                throw new NoAccountsFoundError('No accounts found')
            }
            // Check if specific account is specified
            if (accountToLogin != null) {
                let a
                for (a of accounts) {
                    if (a.toLowerCase() == accountToLogin.toLowerCase()) {
                        signer = provider.getSigner(a)
                    }
                }
                if (!signer) {
                    throw new AccountNotFoundError(`Account ${accountToLogin} not found in ${walletProvider}`)
                }
            } else {
                // Login default account
                signer = provider.getSigner(accounts[0])
            }
            tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer)
            uBCContract = new ethers.Contract(uBCAddress,uBCABI,signer)
        } else {
            // Use default/etherscan provider
            provider = new ethers.getDefaultProvider(process.env.NODE_ENV !== 'production' ? "ropsten" : "mainnet");
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

    async hashUbounty(uBounty) {
        const creator = uBounty.creator, title = uBounty.title, description = uBounty.description, hunter = uBounty.hunter
        const hash = crypto.createHash("sha256").update(creator).update(title).update(description)
        return hunter != undefined && hunter != null ? hash.update(hunter).digest("hex") : hash.digest("hex")
    }

    async hashSubmission(submission) {
        const creator = submission.creator, data = submission.data, ubounty_id = submission.ubounty_id
        const hash = crypto.createHash("sha256").update(creator).update(data).update(ubounty_id).digest("hex")
        return hash
    }

    async hashRevision(revision) {
        const creator = revision.creator, data = revision.data, ubounty_id = revision.ubounty_id, submission_id = revision.submission_id
        const hash = crypto.createHash("sha256").update(creator).update(data).update(ubounty_id).update(submission_id).digest("hex")
        return hash
    }

    // Create uBounty object and add hash
    async createUBounty(creator, title, description, contactName, contactEmail, hunter = undefined) {
        let hasHunter = hunter != null && hunter != undefined
        try {
            utils.getAddress(creator);
        } catch (e) { throw new InvalidAddressError("Creator address is invalid"); }
        if (!emailRegexp.test(contactEmail)) {
            throw new InvalidEmailError("Contact email is invalid")
        }
        if (hasHunter) {
            try {
                utils.getAddress(hunter);
            } catch (e) { throw new InvalidHunterAddressError("Hunter address is invalid"); }
        }
        let ubounty = {
            creator: creator,
            title: title,
            description: description,
            contactName: contactName,
            contactEmail: contactEmail
        }
        if (hasHunter) {
            uBounty.hunter = hunter
        }
        uBounty.hash = this.hashUbounty(ubounty)
        return uBounty
    }

    // Create submission object and add hash
    async createSubmission(creator, data, ubounty_id) {
        try {
            utils.getAddress(creator);
        } catch (e) { throw new InvalidAddressError("Creator address is invalid"); }
        let submission = {
            creator: creator,
            data: data,
            ubounty_id: ubounty_id
        }
        submission.hash = this.hashSubmission(submission)
        return submission
    }

    // Create revision object and add hash
    async createRevision(creator, data, ubounty_id, submission_id) {
        try {
            utils.getAddress(creator);
        } catch (e) { throw new InvalidAddressError("Creator address is invalid"); }
        let revision = {
            creator: creator,
            data: data,
            ubounty_id: ubounty_id,
            submission_id: submission_id
        }
        revision.hash = this.hashRevision(revision)
        return revision
    }

    // Get balances
    async getETHBalance(){
        let ethBalance = await this.signer.getBalance()
        ethBalance = utils.formatEther(ethBalance)
        ethBalance = utils.commify(ethBalance)
        let devcashBalance = await this.tokenContract.balanceOf(signer._address)
        devcashBalance = utils.formatUnits(devcashBalance,this.tokenDecimals)
        devcashBalance = utils.commify(devcashBalance)        
        let approvedBalance = await this.tokenContract.allowance(signer._address, this.uBCAddress)
        approvedBalance = utils.formatUnits(approvedBalance,this.tokenDecimals)
        approvedBalance = utils.commify(approvedBalance)           
        return {
            eth: ethBalance,
            devcash: devcashBalance,
            approved: approvedBalance
        }
    }
}

// Other exports
export { AccountNotFoundError, NoAccountsFoundError }

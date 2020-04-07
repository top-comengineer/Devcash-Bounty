import { ethers, utils } from 'ethers'
import { Authereum } from 'authereum'
import { tokenAddress, tokenABI, uBCAddress, uBCABI } from './config.js'
import { NoAccountsFoundError, AccountNotFoundError } from './errors.js'

export const WalletProviders = {
    metamask: 'metamask',
    portis: 'portis',
    authereum: 'authereum',
    etherscan: 'etherscan'
}

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
            provider = new ethers.providers.Web3Provider(web3.currentProvider);
            needsSigner = true
        } else if (walletProvider == WalletProviders.authereum) {
            // Authereum
            const authereum = new Authereum('mainnet')
            provider = new ethers.providers.Web3Provider(await authereum.getProvider())
            needsSigner = true
        } else {
            // Etherscan provider (no signer)
            provider = new ethers.getDefaultProvider();
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
                for (a in accounts) {
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

    async getUbounties() {
        let uBounties = new Array()
        let numUbounties = await this.uBCContract.numUbounties()
        for (let i=0; i < numUbounties; i++) {
            let rawUBounty = await this.uBCContract.ubounties(i)
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
            // Set hunter
            uBounty.index = i
            uBounty.hunter = await this.uBCContract.hunterList(uBounty.hunterIndex)
            // Get balance
            let bc = await this.uBCContract.bCList(uBounty.bountyChestIndex)
            let tokenBalance = await this.tokenContract.balanceOf(bc)
            if (uBounty.numLeft != 0) {
                tokenBalance = tokenBalance.div(uBounty.numLeft)
            }
            uBounty.tokenBalanceRaw = tokenBalance
            tokenBalance = utils.formatUnits(tokenBalance, this.tokenDecimals)
            tokenBalance = utils.commify(tokenBalance)
            uBounty.tokenBalance = tokenBalance.endsWith(".0") ? tokenBalance.replace(".0", "") : tokenBalance
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

// Other exports
export { AccountNotFoundError, NoAccountsFoundError }

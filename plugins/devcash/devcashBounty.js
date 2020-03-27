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
        let signer
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
}
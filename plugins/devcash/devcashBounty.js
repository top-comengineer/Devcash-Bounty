import { ethers, utils } from 'ethers'
import { tokenAddress, tokenABI, uBCAddress, uBCABI } from './config.js'

export class DevcashBounty {
    constructor(async_param) {
        if (typeof async_param === 'undefined') {
            throw new Error('Cannot be called directly');
        }
        this.ethereum = async_param.ethereum
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
        let ethereum = window.ethereum
        ethereum.enable()

        let provider = new ethers.providers.Web3Provider(web3.currentProvider);

        let accounts = await this.provider.listAccounts()
        let signer = provider.getSigner(accounts[0])

        let tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer)

        let tokenName = await tokenContract.name()
        let tokenSymbol = await tokenContract.symbol()
        let tokenDecimals = await tokenContract.decimals()

        let uBCContract = new ethers.Contract(uBCAddress,uBCABI,signer)

        return new DevcashBounty(
            {
                ethereum: ethereum,
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
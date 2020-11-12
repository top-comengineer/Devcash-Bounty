import { ethers, utils, BigNumber } from "ethers";
import CryptoJS from "crypto-js";
import { tokenAddress, tokenABI, uBCAddress, uBCABI } from "./config.js";
import {
  NoAccountsFoundError,
  AccountNotFoundError,
  InvalidAddressError,
  InvalidHunterAddressError,
  InvalidEmailError,
} from "./errors.js";

export const WalletProviders = {
  metamask: "metamask",
  portis: "portis",
  authereum: "authereum",
  etherscan: "etherscan",
};

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const ethNetwork = process.env.NUXT_ENV_ETH_NETWORK || "ropsten"

export class DevcashBounty {
  constructor(async_param) {
    if (typeof async_param === "undefined") {
      throw new Error("Cannot be called directly");
    }
    this.provider = async_param.provider;
    this.accounts = async_param.accounts;
    (this.signer = async_param.signer),
      (this.tokenContract = async_param.tokenContract);
    this.tokenName = async_param.tokenName;
    this.tokenSymbol = async_param.tokenSymbol;
    this.tokenDecimals = async_param.tokenDecimals;
    this.uBCContract = async_param.uBCContract;
  }

  static formatAmount(bounty, tokenDecimals) {
    let delta =
      bounty.available -
      bounty.submissions.filter((sub) => sub.status == 'approved').length;
    if (delta <= 0) {
      return "0";
    }
    let totalAmount = BigNumber.from(bounty.bountyAmount);
    totalAmount = totalAmount.div(delta);
    totalAmount = utils.commify(utils.formatUnits(totalAmount, tokenDecimals));
    return totalAmount;
  }

  static formatAmountEth(bounty) {
    let delta =
      bounty.available -
      bounty.submissions.filter((sub) => sub.status == 'approved').length;
    if (delta <= 0) {
      return "0";
    }
    let totalAmount = BigNumber.from(bounty.weiAmount);
    totalAmount = totalAmount.div(delta);
    totalAmount = utils.commify(utils.formatEther(totalAmount));
    return totalAmount;
  }

  static formatAmountSingleSubmission(bounty, tokenDecimals) {
    if (bounty.available <= 0) {
      return "0"
    }
    let totalAmount = BigNumber.from(bounty.bountyAmount);
    totalAmount = totalAmount.div(bounty.available);
    totalAmount = utils.commify(utils.formatUnits(totalAmount, tokenDecimals));
    return totalAmount;
  }

  static formatAmountSingleSubmissionEth(bounty) {
    if (bounty.available <= 0) {
      return "0"
    }
    let totalAmount = BigNumber.from(bounty.weiAmount);
    totalAmount = totalAmount.div(bounty.available);
    totalAmount = utils.formatEther(totalAmount);
    return totalAmount;
  }

  static formatDateStr(locale, dateStr) {
    let dt = new Date(dateStr);
    return `${dt.toLocaleString(locale == "en" ? undefined : locale)}`;
  }

  static formatTimeLeft(bounty) {
    if (bounty.deadline >= 281474976710655) {
      return "∞";
    }

    const now = Date.now();
    const deadlineDate = new Date(bounty.deadline * 1000).getTime();

    const delta = parseInt((deadlineDate - now) / 1000);

    if (delta < 0) {
      // TODO - localize me
      return "expired";
    }

    if (delta >= 2592000) {
      let monthsLeft = Math.floor(delta / 2592000);
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
   * initEthConnector - Init ETH connector for a given vue component
   *
   * @param {Component} vueComponent
   */
  static async initEthConnector(vueComponent, hasMetamask) {
    if (vueComponent.$store.state.devcash.connector == null) {
      try {
        let connector = await this.init(
          vueComponent.$store.state.devcashData.loggedInAccount,
          vueComponent.$store.state.devcashData.provider,
          hasMetamask
        );
        vueComponent.$store.commit("devcash/setConnector", connector);
        vueComponent.$root.$emit('connectorSet', connector)
      } catch (e) {
        if (e instanceof AccountNotFoundError) {
          vueComponent.$store.commit("devcashData/setProvider", null);
          vueComponent.$store.commit("devcashData/setLoggedInAccount", null);
          vueComponent.$store.commit("devcash/setConnector", null);
          vueComponent.$root.$emit('connectorSet', null)
          await this.initEthConnector(vueComponent, hasMetamask);
        } else {
          if (e.toString().toLowerCase().includes("contract not deployed") || e.toString().toLowerCase().includes("underlying network changed")) {
            vueComponent.$store.commit("devcashData/setProvider", null);
            vueComponent.$store.commit("devcashData/setLoggedInAccount", null);
            vueComponent.$store.commit("devcash/setConnector", null);
            vueComponent.$root.$emit('connectorSet', null)
            vueComponent.$notify({
              group: 'main',
              title: vueComponent.$t('notification.unknownNetworkTitle'),
              text: vueComponent.$t('notification.unknownNetworkDescription'),
              data: {}
            })
            console.log(e)
          } else {
            console.log(e)
          }
        }
      }
    }
  }

  static async approveRejectAction(vueComponent, type, submission, feedback) {
    try {
      vueComponent.confirmWindowOpen = true
    if (type == 'reject') {
      await vueComponent.$store.state.devcash.connector.reject(submission.ubounty.id, submission.submission_id, feedback)
      vueComponent.$store.state.devcashData.pendingSubStatus.push({
        bounty: submission.ubounty.id,
        submission: submission.submission_id,
        type: 'reject'
      })
      vueComponent.$notify({
        group: 'main',
        title: vueComponent.$t('notification.submissionRejectedTitle'),
        text: vueComponent.$t('notification.submissionRejectedApprovedDescription'),
        data: {},
        duration: -1,
      });
    } else {
      await vueComponent.$store.state.devcash.connector.approve(submission.ubounty.id, submission.submission_id, feedback)
      vueComponent.$store.state.devcashData.pendingSubStatus.push({
        bounty: submission.ubounty.id,
        submission: submission.submission_id,
        type: 'approve'
      })
      vueComponent.$notify({
        group: 'main',
        title: vueComponent.$t('notification.submissionApprovedTitle'),
        text: vueComponent.$t('notification.submissionRejectedApprovedDescription'),
        data: {},
        duration: -1
      });
    }
    } catch (e) {
      if ('code' in e && e.code == 4001) {
        console.log(e)
      } else {
        vueComponent.$notify({
          group: 'main',
          title: type == 'reject' ? this.$t('errors.rejectFailed') : this.$t('errors.approvalFailed'),
          text: this.$t('errors.bountyCreateFailed'),
          data: {}
        })
        console.log(e)
      }
    } finally {
      vueComponent.isConfirmModalOpen = false;
      vueComponent.confirmWindowOpen = false
    }
  }

  /**
   * updateBalances() - Update balances for a given vue component
   *
   * @param {Component} Vue component
   */
  static async updateBalances(vueComponent) {
    await this.initEthConnector(vueComponent, vueComponent.hasMetamask);
    vueComponent.$store.dispatch(
      "devcashData/updateBalance",
      vueComponent.$store.state.devcash.connector
    );
  }

  /**
   * updateFees() - Update fees in global state
   *
   * @param {Component} Vue component
   */
  static async updateFees(vueComponent) {
    await this.initEthConnector(vueComponent, vueComponent.hasMetamask);
    vueComponent.$store.dispatch(
      "devcashData/updateFees",
      vueComponent.$store.state.devcash.connector
    );
  }

  /**
   * signIn() - Sign in to specified provider
   *
   * @param {Component} Vue component
   * @param {*} provider
   */
  static async signIn(vueComponent, provider, hasMetamask, messageToSign) {
    if (provider == WalletProviders.metamask && !hasMetamask) {
      window.open("https://metamask.io/download.html", "_blank");
      return;
    }
    try {
      // Initialize connector to ethereum
      let connector = await DevcashBounty.init(null, provider, hasMetamask);
      if (connector.signer) {
        await connector.signer.signMessage(messageToSign)
      }
      // Set state
      vueComponent.$store.commit("devcash/setConnector", connector);
      vueComponent.$root.$emit('connectorSet', connector)
      // Set persistent state for logged in account
      vueComponent.$store.commit("devcashData/setProvider", provider);
      vueComponent.$store.commit(
        "devcashData/setLoggedInAccount",
        await connector.signer.getAddress()
      );
      // Emit sign in event
      vueComponent.$root.$emit('signedIn')
      this.updateBalances(vueComponent)
    } catch (e) {
      if (e instanceof NoAccountsFoundError) {
        // NO accounts found in provider
        if (provider == this.walletProviders.metamask) {
          window.open("https://metamask.io/download.html", "_blank");
        } else if (provider == this.walletProviders.authereum) {
          window.open("https://authereum.com/welcome", "_blank");
        } else if (provider == this.walletProviders.portis) {
          window.open("https://wallet.portis.io/", "_blank");
        }
      }
      if (e.toString().toLowerCase().includes("contract not deployed") || e.toString().toLowerCase().includes("underlying network changed")) {
        vueComponent.$store.commit("devcashData/setProvider", null);
        vueComponent.$store.commit("devcashData/setLoggedInAccount", null);
        vueComponent.$store.commit("devcash/setConnector", null);
        vueComponent.$root.$emit('connectorSet', null)
        vueComponent.$notify({
          group: 'main',
          title: vueComponent.$t('notification.unknownNetworkTitle'),
          text: vueComponent.$t('notification.unknownNetworkDescription'),
          data: {}
        })
        console.log(e)
      } else {
        console.log(e)
      }
    }
  }

  /**
   * signOut() - trigger sign out
   *
   * @param {Component} Vue component
   */
  static signOut(vueComponent) {
    vueComponent.$store.commit("devcashData/setProvider", null);
    vueComponent.$store.commit("devcashData/setLoggedInAccount", null);
    vueComponent.$store.commit("devcashData/setBalance", null);
    vueComponent.$store.commit("devcash/setConnector", null);
    vueComponent.$store.commit("devcashData/setDevcash");
    vueComponent.$root.$emit('connectorSet', null)
    vueComponent.$router.replace(vueComponent.localePath("/"));
  }

  /**
   * init() - connect to ethereum and initialize devcash contracts
   * @params account - logged in account
   * @params walletProvider - WalletProvider to use, if missing then default is used
   *
   * @returns DevcashBounty instance
   * @throws AccountNotFoundError if account is not null and account doesn't exist
   */
  static async init(accountToLogin, walletProvider, hasMetamask) {
    accountToLogin = accountToLogin || null;
    walletProvider = walletProvider || WalletProviders.etherscan;
    let needsSigner = false;
    let signer;
    let provider;
    let accounts;
    let tokenContract;
    let uBCContract;

    // Get provider
    console.log(ethNetwork)
    console.log("has metamask: " + hasMetamask)
    console.log("walletProvider: " + walletProvider)

    if (hasMetamask && walletProvider == WalletProviders.metamask) {
      console.log("hasMetamask && walletProvider == WalletProviders.metamask")
      // Use web3 provider with signer
      await window.ethereum.enable();
      provider = new ethers.providers.Web3Provider(
        web3.currentProvider,
        ethNetwork
      );
      needsSigner = true;
    } else if (walletProvider == WalletProviders.authereum) {
      console.log("walletProvider == WalletProviders.authereum")
      // Authereum
      const { Authereum } = require("authereum")
      const authereum = new Authereum(
        ethNetwork
      );
      const authereumProvider = authereum.getProvider();
      await authereumProvider.enable();
      provider = new ethers.providers.Web3Provider(
        authereumProvider,
        ethNetwork
      );
      needsSigner = true;
    } else if (walletProvider == WalletProviders.portis) {
      console.log("walletProvider == WalletProviders.portis")
      // Portis
      const Portis = require("@portis/web3")
      const portis = new Portis(
        "2c71706f-4f39-41fb-b477-ed4eec1c88fa",
        ethNetwork
      );
      const portisProvider = portis.provider;
      await portisProvider.enable();
      provider = new ethers.providers.Web3Provider(
        portis.provider,
        ethNetwork
      );
      needsSigner = true;
    } else {
      console.log("other provider")
      // Etherscan provider (no signer)
      provider = new ethers.getDefaultProvider(
        ethNetwork,
        {
          infura: {
            projectId: '3ec2020d08084212a43092fd30e1b1ef',
            projectSecret: 'bc74f955557243ada6f9750ff049dc3f'
          },
          etherscan: 'H5JDJB1M52EURV4VH68CKGK1WSWAWRMMFT'
        }
      );
      provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/3ec2020d08084212a43092fd30e1b1ef")

      needsSigner = false;
    }

    // If using default provider, signer isn't required
    if (needsSigner) {
      accounts = await provider.listAccounts();
      // Check to see if they have any accounts created
      if (accounts.length == 0) {
        throw new NoAccountsFoundError("No accounts found");
      }
      // Check if specific account is specified
      if (accountToLogin != null) {
        let a;
        for (a of accounts) {
          if (a.toLowerCase() == accountToLogin.toLowerCase()) {
            signer = provider.getSigner(a);
          }
        }
        if (!signer) {
          throw new AccountNotFoundError(
            `Account ${accountToLogin} not found in ${walletProvider}`
          );
        }
      } else {
        // Login default account
        signer = provider.getSigner(accounts[0]);
      }
      tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      uBCContract = new ethers.Contract(uBCAddress, uBCABI, signer);
    } else {
      // Use default/etherscan provider
      provider = new ethers.getDefaultProvider(
        ethNetwork,
        {
          infura: {
            projectId: '3ec2020d08084212a43092fd30e1b1ef',
            projectSecret: 'bc74f955557243ada6f9750ff049dc3f'
          },
          etherscan: 'H5JDJB1M52EURV4VH68CKGK1WSWAWRMMFT'
        }
      );

      tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
      uBCContract = new ethers.Contract(uBCAddress, uBCABI, provider);
    }

    let tokenName = await tokenContract.name();
    let tokenSymbol = await tokenContract.symbol();
    let tokenDecimals = await tokenContract.decimals();

    return new DevcashBounty({
      provider: provider,
      accounts: accounts,
      signer: signer,
      tokenContract: tokenContract,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      tokenDecimals: tokenDecimals,
      uBCContract: uBCContract,
    });
  }

  async getUBounty(id) {
    let rawUBounty = await this.uBCContract.ubounties(id);
    if (rawUBounty == null || rawUBounty == undefined) {
      return null;
    }
    // Convert smart contract data into a plain object
    let uBounty = {};
    uBounty.available = rawUBounty[0];
    uBounty.numSubmissions = rawUBounty[1];
    uBounty.hunterIndex = rawUBounty[2];
    uBounty.creatorIndex = rawUBounty[3];
    uBounty.bountyChestIndex = rawUBounty[4];
    uBounty.deadline = rawUBounty[5];
    uBounty.name = rawUBounty[6];
    uBounty.description = rawUBounty[7];
    uBounty.index = id;
    uBounty.bc = await this.uBCContract.bCList(uBounty.bountyChestIndex);
    uBounty.amount = (
      await this.tokenContract.balanceOf(uBounty.bc)
    ).toString();
    uBounty.weiAmount = (await this.uBCContract.weiBountyAmount(uBounty.index)).toString()
    // Get submissions
    //uBounty.submissions = await this.getBountySubmissions(uBounty);
    return uBounty;
  }

  async approveBalance(amount) {
    let amtFormat = utils.parseUnits(amount.toString(), this.tokenDecimals);
    return await this.tokenContract.approve(uBCAddress, amtFormat);
  }

  static hashUbounty(uBounty) {
    const creator = uBounty.creator,
      title = uBounty.title,
      description = uBounty.description,
      hunter = uBounty.hunter;

    let hash = CryptoJS.algo.SHA256.create()
      .update(creator)
      .update(title)
      .update(description);
    if (hunter) {
      hash.update(hunter);
    }
    const final = hash.finalize();
    return CryptoJS.enc.Hex.stringify(final);
  }

  static hashSubmission(submission) {
    const creator = submission.creator,
      data = submission.submissionData,
      ubounty_id = submission.ubounty_id;
    const hash = CryptoJS.algo.SHA256.create()
      .update(creator)
      .update(data)
      .update(ubounty_id.toString())
      .finalize();
    return CryptoJS.enc.Hex.stringify(hash);
  }

  static hashRevision(revision) {
    const creator = revision.creator,
      data = revision.revisionData,
      ubounty_id = revision.ubounty_id,
      submission_id = revision.submission_id;
    const hash = CryptoJS.algo.SHA256.create()
      .update(creator)
      .update(data)
      .update(ubounty_id.toString())
      .update(submission_id.toString())
      .finalize();
    return CryptoJS.enc.Hex.stringify(hash);
  }

  // Create uBounty object and add hash
  static createUBounty(
    creator,
    title,
    description,
    contactName,
    contactEmail,
    category,
    hunter = undefined
  ) {
    let hasHunter = hunter != null && hunter != undefined;
    try {
      utils.getAddress(creator);
    } catch (e) {
      throw new InvalidAddressError("Creator address is invalid");
    }
    if (contactEmail && contactEmail.length > 0 && !emailRegexp.test(contactEmail)) {
      throw new InvalidEmailError("Contact email is invalid");
    }
    if (hasHunter) {
      try {
        utils.getAddress(hunter);
      } catch (e) {
        throw new InvalidHunterAddressError("Hunter address is invalid");
      }
    }
    let ubounty = {
      creator: creator,
      title: title,
      description: description,
      category: category,
    };
    if (contactName && contactName.length > 0) {
      ubounty.contactName = contactName
    }
    if (contactEmail && contactEmail.length > 0) {
      ubounty.contactEmail = contactEmail
    }
    if (hasHunter) {
      ubounty.hunter = hunter;
    }
    ubounty.hash = DevcashBounty.hashUbounty(ubounty);
    return ubounty;
  }

  // Create submission object and add hash
  static createSubmission(creator, data, ubounty_id, contactName, contactEmail) {
    try {
      utils.getAddress(creator);
    } catch (e) {
      throw new InvalidAddressError("Creator address is invalid");
    }
    let submission = {
      creator: creator,
      submissionData: data,
      ubounty_id: ubounty_id,
    };
    if (contactName && contactName.length > 0) {
      submission.contactName = contactName
    }
    if (contactEmail && contactEmail.length > 0 && !emailRegexp.test(contactEmail)) {
      throw new InvalidEmailError("Contact email is invalid");
    }
    if (contactEmail && contactEmail.length > 0) {
      submission.contactEmail = contactEmail
    }
    submission.hash = DevcashBounty.hashSubmission(submission);
    return submission;
  }

  // Create revision object and add hash
  static createRevision(creator, data, ubounty_id, submission_id) {
    try {
      utils.getAddress(creator);
    } catch (e) {
      throw new InvalidAddressError("Creator address is invalid");
    }
    let revision = {
      creator: creator,
      revisionData: data,
      ubounty_id: ubounty_id,
      submission_id: submission_id,
    };
    revision.hash = DevcashBounty.hashRevision(revision);
    return revision;
  }

  // Get balances
  async getBalances() {
    let ethBalanceRaw = await this.signer.getBalance();
    let ethBalance = utils.formatEther(ethBalanceRaw);
    ethBalance = utils.commify(ethBalance);
    let devcashBalanceRaw = await this.tokenContract.balanceOf(
      await this.signer.getAddress()
    );
    let devcashBalance = utils.formatUnits(
      devcashBalanceRaw,
      this.tokenDecimals
    );
    devcashBalance = utils.commify(devcashBalance);
    let approvedBalanceRaw = await this.tokenContract.allowance(
      await this.signer.getAddress(),
      uBCAddress
    );
    let approvedBalance = utils.formatUnits(
      approvedBalanceRaw,
      this.tokenDecimals
    );
    approvedBalance = utils.commify(approvedBalance);
    return {
      eth: ethBalance,
      ethRaw: ethBalanceRaw,
      devcash: devcashBalance,
      devcashRaw: devcashBalanceRaw,
      approved: approvedBalance,
      approvedRaw: approvedBalanceRaw,
    };
  }

  // Fee+Waiver
  async getFee() {
    let fee = await this.uBCContract.fee();
    fee = utils.formatEther(fee);
    return fee;
  }

  async getWaiver() {
    let waiver = await this.uBCContract.waiver();
    waiver = utils.formatUnits(waiver, this.tokenDecimals);
    return waiver;
  }

  // Methods for writing to the smart contract
  async postBounty(bounty, available, amount, deadline, weiAmount, fee, amountEach) {
    if (amountEach) {
      amount = amount.mul(available)
      weiAmount = weiAmount.mul(available)
    }
    let overrides = {
      value: weiAmount.add(fee)
    };
    if (process.env.NODE_ENV !== 'production') {
      overrides.gasLimit = 3000000
    }
    if (!bounty.hunter) {
      // Open Bounty
      return await this.uBCContract.postOpenBounty(
        "",
        bounty.hash,
        available,
        amount,
        deadline,
        overrides
      );
    }
    return await this.uBCContract.postPersonalBounty(
      "",
      bounty.hash,
      bounty.hunter,
      available,
      amount,
      deadline,
      overrides
    );
  }

  // Contribute
  async contribute(bounty, rawAmount) {
    return await this.uBCContract.contribute(bounty.id, rawAmount)
  }

  async contributeWei(bounty, weiAmount) {
   return await this.uBCContract.contributeWei(bounty.id, {
      value: weiAmount
    })
  }

  // Reclaim
  async reclaim(bounty) {
    if (process.env.NODE_ENV === 'production') {
      return await this.uBCContract.reclaim(bounty.id)
    }
    return await this.uBCContract.reclaim(bounty.id, {
      gasLimit: 3000000
    })
  }

  // Submission
  async postSubmission(bounty, hash) {
    return await this.uBCContract.submit(bounty.id, hash);
  }

  // Approve+Reject
  async approve(bountyIndex, submissionIndex, feedback) {
    await this.uBCContract.approve(bountyIndex,submissionIndex,feedback)
  }

  async reject(bountyIndex, submissionIndex, feedback) {
    await this.uBCContract.reject(bountyIndex,submissionIndex,feedback)
  }
}

// Other exports
export { AccountNotFoundError, NoAccountsFoundError };

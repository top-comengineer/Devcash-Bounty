"use strict";

const _ = require('lodash')
const { ethers, utils, BigNumber } = require("ethers");
const web3 = require("web3");
const {
  tokenAddress,
  tokenABI,
  uBCAddress,
  uBCABI,
} = require("../../plugins/devcash/config.js");

const eventLogDefaultFromBlock = process.env.NODE_ENV === 'production' ? 10451865 : 8195113;

const ethNetwork = process.env.NODE_ENV !== "production" ? "ropsten" : "mainnet"

class EtherClient {
  constructor() {
    this.initialized = false
    this.provider = null
    this.tokenContract = null
    this.tokenName = null
    this.tokenSymbol = null;
    this.tokenDecimals = null;
    this.uBCContract = null;
    this.event_logs = {};
    this.redis = null;
    this.overriddenStatus = {};
  }

  /**
   * init() - connect to ethereum and initialize devcash contracts
   *
   * @returns EtherClient instance
   */
  async init(redis) {
    let provider;
    let tokenContract;
    let uBCContract;

    
    // Etherscan provider (no signer)
    provider = new ethers.getDefaultProvider(
      ethNetwork,
      {
        infura: {
          projectId: process.env.INFURA_PROJECT_ID || '64074292bca44137af981e11f413eae7',
          projectSecret: process.env.INFURA_PROJECT_SECRET || '8bddd32c91d34bdc963f435d22809184'
        },
        etherscan: process.env.ETHERSCAN_SECRET || 'H5JDJB1M52EURV4VH68CKGK1WSWAWRMMFT'
      }
    );
    tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
    uBCContract = new ethers.Contract(uBCAddress, uBCABI, provider);

    let tokenName = await tokenContract.name();
    let tokenSymbol = await tokenContract.symbol();
    let tokenDecimals = await tokenContract.decimals();

    this.provider = provider;
    this.tokenContract = tokenContract;
    this.tokenName = tokenName;
    this.tokenSymbol = tokenSymbol;
    this.tokenDecimals = tokenDecimals;
    this.uBCContract = uBCContract;
    this.event_logs = {};
    this.redis = redis;
    this.overriddenStatus = {};
    this.initialized = true;
  }

  async getNUbounties() {
    return (await this.uBCContract.numUbounties()).toNumber();
  }

  async getBountyChest(id) {
    return await this.uBCContract.bCList(id);
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
    uBounty.name = rawUBounty[7];
    uBounty.description = rawUBounty[8];
    uBounty.infoHash = rawUBounty[9];
    uBounty.index = id;
    uBounty.bc = await this.getBountyChest(uBounty.bountyChestIndex);
    uBounty.amount = (
      await this.tokenContract.balanceOf(uBounty.bc)
    ).toString();
    uBounty.weiAmount = (await this.uBCContract.weiBountyAmount(uBounty.index)).toString()
    // Get submissions
    uBounty.submissions = await this.getBountySubmissions(uBounty);
    return uBounty;
  }

  async getUbounties(count) {
    let uBounties = new Array();
    let numUbounties = await this.getNUbounties();
    // Assert count <= numUBounties
    count = Math.min(count, numUbounties);
    for (let i = numUbounties - count; i < numUbounties; i++) {
      let uBounty = await this.getUBounty(i);
      if (uBounty != null && uBounty != undefined) {
        uBounties.push(uBounty);
      }
    }
    return uBounties;
  }

  async getBountySubmissions(uBounty) {
    let submissions = new Array();
    for (let i = 0; i < uBounty.numSubmissions; i++) {
      let submission = {};
      let subRaw = await this.uBCContract.getSubmission(uBounty.index, i);
      submission.index = i;
      submission.submissionString = subRaw[0];
      submission.submitterIndex = subRaw[1];
      submission.approved = subRaw[2];
      /*
      submission.numRevisions = subRaw[3];
      if (submission.numRevisions > 0) {
        submission.revisions = await this.getSubmissionRevisions(
          uBounty,
          submission
        );
      } else {
        submission.revisions = [];
      }*/
      submissions.push(submission);
    }
    return submissions;
  }

  async getSubmissionRevisions(uBounty, submission) {
    let revisions = new Array();
    for (let i = 0; i < submission[3]; i++) {
      let revision = {};
      revision.index = i;
      revision.revision = await this.uBCContract.getRevision(
        uBounty.index,
        submission.index,
        revision.index
      );
      revisions.push(revision);
    }
    return revisions;
  }

  // Event logs
  async gatherEventLogs(retries = 0) {
    try {
      let event_logs = new Object();

      let event_logs_cache = await this.redis.getEventLogCache()
      let lastHadBlock = await this.redis.getLastBlockCount()
      let fromBlock = lastHadBlock < 0 ? eventLogDefaultFromBlock : lastHadBlock
      let toBlock = await this.provider.getBlockNumber()

      console.log(`Gathering event logs from ${fromBlock} TO ${toBlock}`)    

      if (event_logs_cache) {
        this.event_logs = event_logs_cache
      }

      if (lastHadBlock >= toBlock) {
        // Don't need to retrieve any logs
        return
      }

      let createdTopic = utils.id("created(uint256,uint256,uint256,uint256)");
      let submittedTopic = utils.id("submitted(uint256,uint256)");
      let revisedTopic = utils.id("revised(uint256,uint256,uint256)");
      let approvedTopic = utils.id("approved(uint256,uint256,string)");
      let rejectedTopic = utils.id("rejected(uint256,uint256,string)");
      let revisionRequestedTopic = utils.id(
        "revisionRequested(uint256,uint256,string)"
      );
      let rewardedTopic = utils.id("rewarded(uint256,uint256,address,uint256,uint256)");
      let reclaimedTopic = utils.id("reclaimed(uint256,uint256,uint256)");
      let completedTopic = utils.id("completed(uint256)");
      let feeChangeTopic = utils.id("feeChange(uint256,uint256)");
      let waiverChangeTopic = utils.id("waiverChange(uint256,uint256)");

      let createdFilter = this.createFilter(createdTopic, fromBlock, toBlock);
      let submittedFilter = this.createFilter(submittedTopic, fromBlock, toBlock);
      let revisedFilter = this.createFilter(revisedTopic, fromBlock, toBlock);
      let approvedFilter = this.createFilter(approvedTopic, fromBlock, toBlock);
      let rejectedFilter = this.createFilter(rejectedTopic, fromBlock, toBlock);
      let revisionRequestedFilter = this.createFilter(revisionRequestedTopic, fromBlock, toBlock);
      let rewardedFilter = this.createFilter(rewardedTopic, fromBlock, toBlock);
      let reclaimedFilter = this.createFilter(reclaimedTopic, fromBlock, toBlock);
      let completedFilter = this.createFilter(completedTopic, fromBlock, toBlock);
      let feeChangedFilter = this.createFilter(feeChangeTopic, fromBlock, toBlock);
      let waiverChangedFilter = this.createFilter(waiverChangeTopic, fromBlock, toBlock);

      let createdLogs = await this.provider.getLogs(createdFilter);
      let submittedLogs = await this.provider.getLogs(submittedFilter);
      let revisedLogs = await this.provider.getLogs(revisedFilter);
      let approvedLogs = await this.provider.getLogs(approvedFilter);
      let rejectedLogs = await this.provider.getLogs(rejectedFilter);
      let revisionRequestedLogs = await this.provider.getLogs(
        revisionRequestedFilter
      );
      let rewardedLogs = await this.provider.getLogs(rewardedFilter);
      let reclaimedLogs = await this.provider.getLogs(reclaimedFilter);
      let completedLogs = await this.provider.getLogs(completedFilter);
      let feeChangedLogs = await this.provider.getLogs(feeChangedFilter);
      let waiverChangedLogs = await this.provider.getLogs(waiverChangedFilter);

      let createdInfo = await this.getCreatedInfo(createdLogs);
      let submittedInfo = await this.getSubmittedInfo(submittedLogs);
      let revisedInfo = await this.getRevisedInfo(revisedLogs);
      let approvedInfo = await this.getApprovedInfo(approvedLogs);
      let rejectedInfo = await this.getRejectedInfo(rejectedLogs);
      let revisionRequestedInfo = await this.getRevisionRequestedInfo(
        revisionRequestedLogs
      );
      let rewardedInfo = await this.getRewardedInfo(rewardedLogs);
      let reclaimedInfo = await this.getReclaimedInfo(reclaimedLogs);
      let completedInfo = await this.getCompletedInfo(completedLogs);
      let feeChangedInfo = await this.getFeeChangedInfo(feeChangedLogs);
      let waiverChangedInfo = await this.getWaiverChangedInfo(waiverChangedLogs);


      event_logs.approvedLogs = approvedLogs
      event_logs.rejectedLogs = rejectedLogs
      event_logs.created = createdInfo;
      event_logs.submitted = submittedInfo;
      event_logs.revised = revisedInfo;
      event_logs.approved = approvedInfo;
      event_logs.rejected = rejectedInfo;
      event_logs.revisionRequested = revisionRequestedInfo;
      event_logs.rewarded = rewardedInfo;
      event_logs.reclaimed = reclaimedInfo;
      event_logs.completed = completedInfo;
      event_logs.feeChanged = feeChangedInfo;
      event_logs.waiverChanged = waiverChangedInfo;

      // Cache
      if (event_logs_cache != null) {
        _.mergeWith(event_logs, event_logs_cache, function(objValue, srcValue) { if (_.isArray(objValue)) { return _.union(objValue, srcValue); }})
      }
      await this.redis.setEventLogCache(event_logs, toBlock)

      let orderedFeedback = await this.getOrderedFeedback(
        event_logs.approvedLogs,
        event_logs.rejectedLogs
      );
      event_logs.orderedFeedback = orderedFeedback

      console.log(event_logs)
      console.log("Finished gathering event logs")
      this.event_logs = event_logs;
    } catch (e) {
      console.log(e)
      if (retries < 3) {
        console.log("Retrying event log gather")
        await this.redis.clearEventLogCache()
        await this.gatherEventLogs(retries+=1)
      } else {
        console.log(`CRITICAL: Event log gathering failed after ${retries} attempts`)
      }
    }
  }

  createFilter(topic, fromBlock, toBlock) {
    let filter = {
      address: uBCAddress,
      fromBlock: fromBlock,
      toBlock: toBlock,
      topics: [topic],
    };
    return filter;
  }

  ArrayifyLogData(logs) {
    let events = new Array();
    for (let n = 0; n < logs.length; n++) {
      let data = logs[n].data;
      data = data.substring(2);
      data = data.match(/.{1,64}/g); //divide data from event log into 64 length sections
      for (let j = 0; j < data.length; j++) {
        data[j] = "0x" + data[j];
      }
      events.push(data);
    }
    return events;
  }

  HexToAddress(hex) {
    return "0x" + hex.substring(26);
  }

  HexToInt(hex, decimals) {
    return utils.formatUnits(BigNumber.from(hex), decimals);
  }

  HexToString(hex) {
    return web3.utils.toAscii(hex);
  }

  async getTimeStamp(blockNumber) {
    let block = await this.provider.getBlock(blockNumber);
    return block.timestamp;
  }

  async getNonce(txHash) {
    let tx = await this.provider.getTransaction(txHash);
    return tx.nonce;
  }

  async getCreatedInfo(createdLogs) {
    let createdHexArray = this.ArrayifyLogData(createdLogs);
    let createdInfo = new Array();

    for (let n = 0; n < createdLogs.length; n++) {
      let log = createdHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.bountiesAvailable = parseInt(this.HexToInt(log[1], 0));
      eventInfo.bountyAmount = this.HexToInt(log[2], this.tokenDecimals);
      eventInfo.ethBountyAmount = this.HexToInt(log[3], 18);
      eventInfo.eventInfo = createdLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(createdLogs[n].blockNumber);
      eventInfo.nonce = await this.getNonce(createdLogs[n].transactionHash);
      createdInfo.push(eventInfo);
    }
    return createdInfo;
  }

  async getSubmittedInfo(submittedLogs) {
    let submittedHexArray = this.ArrayifyLogData(submittedLogs);
    let submittedInfo = new Array();

    for (let n = 0; n < submittedHexArray.length; n++) {
      let log = submittedHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.submissionIndex = parseInt(this.HexToInt(log[1], 0));
      eventInfo.eventInfo = submittedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        submittedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(submittedLogs[n].transactionHash);

      submittedInfo.push(eventInfo);
    }
    return submittedInfo;
  }

  async getRevisedInfo(revisedLogs) {
    let revisedHexArray = this.ArrayifyLogData(revisedLogs);
    let revisedInfo = new Array();

    for (let n = 0; n < revisedHexArray.length; n++) {
      let log = revisedHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.submissionIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.revisionIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.eventInfo = revisedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(revisedLogs[n].blockNumber);
      eventInfo.nonce = await this.getNonce(revisedLogs[n].transactionHash);
      revisedInfo.push(eventInfo);
    }
    return revisedInfo;
  }

  async getApprovedInfo(approvedLogs) {
    let approvedHexArray = this.ArrayifyLogData(approvedLogs);

    let approvedInfo = new Array();
    for (let n = 0; n < approvedHexArray.length; n++) {
      let log = approvedHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.submissionIndex = parseInt(this.HexToInt(log[1], 0));
      eventInfo.feedback = "";
      for (let j = 4; j < log.length; j++) {
        eventInfo.feedback += this.HexToString(log[j]);
      }

      eventInfo.eventInfo = approvedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        approvedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(approvedLogs[n].transactionHash);
      approvedInfo.push(eventInfo);
    }
    return approvedInfo;
  }

  async getRejectedInfo(rejectedLogs) {
    let rejectedHexArray = this.ArrayifyLogData(rejectedLogs);

    let rejectedInfo = new Array();
    for (let n = 0; n < rejectedHexArray.length; n++) {
      let log = rejectedHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.submissionIndex = parseInt(this.HexToInt(log[1], 0));
      eventInfo.feedback = "";
      for (let j = 4; j < log.length; j++) {
        eventInfo.feedback += this.HexToString(log[j]);
      }

      eventInfo.eventInfo = rejectedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        rejectedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(rejectedLogs[n].transactionHash);
      rejectedInfo.push(eventInfo);
    }
    return rejectedInfo;
  }

  async getRevisionRequestedInfo(revisionRequestedLogs) {
    let revisionRequestedHexArray = this.ArrayifyLogData(revisionRequestedLogs);

    let revisionRequestedInfo = new Array();
    for (let n = 0; n < revisionRequestedHexArray.length; n++) {
      let log = revisionRequestedHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.submissionIndex = parseInt(this.HexToInt(log[1], 0));
      eventInfo.feedback = "";
      for (let j = 4; j < log.length; j++) {
        eventInfo.feedback += this.HexToString(log[j]);
      }

      eventInfo.eventInfo = revisionRequestedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        revisionRequestedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(
        revisionRequestedLogs[n].transactionHash
      );
      revisionRequestedInfo.push(eventInfo);
    }
    return revisionRequestedInfo;
  }

  async getRewardedInfo(rewardedLogs) {
    let rewardedHexArray = this.ArrayifyLogData(rewardedLogs);

    let rewardedInfo = new Array();
    for (let n = 0; n < rewardedHexArray.length; n++) {
      let log = rewardedHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.submissionIndex = parseInt(this.HexToInt(log[1], 0));
      eventInfo.hunter = this.HexToAddress(log[2]);
      eventInfo.rewardAmount = this.HexToInt(log[3], this.tokenDecimals);
      eventInfo.ethRewardAmount = this.HexToInt(log[4], 18);
      eventInfo.eventInfo = rewardedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        rewardedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(rewardedLogs[n].transactionHash);
      rewardedInfo.push(eventInfo);
    }
    return rewardedInfo;
  }
  async getReclaimedInfo(reclaimedLogs) {
    let reclaimedHexArray = this.ArrayifyLogData(reclaimedLogs);

    let reclaimedInfo = new Array();
    for (let n = 0; n < reclaimedHexArray.length; n++) {
      let log = reclaimedHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));
      eventInfo.reclaimedAmount = this.HexToInt(log[1], 8);
      eventInfo.ethReclaimedAmount = this.HexToInt(log[2], 18);

      eventInfo.eventInfo = reclaimedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        reclaimedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(reclaimedLogs[n].transactionHash);
      reclaimedInfo.push(eventInfo);
    }
    return reclaimedInfo;
  }

  async getCompletedInfo(completedLogs) {
    let completedHexArray = this.ArrayifyLogData(completedLogs);

    let completedInfo = new Array();
    for (let n = 0; n < completedHexArray.length; n++) {
      let log = completedHexArray[n];
      let eventInfo = new Object();
      eventInfo.ubountyIndex = parseInt(this.HexToInt(log[0], 0));

      eventInfo.eventInfo = completedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        completedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(completedLogs[n].transactionHash);
      completedInfo.push(eventInfo);
    }
    return completedInfo;
  }

  async getFeeChangedInfo(feeChangedLogs) {
    let feeChangedHexArray = this.ArrayifyLogData(feeChangedLogs);

    let feeChangedInfo = new Array();
    for (let n = 0; n < feeChangedHexArray.length; n++) {
      let log = feeChangedHexArray[n];
      let eventInfo = new Object();
      eventInfo.oldFee = this.HexToInt(log[0], 8);
      eventInfo.newFee = this.HexToInt(log[1], 8);

      eventInfo.eventInfo = feeChangedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        feeChangedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(feeChangedLogs[n].transactionHash);
      feeChangedInfo.push(eventInfo);
    }
    return feeChangedInfo;
  }

  async getWaiverChangedInfo(waiverChangedLogs) {
    let waiverChangedHexArray = this.ArrayifyLogData(waiverChangedLogs);

    let waiverChangedInfo = new Array();
    for (let n = 0; n < waiverChangedHexArray.length; n++) {
      let log = waiverChangedHexArray[n];
      let eventInfo = new Object();
      eventInfo.oldWaiver = this.HexToInt(log[0], 8);
      eventInfo.newWaiver = this.HexToInt(log[1], 8);

      eventInfo.eventInfo = waiverChangedLogs[n];
      eventInfo.timestamp = await this.getTimeStamp(
        waiverChangedLogs[n].blockNumber
      );
      eventInfo.nonce = await this.getNonce(
        waiverChangedLogs[n].transactionHash
      );
      waiverChangedInfo.push(eventInfo);
    }
    return waiverChangedInfo;
  }

  async getOrderedFeedback(approvedLogs, rejectedLogs) {
    let approvedHexArray = this.ArrayifyLogData(approvedLogs);
    let rejectedHexArray = this.ArrayifyLogData(rejectedLogs);
    //let revisionRequestedHexArray = this.ArrayifyLogData(revisionRequestedLogs);

    let feedbackInfo = new Array();

    for (let n = 0; n < approvedHexArray.length; n++) {
      let log = approvedHexArray[n];
      let uI = parseInt(this.HexToInt(log[0], 0));
      let sI = parseInt(this.HexToInt(log[1], 0));
      let eventInfo = new Object();
      let feedback = "";

      for (let j = 4; j < log.length; j++) {
        feedback += this.HexToString(log[j]);
      }
      if (feedbackInfo[uI] == undefined) {
        feedbackInfo[uI] = new Array();
      }
      if (feedbackInfo[uI][sI] == undefined) {
        feedbackInfo[uI][sI] = new Array();
      }
      eventInfo.event = "Approved";
      eventInfo.feedback = feedback;
      eventInfo.nonce = await this.getNonce(approvedLogs[n].transactionHash);
      eventInfo.timestamp = await this.getTimeStamp(
        approvedLogs[n].blockNumber
      );
      feedbackInfo[uI][sI].push(eventInfo);
    }

    for (let n = 0; n < rejectedHexArray.length; n++) {
      let log = rejectedHexArray[n];
      let uI = parseInt(this.HexToInt(log[0], 0));
      let sI = parseInt(this.HexToInt(log[1], 0));
      let eventInfo = new Object();
      let feedback = "";

      for (let j = 4; j < log.length; j++) {
        feedback += this.HexToString(log[j]);
      }
      if (feedbackInfo[uI] == undefined) {
        feedbackInfo[uI] = new Array();
      }
      if (feedbackInfo[uI][sI] == undefined) {
        feedbackInfo[uI][sI] = new Array();
      }
      eventInfo.event = "Rejected";
      eventInfo.feedback = feedback;
      eventInfo.nonce = await this.getNonce(rejectedLogs[n].transactionHash);
      eventInfo.timestamp = await this.getTimeStamp(
        rejectedLogs[n].blockNumber
      );
      feedbackInfo[uI][sI].push(eventInfo);
    }

    /*
    for (let n = 0; n < revisionRequestedHexArray.length; n++) {
      let log = revisionRequestedHexArray[n];
      let uI = parseInt(this.HexToInt(log[0], 0));
      let sI = parseInt(this.HexToInt(log[1], 0));
      let eventInfo = new Object();
      let feedback = "";

      for (let j = 4; j < log.length; j++) {
        feedback += this.HexToString(log[j]);
      }
      if (feedbackInfo[uI] == undefined) {
        feedbackInfo[uI] = new Array();
      }
      if (feedbackInfo[uI][sI] == undefined) {
        feedbackInfo[uI][sI] = new Array();
      }
      eventInfo.event = "Revision Requested";
      eventInfo.feedback = feedback;
      eventInfo.nonce = await this.getNonce(
        revisionRequestedLogs[n].transactionHash
      );
      eventInfo.timestamp = await this.getTimeStamp(
        revisionRequestedLogs[n].blockNumber
      );
      feedbackInfo[uI][sI].push(eventInfo);
    }*/

    for (let p = 0; p < feedbackInfo.length; p++) {
      if (feedbackInfo[p] != undefined) {
        for (let q = 0; q < feedbackInfo[p].length; q++) {
          if (feedbackInfo[p][q] != undefined) {
            feedbackInfo[p][q].sort((a, b) => a.nonce - b.nonce);
          }
        }
      }
    }

    return feedbackInfo;
  }

  async getOrderedApprovedInfo(approvedHexArray) {
    let approvedInfo = new Array();
    for (let n = 0; n < approvedHexArray.length; n++) {
      let log = approvedHexArray[n];
      let uI = parseInt(this.HexToInt(log[0], 0));
      let sI = parseInt(this.HexToInt(log[1], 0));
      let feedback = "";

      for (let j = 4; j < log.length; j++) {
        feedback += this.HexToString(log[j]);
      }
      if (approvedInfo[uI] == undefined) {
        approvedInfo[uI] = new Array();
      }
      if (approvedInfo[uI][sI] == undefined) {
        approvedInfo[uI][sI] = new Array();
      }
      approvedInfo[uI][sI].push(feedback);
    }
    return approvedInfo;
  }

  async getOrderedRejectedInfo(rejectedHexArray) {
    let rejectedInfo = new Array();
    for (let n = 0; n < rejectedHexArray.length; n++) {
      let log = rejectedHexArray[n];
      let uI = parseInt(this.HexToInt(log[0], 0));
      let sI = parseInt(this.HexToInt(log[1], 0));
      let feedback = "";

      for (let j = 4; j < log.length; j++) {
        feedback += this.HexToString(log[j]);
      }
      if (rejectedInfo[uI] == undefined) {
        rejectedInfo[uI] = new Array();
      }
      if (rejectedInfo[uI][sI] == undefined) {
        rejectedInfo[uI][sI] = new Array();
      }
      rejectedInfo[uI][sI].push(feedback);
    }
    return rejectedInfo;
  }

  async getOrderedRevisionRequestedInfo(revisionRequestedHexArray) {
    let revisionRequestedInfo = new Array();
    for (let n = 0; n < revisionRequestedHexArray.length; n++) {
      let log = revisionRequestedHexArray[n];
      let uI = parseInt(this.HexToInt(log[0], 0));
      let sI = parseInt(this.HexToInt(log[1], 0));
      let feedback = "";

      for (let j = 4; j < log.length; j++) {
        feedback += this.HexToString(log[j]);
      }
      if (revisionRequestedInfo[uI] == undefined) {
        revisionRequestedInfo[uI] = new Array();
      }
      if (revisionRequestedInfo[uI][sI] == undefined) {
        revisionRequestedInfo[uI][sI] = new Array();
      }
      revisionRequestedInfo[uI][sI].push(feedback);
    }
    return revisionRequestedInfo;
  }

  async getAwarded() {
    console.log("get Event Logs");
    let eventLogs = new Array();

    let topic = utils.id("awarded(address,address,string,uint256)");
    let filter = {
      address: "0xe1074d040de6a7ab526a45ef6439a68e64026f5a", //"0x7DE09eE61Fd4c326098bE7C4C86b80408707DB9b",
      fromBlock: 10000000,
      toBlock: 11111111,
      topics: [topic],
    };

    let result = await this.provider.getLogs(filter); //get event logs of all instances of bounties awarded
    for (let n = 0; n < result.length; n++) {
      let log = new Object();
      let data = result[n].data;
      data = data.substring(2);
      data = data.match(/.{1,64}/g); //divide data from event log into 64 length sections
      for (let j = 0; j < 6; j++) {
        data[j] = "0x" + data[j];
      }
      let descriptionData = "";
      for (let j = 5; j < data.length; j++) {
        descriptionData += data[j];
      }
      let poster = "0x" + data[0].substring(26);
      let hunter = "0x" + data[1].substring(26);
      let amount = utils.formatUnits(BigNumber.from(data[3]), 8);
      let description = web3.utils.toAscii(descriptionData);
      log.poster = poster;
      log.hunter = hunter;
      log.amount = amount;
      log.description = description;
      log.txHash = result[n].transactionHash;
      eventLogs.push(log);
    }
    return eventLogs;
  }

  getSubmissionApprovedTimestamp(uI, sI) {
    let approved = this.event_logs.approved.filter((ap) => ap.ubountyIndex == uI && ap.submissionIndex == sI)
    if (approved.length == 0) {
      return null
    }
    return approved[0].timestamp
  }

  getSubmissionRejectedTimestamp(uI, sI) {
    let rejected = this.event_logs.rejected.filter((ap) => ap.ubountyIndex == uI && ap.submissionIndex == sI)
    if (rejected.length == 0) {
      return null
    }
    return rejected[0].timestamp
  }

  getSubmissionStatus(uI, sI) {
    let ret
    let feedback
    if (this.overriddenStatus[uI] && this.overriddenStatus[uI][sI]) {
      ret = this.overriddenStatus[uI][sI].event
      feedback = this.overriddenStatus[uI][sI].feedback
    } else {
      try {
        let events = this.event_logs.orderedFeedback[uI][sI];
        ret = events[events.length - 1].event;
        feedback = events[events.length - 1].feedback;
      } catch(e) {
        ret = "pending";
        feedback = undefined
      }
    }
    if (ret) {
      ret = ret.toLowerCase()
    }
    if (!ret || ret == 'revision requested' || ret == 'awaiting feedback') {
      ret = "pending"
    }
    let retObj = {
      status: ret,
      feedback: feedback
    }
    if (ret == "approved") {
      for (const rewarded of this.event_logs.rewarded.filter((reward) => reward.ubountyIndex == uI && reward.submissionIndex == sI)) {
        if ('eventInfo' in rewarded) {
          retObj.blockHash = rewarded.eventInfo.blockHash
        }
      }
    }
    return retObj
  }

  getSubmissionAmount(uI, sI) {
    let allRewarded = this.event_logs.rewarded.filter((reward) => reward.ubountyIndex == uI && reward.submissionIndex == sI)
    let totalAmount = BigNumber.from(0)
    let totalAmountWei = BigNumber.from(0)
    for (const reward of allRewarded) {
      totalAmount = totalAmount.add(utils.parseUnits(reward.rewardAmount, 8))
      totalAmountWei = totalAmountWei.add(utils.parseEther(reward.ethRewardAmount))
    }
    return {
      devcash: totalAmount.toString(),
      wei: totalAmountWei.toString()
    }
  }

  overrideStatus(uI, sI, status, feedback) {
    if (!this.overriddenStatus[uI]) {
      this.overriddenStatus[uI] = {}
    }
    if (!this.overriddenStatus[uI][sI]) {
      this.overriddenStatus[uI][sI] = {}
    }
    this.overriddenStatus[uI][sI].event = status
    this.overriddenStatus[uI][sI].feedback = feedback
  }
}

// exports
const etherClient = new EtherClient();

module.exports = {
  etherClient,
};

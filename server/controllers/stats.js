const { utils, BigNumber } = require("ethers")
const { UBounty, Submission, Op } = require('../models');
const { etherClient } = require('../utils/ether_client')
const { RedisDB } = require("../redis")

const redis = new RedisDB()

module.exports.getOverviewStats = async (req, res, next) => {
  try {
    let address = req.query.address
    try {
      address = utils.getAddress(address)
    } catch (e) {
      return res.status(422).json({ error: "Invalid address" });
    }
    // Get hunter stats
    let submissions = await Submission.findAndCountAll({
      where: {
        [Op.or]: [{creator: address}, {'$ubounty.creator$':address}],
      },
      include: { model: UBounty, as: 'ubounty' }
    })
    let totalSubmissions = submissions.count
    let totalEarnedDC = BigNumber.from(0)
    let totalEarnedWei = BigNumber.from(0)

    let hunterRewards = etherClient.event_logs.rewarded.filter((reward) => reward.hunter ? reward.hunter.toLowerCase() == address.toLowerCase() : false)
    for (const reward of hunterRewards) {
      totalEarnedDC = totalEarnedDC.add(utils.parseUnits(reward.rewardAmount, 8))
      totalEarnedWei = totalEarnedWei.add(utils.parseEther(reward.ethRewardAmount))
    }
    // Get creator stats
    let bounties = await UBounty.findAndCountAll({
      where: {
        [Op.or]: [{creator: address}, {hunter: address}]
      },
      include: { model: Submission, as: 'submissions' }
    })
    let bountiesAdj = []
    for (let rObj of bounties.rows) {
      let jObj = rObj
      for (let rSub of jObj.submissions) {
        let status = etherClient.getSubmissionStatus(rSub.ubounty_id, rSub.submission_id)  
        rSub.status = status.status
        rSub.feedback = status.feedback       
        if (rSub.status == "approved") {
          rSub.overrideAmount = etherClient.getSubmissionAmount(rSub.ubounty_id, rSub.submission_id)  
        }             
      }
      // Get nAvailable
      let cached = await redis.getUBounty(jObj.id)
      if (cached) {  
        jObj.available = cached.available
        jObj.bountyAmount = cached.amount
        jObj.weiAmount = cached.weiAmount
      }
      bountiesAdj.push(jObj)
    }    
    let totalBounties = bounties.count
    let totalAwardedDC = BigNumber.from(0)
    let totalAwardedWei = BigNumber.from(0)
    let bountyIDs = []
    let completedBounties = []
    for (const bounty of bountiesAdj) {
      if (bounty.creator != address) {
        continue
      }
      if (bounty.submissions.filter(sub => sub.status == 'approved').length >= bounty.available) {
        completedBounties.push(bounty)
      }
      bountyIDs.push(bounty.id)
    }
    let creatorRewards = etherClient.event_logs.rewarded.filter((reward) => bountyIDs.includes(reward.ubountyIndex)) 
    let reclaimedLog = etherClient.event_logs.reclaimed.filter((reclaim) => bountyIDs.includes(reclaim.ubountyIndex))
    for (const reward of creatorRewards) {
      totalAwardedDC = totalAwardedDC.add(utils.parseUnits(reward.rewardAmount, 8))
      totalAwardedWei = totalAwardedWei.add(utils.parseEther(reward.ethRewardAmount))
    }
  
    let activity = []
    activity = activity.concat(bountiesAdj)
    activity = activity.concat(submissions.rows)

    activity = activity.map((a) => {
      a = a.toJSON()
      a.type = ""
      a.name = ""
      // Is a submission
      if (a.submission_data) {
        let status = etherClient.getSubmissionStatus(a.ubounty_id, a.submission_id)
        a.status = status.status
        feedback = status.feedback
        a.name = a.ubounty.title
        if (a.ubounty.creator == address) {
          a.address = a.ubounty.creator
          a.perspective = "manager"
          // Submission for their bounty
          a.type = "submissionReceived"
        } else if (a.creator == address) {
          a.address = a.creator
          a.perspective = "hunter"
        } else {
          a.disregard = true
        }
        if (a.approved) {
          a.type = "submissionApproved"
        } else if (a.status == "rejected") {
          a.type = "submissionRejected"
        } else {
          a.type = a.perspective == "hunter" ? "submissionSent" : "submissionReceived"
        }        
      } else {
        // Bounties
        a.name = a.title
        a.bountyId = a.id
        if (a.creator = address) {
          a.address = a.creator
          a.perspective = "manager"
          if (a.hunter) {
            a.type = "bountyPersonalCreated"
          } else {
            a.type = "bountyCreated"
          }
        } else if (a.hunter == address) {
          a.address = a.hunter
          a.perspective = "hunter"
          a.type = "bountyPersonalCreated"
        } else {
          a.disregard = true
        }
      }
      delete a.ubounty
      delete a.submissions
      return a
    })

    // Add rewarded
    for (const reward of hunterRewards) {
      let item = {
        type: "rewarded",
        perspective: "hunter",
        createdAt: new Date(parseInt(parseInt(reward.timestamp) * 1000)),
        amount: reward.rewardAmount,
        ethAmount: reward.ethRewardAmount
      }
      if ('eventInfo' in reward) {
        item.blockhash = reward.eventInfo.blockHash
      }
      activity.push(item)
    }

    for (const reward of creatorRewards) {
      let item = {
        type: "rewarded",
        perspective: "manager",
        createdAt: new Date(parseInt(parseInt(reward.timestamp) * 1000)),
        amount: reward.rewardAmount,
        ethAmount: reward.ethRewardAmount,
        bountyId: reward.ubountyIndex
      }
      if ('eventInfo' in reward) {
        item.blockhash = reward.eventInfo.blockhash
      }
      activity.push(item)
    }

    for (const reclaimed of reclaimedLog) {
      let bounty = bountiesAdj.filter((bounty) => bounty.id == reclaimed.ubountyIndex)
      let bountyName = null
      if (bounty.length > 0) {
        bountyName = bounty[0].title
      }
      activity.push({
        type: "bountyReclaimed",
        perspective: "manager",
        createdAt: new Date(parseInt(parseInt(reclaimed.timestamp) * 1000)),
        name: bountyName
      })
    }

    activity.filter((a) => {
      if (a.disregard) {
        return false
      }
      return true
    })

    // Factor in completed events
    let completedProcessed = []
    for (const completedBounty of completedBounties) {
      if (completedProcessed.includes(completedBounty.id)) {
        continue
      }
      // Get newest activity item for this bounty
      let mostRecentDate = Math.max.apply(null, activity.map(e => {
        if ('bountyId' in e && e.bountyId == completedBounty.id) {
          return e.createdAt;
        }
        return new Date(-8640000000000000);
      }));
      if (mostRecentDate) {
        activity.push({
          createdAt: mostRecentDate,
          type: "bountyCompleted",
          perspective: "manager",
          name: completedBounty.title
        })
        completedProcessed.push(completedBounty.id)
      }    
    }

    activity.sort((a, b) => {
      let aDt = new Date(a.createdAt)
      let bDt = new Date(b.createdAt)
      if (aDt < bDt) {
        return 1
      }
      return -1
    })

    // Aggregate results
    return res.status(200).json({
      totalSubmissions: totalSubmissions,
      totalEarnedDC: totalEarnedDC.toString(),
      totalEarnedWei: totalEarnedWei.toString(),
      totalBounties: totalBounties,
      totalAwardedDC: totalAwardedDC.toString(),
      totalAwardedWei: totalAwardedWei.toString(),
      activity: activity
    })
  } catch (e) {
    res.status(500).send({
      message: "Failed retrieve stats"
    })
    console.log(`Error retrieving stats ${e}`)
    return next(e)    
  }
}

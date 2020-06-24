const { utils } = require("ethers")
const { UBounty, Submission, Op } = require('../models');
const { etherClient } = require('../utils/ether_client')
const submission = require("../models/submission");

/*
      offset: offset,
      limit: limit,
      where: {
        '$ubounty.creator$': {[Op.eq]:creator}
      },
      order: [
          ['createdAt', 'DESC']
      ],
      include: { model: UBounty, as: 'ubounty' }

      
  static formatAmountSingleSubmission(bounty, tokenDecimals) {
    let totalAmount = utils.bigNumberify(bounty.bountyAmount);
    totalAmount = totalAmount.div(bounty.available);
    totalAmount = utils.commify(utils.formatUnits(totalAmount, tokenDecimals));
    return totalAmount;
  }

  static formatAmountSingleSubmissionEth(bounty) {
    let totalAmount = utils.bigNumberify(bounty.weiAmount);
    totalAmount = totalAmount.div(bounty.available);
    totalAmount = utils.formatEther(totalAmount);
    return totalAmount;
  }

*/
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
    let totalEarnedDC = utils.bigNumberify(0)
    let totalEarnedWei = utils.bigNumberify(0)
    for (const sub of submissions.rows) {
      if (sub.approved && sub.creator == address) {
        let bountyAmount = utils.bigNumberify(sub.ubounty.bountyAmount)
        let bountyAmountWei = utils.bigNumberify(sub.ubounty.weiAmount)
        totalEarnedDC.add(bountyAmount.div(sub.ubounty.available))
        totalEarnedWei.add(bountyAmountWei.div(sub.ubounty.available))
      }
    }
    // Get creator stats
    let bounties = await UBounty.findAndCountAll({
      where: {
        [Op.or]: [{creator: address}, {hunter: address}]
      },
      include: { model: Submission, as: 'submissions' }
    })
    let totalBounties = bounties.count
    let totalAwardedDC = utils.bigNumberify(0)
    let totalAwardedWei = utils.bigNumberify(0)
    for (const bounty of bounties.rows) {
      if (bounty.creator != address) {
        continue
      }
      let bountyAmount = utils.bigNumberify(bounty.bountyAmount)
      let bountyAmountWei = utils.bigNumberify(bounty.weiAmount)      
      for (const sub of bounty.submissions) {
        if (sub.approved) {
          totalAwardedDC.add(bountyAmount.div(bounty.available))
          totalAwardedWei.add(bountyAmountWei.div(bounty.available))
        }
      }
    }

    let activity = []
    activity = activity.concat(bounties.rows)
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
    activity.filter((a) => {
      if (a.disregard) {
        return false
      }
      return true
    })
  
    activity.sort((a, b) => {
      let aDt = new Date(a.createdAt)
      let bDt = new Date(b.createdDt)
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

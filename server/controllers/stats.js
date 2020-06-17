const { utils } = require("ethers")
const { UBounty, Submission, Op } = require('../models');
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
        creator: {[Op.eq]: address},
      },
      include: { model: UBounty, as: 'ubounty' }
    })
    let totalSubmissions = submissions.count
    let totalEarnedDC = utils.bigNumberify(0)
    let totalEarnedWei = utils.bigNumberify(0)
    for (const sub of submissions.rows) {
      if (sub.approved) {
        let bountyAmount = utils.bigNumberify(sub.ubounty.bountyAmount)
        let bountyAmountWei = utils.bigNumberify(sub.ubounty.weiAmount)
        totalEarnedDC.add(bountyAmount.div(sub.ubounty.available))
        totalEarnedWei.add(bountyAmountWei.div(sub.ubounty.available))
      }
    }
    // Get creator stats
    let bounties = await UBounty.findAndCountAll({
      where: {
        creator: {[Op.eq]: address}
      },
      include: { model: Submission, as: 'submissions' }
    })
    let totalBounties = bounties.count
    let totalAwardedDC = utils.bigNumberify(0)
    let totalAwardedWei = utils.bigNumberify(0)
    for (const bounty of bounties.rows) {
      let bountyAmount = utils.bigNumberify(bounty.bountyAmount)
      let bountyAmountWei = utils.bigNumberify(bounty.weiAmount)      
      for (const sub of bounty.submissions) {
        if (sub.approved) {
          totalAwardedDC.add(bountyAmount.div(bounty.available))
          totalAwardedWei.add(bountyAmountWei.div(bounty.available))
        }
      }
    }

    // Aggregate results
    return res.status(200).json({
      totalSubmissions: totalSubmissions,
      totalEarnedDC: totalEarnedDC.toString(),
      totalEarnedWei: totalEarnedWei.toString(),
      totalBounties: totalBounties,
      totalAwardedDC: totalAwardedDC.toString(),
      totalAwardedWei: totalAwardedWei.toString()
    })
  } catch (e) {
    res.status(500).send({
      message: "Failed retrieve stats"
    })
    console.log(`Error retrieving stats ${e}`)
    return next(e)    
  }
}

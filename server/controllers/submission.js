const { utils } = require('ethers')
const { check, validationResult } = require('express-validator');
const { etherClient } = require("../utils/ether_client")
const { UBounty, Submission, SubmissionStaged, Op }  = require('../models');
const crypto = require('crypto');

// list?bounty=1&page=1&limit=10
module.exports.getSubmissions = async (req, res, next) => {
  try {
    // Get bounty parameter
    let bounty = parseInt(req.query.bounty) || undefined
    if (!bounty) {
        return res.status(422).json({ error: "Bounty ID is required" });
    } else {
        let count = await UBounty.count({ where: { id: bounty } })
        if (count == 0) {
            return res.status(422).json({ error: `Bounty ${bounty} doesn't exist` });
        }
    }
    // Access the provided 'page' and 'limit' query parameters
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
      res.status(422).json({ error: "Page cannot be less than 1" });
      return;
    }
    let limit = parseInt(req.query.limit) || 1000; 
    let offset = 0 + (page - 1) * limit
    // Get submissions for given uBounty
    let result = await Submission.findAndCountAll({
      offset: offset,
      limit: limit,
      where: {
        ubounty_id: {[Op.eq]: bounty}
      },
      order: [
          ['createdAt', 'DESC']
      ]
    })
    let ret = []
    for (let rObj of result.rows) {
      rObj = rObj.toJSON()
      rObj.status = etherClient.getSubmissionStatus(rObj.ubounty_id, rObj.submission_id)
      ret.push(rObj)
    }
    return res.status(200).json({
        count: result.count,
        items: ret
    })
  } catch(err) {
    res.status(500).json({ error: "Unable to retrieve submissions" });
    return next(err)
  }
}

// list?bounty=1&page=1&limit=10
module.exports.getSubmissionsForBountyCreator = async (req, res, next) => {
  try {
    // Get creator parameter
    let creator = req.query.creator
    try {
      creator = utils.getAddress(creator)
    } catch (e) {
      return res.status(422).json({ error: "Invalid creator address" });
    }
    // Access the provided 'page' and 'limit' query parameters
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
      res.status(422).json({ error: "Page cannot be less than 1" });
      return;
    }
    let limit = parseInt(req.query.limit) || 1000; 
    let offset = 0 + (page - 1) * limit
    // Get submissions that are from bounties created by "creator"
    let result = await Submission.findAndCountAll({
      offset: offset,
      limit: limit,
      where: {
        '$ubounty.creator$': {[Op.eq]:creator}
      },
      order: [
          ['createdAt', 'DESC']
      ],
      include: { model: UBounty, as: 'ubounty' }
    })
    let ret = []
    for (let rObj of result.rows) {
      rObj = rObj.toJSON()
      rObj.status = etherClient.getSubmissionStatus(rObj.ubounty_id, rObj.submission_id)
      ret.push(rObj)
    }
    return res.status(200).json(
      {
        count: result.count,
        items: ret
      }
    )
  } catch(err) {
    res.status(500).json({ error: "Unable to retrieve submissions" });
    return next(err)
  }
}

module.exports.getSubmissionsForBountyHunter = async (req, res, next) => {
  try {
    // Get hunter parameter
    let hunter = req.query.hunter
    try {
      hunter = utils.getAddress(hunter)
    } catch (e) {
      return res.status(422).json({ error: "Invalid hunter address" });
    }
    // Access the provided 'page' and 'limit' query parameters
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
      res.status(422).json({ error: "Page cannot be less than 1" });
      return;
    }
    let limit = parseInt(req.query.limit) || 1000; 
    let offset = 0 + (page - 1) * limit
    // Get submissions that are from bounties created by "creator"
    let result = await Submission.findAndCountAll({
      offset: offset,
      limit: limit,
      where: {
        creator: {[Op.eq]:hunter}
      },
      order: [
          ['createdAt', 'DESC']
      ],
      include: { model: UBounty, as: 'ubounty' }
    })
    let ret = []
    for (let rObj of result.rows) {
      rObj = rObj.toJSON()
      rObj.status = etherClient.getSubmissionStatus(rObj.ubounty_id, rObj.submission_id)
      ret.push(rObj)
    }
    return res.status(200).json(
      {
        count: result.count,
        items: ret
      }
    )
  } catch(err) {
    res.status(500).json({ error: "Unable to retrieve submissions" });
    return next(err)
  }
}

// POST new submission
// Sample body
/*
{
  "creator": "0x...",
  "data": "Hello my submission",
  "ubounty_id": 1
}
*/


module.exports.createSubmission = async (req, res, next) => {
   try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { creator, submissionData, ubounty_id } = req.body
      // Hash data for on-chain verification
      const hash = crypto.createHash("sha256").update(creator).update(submissionData).update(ubounty_id.toString()).digest("hex")

      let count = await UBounty.count({ where: { id: ubounty_id } })
      if (count == 0) {
          return res.status(422).json({ error: `Bounty ${bounty} doesn't exist` });
      }

      let submission = await SubmissionStaged.create({
        creator: creator,
        submission_data: submissionData,
        ubounty_id: ubounty_id,
        hash: hash
      })
      return res.json(submission)
   } catch(err) {
    res.status(500).send({
        message: "Failed to create submission"
    })
    return next(err)
   }
}

module.exports.validate = (method) => {
  switch (method) {
    case 'createSubmission': {
     return [ 
        check('creator', 'invalid creator address').exists().isString().custom(
          value => {
            try {
                utils.getAddress(value);
            } catch (e) { return false; }
            return true;
          }
        ),
        check('submissionData', "Data must be between 50 and 1000 characters").exists().isString().isLength({
          min: 50,
          max: 1000
        }),
        check('ubounty_id', "ubounty_id must be a number").exists().isNumeric()
       ]   
    }
  }
}
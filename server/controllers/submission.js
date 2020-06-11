const { utils } = require('ethers')
const { check, validationResult } = require('express-validator');
const { etherClient } = require("../utils/ether_client")
const models  = require('../models');
const crypto = require('crypto');

// list?bounty=1&page=1&limit=10
module.exports.getSubmissions = async (req, res, next) => {
  try {
    // Get bounty parameter
    let bounty = parseInt(req.query.bounty) || undefined
    if (!bounty) {
        return res.status(422).json({ error: "Bounty ID is required" });
    } else {
        let count = await model.UBounty.count({ where: { id: bounty } })
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
    // Get uBounties
    let result = await models.Submission.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [
          ['createdAt', 'DESC']
      ]
    })
    let resultJson = result.toJSON()
    Object.keys(resultJson).forEach(key => {
      resultJson.status = etherClient.getSubmissionStatus(resultJson.ubounty_id, resultJson.submission_id)
    });
    return res.status(200).json({
        status: true,
        innerData: result
    })
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

      const { creator, data, ubounty_id } = req.body
      // Hash data for on-chain verification
      const hash = crypto.createHash("sha256").update(creator).update(data).update(ubounty_id).digest("hex")

      let count = await model.UBounty.count({ where: { id: ubounty_id } })
      if (count == 0) {
          return res.status(422).json({ error: `Bounty ${bounty} doesn't exist` });
      }

      let submission = await models.SubmissionStaged.create({
        creator: creator,
        submission_data: data,
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
        check('data', "Data must be between 50 and 1000 characters").exists().isString().isLength({
          min: 50,
          max: 1000
        }),
        check('ubounty_id', "ubounty_id must be a number").exists().isNumeric()
       ]   
    }
  }
}
const { utils } = require('ethers')
const { check, validationResult } = require('express-validator');
const models  = require('../models');
const crypto = require('crypto');

// POST new revision
// Sample body
/*
{
  "creator": "0x...",
  "data": "Hello my revision",
  "ubounty_id": 1,
  "submission_id": 1,
}
*/


module.exports.createRevision = async (req, res, next) => {
   try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { creator, data, ubounty_id, submission_id } = req.body
      // Hash data for on-chain verification
      const toHash = JSON.stringify({creator:creator, data: data, ubounty_id: ubounty_id, submission_id: submission_id})
      const hash = crypto.createHash("sha256").update(toHash).digest("hex")

      let count = await model.UBounty.count({ where: { id: ubounty_id } })
      if (count == 0) {
          return res.status(422).json({ error: `Bounty ${ubounty_id} doesn't exist` });
      }
      count = await model.Submission.count({ where: { submission_id: submission_id } })
      if (count == 0) {
          return res.status(422).json({ error: `Submission ${submission_id} doesn't exist` });
      }

      let revision = await models.RevisionStaged.create({
        creator: creator,
        submission_data: data,
        ubounty_id: ubounty_id,
        submission_id: submission_id,
        hash: hash
      })
      return res.json(bounty)
   } catch(err) {
    res.status(500).send({
        message: "Failed to create revision"
    })
    return next(err)
   }
}

module.exports.validate = (method) => {
  switch (method) {
    case 'createRevision': {
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
        check('ubounty_id', "ubounty_id must be a number").exists().isNumeric(),
        check('submission_id', "submission_id must be a number").exists().isNumeric()
       ]   
    }
  }
}
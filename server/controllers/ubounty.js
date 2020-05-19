const { utils } = require('ethers')
const { check, validationResult } = require('express-validator');
const models  = require('../models');
const crypto = require('crypto');

// POST new bounty
// Sample body
/*
{
  "creator": "0x...",
  "title": "Hello my bounty",
  "description": "Hello my bounty",
  "hunter": "0x...", // Optional
  "contactName": "Jeff",
  "contactEmail": "jeff@gmail.com"  
}
*/

module.exports.createUBounty = (req, res, next) => {
   try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const { creator, title, description, hunter, contactName, contactEmail } = req.body
      // Hash data for on-chain verification
      const toHash = JSON.stringify({creator:creator, title: title, description: description})
      const hash = crypto.createHash("sha256").update(toHash).digest("hex")

      models.UBountyStaged.create({
        creator: creator,
        title: title,
        description: description,
        hunter: hunter == null || hunter.length < 1 ? null : hunter,
        contactName: contactName,
        contactEmail: contactEmail,
        hash: hash
      }).then(bounty => {
          res.json(bounty)
      }).catch(err => {
          res.status(500).send({
              message: "Failed to create uBounty"
          })
      })
   } catch(err) {
     return next(err)
   }
}

module.exports.validate = (method) => {
  switch (method) {
    case 'createUBounty': {
     return [ 
        check('creator', 'invalid creator address').exists().isString().custom(
          value => {
            try {
                utils.getAddress(value);
            } catch (e) { return false; }
            return true;
          }
        ),
        check('title', 'Title must be between 10 and 50 characters').exists().isString().isLength({
          min: 10,
          max: 50
        }),
        check('description', "Description must be between 50 and 500 characters").exists().isString().isLength({
          min: 50,
          max: 500
        }),
        check('hunter', "Hunter address is invalid").custom(
          value => {
            if (value == null || value == "") {
                return true
            } else if (typeof value != 'string') {
                return false
            }
            try {
                utils.getAddress(value);
            } catch (e) { return false; }
            return true;            
          }
        ),
        check('contactName', 'Contact name must be between 2 and 25 characters').exists().isString().isLength({
          min: 2,
          max: 25
        }),
        check('contactEmail', "Invalid contact email").exists().isEmail()
       ]   
    }
  }
}
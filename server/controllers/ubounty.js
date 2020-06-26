const { utils } = require('ethers')
const { check, validationResult } = require('express-validator');
const { UBounty, UBountyStaged, Op, sequelize }  = require('../models');
const crypto = require('crypto');
const removeMd = require('remove-markdown');
const { etherClient } = require('../utils/ether_client')

// POST new bounty
// Sample body
/*
{
  "creator": "0x...",
  "title": "Hello my bounty",
  "description": "Hello my bounty",
  "hunter": "0x...", // Optional
  "contactName": "Jeff",
  "contactEmail": "jeff@gmail.com",
}
*/

// ubounties?page=1&limit=10
module.exports.getUBounties = async (req, res, next) => {
  try {
    // Access the provided 'page' and 'limit' query parameters
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
      return res.status(422).json({ error: "Page cannot be less than 1" });
    }
    let limit = parseInt(req.query.limit) || 1000; 
    let offset = 0 + (page - 1) * limit
    let hunter = req.query.hunter
    let hunterQuery
    try {
      hunter = utils.getAddress(hunter)
      hunterQuery = {[Op.or]: [hunter, null]}
    } catch (e) {
      hunterQuery = {[Op.eq]: null}
    }
    // Get sort type
    let orderDirection = req.query.order
    if (orderDirection == 'asc') {
      orderDirection = 'ASC'
    } else {
      orderDirection = 'DESC'
    }
    let orderClause = ['createdAt', orderDirection]
    let sortType = req.query.sort
    if (sortType == 'valueDC') {
      orderClause = [sequelize.cast(sequelize.col('bountyAmount'), 'BIGINT'), orderDirection]
    } else if (sortType == 'valueEth') {
      orderClause = [sequelize.cast(sequelize.col('weiAmount'), 'BIGINT'), orderDirection]
    } else if (sortType == 'expiry') {
      orderClause = ['deadline', orderDirection]
    }
    console.log("\n\n\n" + sortType + "\n\n\n")
    // Get uBounties
    let result = await UBounty.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [
          orderClause
      ],
      where: {
        hunter: hunterQuery
      },
      include: ['submissions']//, 'revisions']
    })
    let ret = []
    for (let rObj of result.rows) {
      let jObj = rObj.toJSON()
      for (let rSub of jObj.submissions) {
        let status = etherClient.getSubmissionStatus(rSub.ubounty_id, rSub.submission_id)  
        rSub.status = status.status
        rSub.feedback = status.feedback        
      }
      ret.push(jObj)
    }    
    return res.status(200).json(
      {
        count: result.count,
        items: ret
      }
    )
  } catch(err) {
    console.log(err)
    res.status(500).json({ error: "Unable to retrieve bounties" });
    return next(err)
  }
}

module.exports.getPersonalUbounties = async (req, res, next) => {
  try {
    // Access the provided 'page' and 'limit' query parameters
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
      return res.status(422).json({ error: "Page cannot be less than 1" });
    }
    let limit = parseInt(req.query.limit) || 1000; 
    let offset = 0 + (page - 1) * limit
    let hunter = req.query.hunter
    try {
      hunter = utils.getAddress(hunter)
    } catch (e) {
      return res.status(422).json({ error: "Invalid hunter address" });
    }
    // Get uBounties
    let result = await UBounty.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [
          ['createdAt', 'DESC']
      ],
      where: {
        hunter: {[Op.eq]: hunter}
      },
      include: ['submissions']//, 'revisions']
    })
    let ret = []
    for (let rObj of result.rows) {
      let jObj = rObj.toJSON()
      for (let rSub of jObj.submissions) {
        let status = etherClient.getSubmissionStatus(rSub.ubounty_id, rSub.submission_id)  
        rSub.status = status.status
        rSub.feedback = status.feedback        
      }
      ret.push(jObj)
    }        
    return res.status(200).json(
      {
        count: result.count,
        items: ret
      }
    )
  } catch(err) {
    console.log(err)
    res.status(500).json({ error: "Unable to retrieve bounties" });
    return next(err)
  }
}

module.exports.getCreatorUbounties = async (req, res, next) => {
  try {
    // Access the provided 'page' and 'limit' query parameters
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
      return res.status(422).json({ error: "Page cannot be less than 1" });
    }
    let limit = parseInt(req.query.limit) || 1000; 
    let offset = 0 + (page - 1) * limit
    let creator = req.query.creator
    try {
      creator = utils.getAddress(creator)
    } catch (e) {
      return res.status(422).json({ error: "Invalid creator address" });
    }
    // Get uBounties
    let result = await UBounty.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [
          ['createdAt', 'DESC']
      ],
      where: {
        creator: {[Op.eq]: creator}
      },
      include: ['submissions']//, 'revisions']
    })
    let ret = []
    for (let rObj of result.rows) {
      let jObj = rObj.toJSON()
      for (let rSub of jObj.submissions) {
        let status = etherClient.getSubmissionStatus(rSub.ubounty_id, rSub.submission_id)  
        rSub.status = status.status
        rSub.feedback = status.feedback        
      }
      ret.push(jObj)
    }        
    return res.status(200).json(
      {
        count: result.count,
        items: ret
      }
    )
  } catch(err) {
    console.log(err)
    res.status(500).json({ error: "Unable to retrieve bounties" });
    return next(err)
  }
}

module.exports.getUBounty = async (req, res, next) => {
  try {
    let id = parseInt(req.query.id)
    if (isNaN(id)) {
      return res.status(422).json({ error: "id parameter is required" });
    }
    // Get uBounties
    let result = await UBounty.findOne({
      where: {
        id: {[Op.eq]: id}
      },
      include: ['submissions']//, 'revisions']
    })
    if (result == null) {
      return res.status(404).json(
        {"error":"bounty not found"}
      )
    }
    let descriptionMeta = removeMd(result.description)
    if (descriptionMeta.length > 160) {
      descriptionMeta = descriptionMeta.substring(0, 157) + "..."
    }
    result = result.toJSON()
    result.descriptionMeta = descriptionMeta
    for (let rSub of result.submissions) {
      let status = etherClient.getSubmissionStatus(rSub.ubounty_id, rSub.submission_id)  
      rSub.status = status.status
      rSub.feedback = status.feedback        
    }
    return res.status(200).json(
      result
    )
  } catch(err) {
    console.log(err)
    res.status(500).json({ error: "Unable to retrieve bounties" });
    return next(err)
  }
}

module.exports.createUBounty = async (req, res, next) => {
   try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { creator, title, description, hunter, contactName, contactEmail, category } = req.body
      // Hash data for on-chain verification
      const hash = crypto.createHash("sha256").update(creator).update(title).update(description)
      let hashHex = hunter != undefined ? hash.update(hunter).digest("hex") : hash.digest("hex")

      let bounty = await UBountyStaged.create({
        creator: creator,
        title: title,
        description: description,
        hunter: hunter == null || hunter.length < 1 ? null : hunter,
        contactName: contactName,
        contactEmail: contactEmail,
        hash: hashHex,
        category: category
      })
      return res.json(bounty)
   } catch(err) {
    res.status(500).send({
        message: "Failed to create uBounty"
    })
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
          max: 1000
        }),
        check('category', "Invalid categoriy").exists().isString().custom(
          value => {
            switch (value) {
              case 'create':
                return true
              case 'enhance':
                return true
              case 'bug':
                return true
              case 'support':
                return true
              case 'prototype':
                return true
              case 'other':
                return true
              default:
                return false
            }
          }
        ),
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
          max: 50
        }),
        check('contactEmail', "Invalid contact email").exists().isEmail()
       ]   
    }
  }
}
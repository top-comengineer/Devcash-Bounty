"use strict"

var Sequelize = require('sequelize');

// DB Models
const models = require("../models")

// Verify & Release bounty data
// @param uBounties - on-chain bounty array
module.exports.verifyAndReleaseBounties = async function (uBounties) {
    let hashes = []
    let hashIdMap = {}
    // Get uBounties from blockchain
    uBounties.forEach(async uBounty => {
      hashes.push(uBounty.description)
      hashIdMap[uBounty.description] = uBounty.index
    })
    // Get staged bounties from database
    let stagedBounties = await models.UBounty.findAll({
      where: {
        hash: { [Sequelize.Op.in]: hashes }
      }          
    })
    // Move from staged to prod table
    console.log(`Updating ${stagedBounties.length} bounties`)
    stagedBounties.forEach(async stagedBounty => {
      // Start a transaction
      const t = await sequelize.transaction();
      console.log(`moving staged bounty ${stagedBounty.id} to release table`)
      try {
        // Create bounty if doesn't exist
        let uBountyExists = await models.UBounty.count({where: {hash: stagedBounty.hash}}) > 0
        if (uBountyExists) {
          // Delete
          await models.UBountyStaged.destroy({
            where: {
              hash: stagedBounty.hash
            }
          }, { transaction: t })
        } else {
          // Insert
          await models.UBounty.create({
            id: hashIdMap[stagedBounty.hash],
            creator: stagedBounty.creator,
            hunter: stagedBounty.hunter,
            title: stagedBounty.title,
            description: stagedBounty.description,
            contactName: stagedBounty.contactName,
            contactEmail: stagedBounty.contactEmail,
            hash: stagedBounty.hash           
          }, { transaction: t })
          // Delete
          let destroyed = await models.UBountyStaged.destroy({
            where: {
              hash: stagedBounty.hash
            }
          }, { transaction: t }) > 1
          if (!destroyed) {
            throw new Error(`Failed to destroy uBounty ${stagedBounty.hash}`)
          }
        }
      } catch (error) {
        console.log(`Encountered error updating bounties ${error}`)
        t.tollback()
      }
    })
}

// Verify & Release submission data
// @param submissiones - on-chain submission array
module.exports.verifyAndReleaseSubmissions = async function (submissions) {
    let hashes = []
    let hashIdMap = {}
    // Get uBounties from blockchain
    submissions.forEach(async submission => {
      // submissionString holds the hash
      hashes.push(submission.submissionString)
      hashIdMap[submission.submissionString] = submission.index
    })
    // Get staged submissions from database
    let stagedSubmissions = await models.SubmissionStaged.findAll({
      where: {
        hash: { [Sequelize.Op.in]: hashes }
      }          
    })
    // Move from staged to prod table
    console.log(`Updating ${stagedSubmissions.length} submissions`)
    stagedSubmissions.forEach(async stagedSubmission => {
      // Start a transaction
      const t = await sequelize.transaction();
      console.log(`moving staged submission ${stagedSubmission.id} to release table`)
      try {
        // Create bounty if doesn't exist
        let subExists = await models.Submission.count({where: {hash: stagedSubmission.hash}}) > 0
        if (subExists) {
          // Delete
          await models.SubmissionStaged.destroy({
            where: {
              hash: stagedSubmission.hash
            }
          }, { transaction: t })
        } else {
          // Insert
          await models.Submission.create({
            submission_id: hashIdMap[stagedSubmission.hash],
            creator: stagedSubmission.creator,
            submission_data: stagedSubmission.submission_data,
            approved: stagedSubmission.approved,
            ubounty_id: stagedSubmission.ubounty_id,
            hash: stagedSubmission.hash          
          }, { transaction: t })
          // Delete
          let destroyed = await models.SubmissionStaged.destroy({
            where: {
              hash: stagedSubmission.hash
            }
          }, { transaction: t }) > 1
          if (!destroyed) {
            throw new Error(`Failed to destroy submission ${stagedSubmission.hash}`)
          }
        }
      } catch (error) {
        console.log(`Encountered error updating submissions ${error}`)
        t.tollback()
      }
    })
}

// Verify & Release revision data
// @param revisions - on-chain bounty array
module.exports.verifyAndReleaseRevisions = async function (revisions) {
    let hashes = []
    let hashIdMap = {}
    // Get uBounties from blockchain
    revisions.forEach(async revision => {
      // revisionString holds the hash
      hashes.push(revision.revisionString)
      hashIdMap[revision.revisionString] = revision.index
    })
    // Get staged revisions from database
    let stagedRevisions = await models.RevisionStaged.findAll({
      where: {
        hash: { [Sequelize.Op.in]: hashes }
      }          
    })
    // Move from staged to prod table
    console.log(`Updating ${stagedRevisions.length} revisions`)
    stagedRevisions.forEach(async stagedRevision => {
      // Start a transaction
      const t = await sequelize.transaction();
      console.log(`moving staged revision ${stagedRevision.id} to release table`)
      try {
        // Create revision if doesn't exist
        let subExists = await models.Revision.count({where: {hash: stagedRevision.hash}}) > 0
        if (subExists) {
          // Delete
          await models.RevisionStaged.destroy({
            where: {
              hash: stagedRevision.hash
            }
          }, { transaction: t })
        } else {
          // Insert
          await models.Revision.create({
            // The ID/index of this revisionm on-chain
            revision_id: hashIdMap[stagedRevision.hash],
            creator: stagedRevision.creator,
            revision_data: stagedRevision.revision_data,
            // The FK reference to the uBounty this revision belongs to
            ubounty_id: stagedRevision.ubounty_id,
            // The FK reference to the submission this revision belongs to
            submission_id: stagedRevision.submission_id,
            // The hash of this revision data
            hash: stagedRevision.hash        
          }, { transaction: t })
          // Delete
          let destroyed = await models.RevisionStaged.destroy({
            where: {
              hash: stagedRevision.hash
            }
          }, { transaction: t }) > 1
          if (!destroyed) {
            throw new Error(`Failed to destroy revision ${stagedRevision.hash}`)
          }
        }
      } catch (error) {
        console.log(`Encountered error updating revision ${error}`)
        t.tollback()
      }
    })
}
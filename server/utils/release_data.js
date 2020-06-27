"use strict"

// DB Models
const { Op, sequelize, UBountyStaged, UBounty, SubmissionStaged, Submission, RevisionStaged, Revision } = require("../models")

// Verify & Release bounty data
// @param uBounties - on-chain bounty array
module.exports.verifyAndReleaseBounties = async function (uBounties) {
    let hashes = []
    let hashIdMap = {}
    // Get uBounties from blockchain
    uBounties.forEach(async uBounty => {
      hashes.push(uBounty.description)
      hashIdMap[uBounty.description] = {index: uBounty.index, deadline: uBounty.deadline, available: uBounty.available, bc: uBounty.bc, amount: uBounty.amount, weiAmount: uBounty.weiAmount}
    })
    // Get staged bounties from database
    let stagedBounties = await UBountyStaged.findAll({
      where: {
        hash: { [Op.in]: hashes }
      }
    })
    // Move from staged to prod table
    console.log(`Updating ${stagedBounties.length} bounties`)
    stagedBounties.forEach(async stagedBounty => {
      // Start a transaction
      await sequelize.transaction(async (t) => {
        console.log(`moving staged bounty ${stagedBounty.id} to release table`)
        // Create bounty if doesn't exist
        let uBountyExists = await UBounty.count({where: {hash: stagedBounty.hash}}) > 0
        if (uBountyExists) {
          // Delete
          await UBountyStaged.destroy({
            where: {
              hash: stagedBounty.hash
            }
          }, { transaction: t })
        } else {
          // Insert
          await UBounty.create({
            id: hashIdMap[stagedBounty.hash].index,
            creator: stagedBounty.creator,
            hunter: stagedBounty.hunter,
            title: stagedBounty.title,
            description: stagedBounty.description,
            contactName: stagedBounty.contactName,
            contactEmail: stagedBounty.contactEmail,
            deadline: hashIdMap[stagedBounty.hash].deadline,
            available: Math.max(1, hashIdMap[stagedBounty.hash].available),
            bountyChest: hashIdMap[stagedBounty.hash].bc,
            bountyAmount: hashIdMap[stagedBounty.hash].amount,
            weiAmount: hashIdMap[stagedBounty.hash].weiAmount,
            hash: stagedBounty.hash,
            category: stagedBounty.category,
          }, { transaction: t })
          // Delete
          let destroyed = await stagedBounty.destroy({ transaction: t })
          if (!destroyed) {
            throw new Error(`Failed to destroy uBounty ${stagedBounty.hash}`)
          }
        }
      });
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
    let stagedSubmissions = await SubmissionStaged.findAll({
      where: {
        hash: { [Op.in]: hashes }
      }          
    })
    // Move from staged to prod table
    console.log(`Updating ${stagedSubmissions.length} submissions`)
    stagedSubmissions.forEach(async stagedSubmission => {
      // Start a transaction
      await sequelize.transaction(async (t) => {
        console.log(`moving staged submission ${stagedSubmission.id} to release table`)
        // Create bounty if doesn't exist
        let subExists = await Submission.count({where: {hash: stagedSubmission.hash}}) > 0
        if (subExists) {
          // Delete
          await SubmissionStaged.destroy({
            where: {
              hash: stagedSubmission.hash
            }
          }, { transaction: t })
        } else {
          // Insert
          await Submission.create({
            submission_id: hashIdMap[stagedSubmission.hash],
            creator: stagedSubmission.creator,
            submission_data: stagedSubmission.submission_data,
            approved: stagedSubmission.approved,
            ubounty_id: stagedSubmission.ubounty_id,
            hash: stagedSubmission.hash          
          }, { transaction: t })
          // Delete
          let destroyed = await stagedSubmission.destroy({ transaction: t })
          if (!destroyed) {
            throw new Error(`Failed to destroy submission ${stagedSubmission.hash}`)
          }
        }
      });
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
    let stagedRevisions = await RevisionStaged.findAll({
      where: {
        hash: { [Op.in]: hashes }
      }          
    })
    // Move from staged to prod table
    console.log(`Updating ${stagedRevisions.length} revisions`)
    stagedRevisions.forEach(async stagedRevision => {
      // Start a transaction
      await sequelize.transaction(async (t) => {
        console.log(`moving staged revision ${stagedRevision.id} to release table`)
        // Create revision if doesn't exist
        let subExists = await Revision.count({where: {hash: stagedRevision.hash}}) > 0
        if (subExists) {
          // Delete
          await RevisionStaged.destroy({
            where: {
              hash: stagedRevision.hash
            }
          }, { transaction: t })
        } else {
          // Insert
          await Revision.create({
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
          let destroyed = await stagedRevision.destroy({ transaction: t })
          if (!destroyed) {
            throw new Error(`Failed to destroy revision ${stagedRevision.hash}`)
          }
        }
      })
    })
}
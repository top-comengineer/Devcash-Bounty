"use strict"

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
// @param submissions - on-chain bounty array
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
            id: hashIdMap[stagedBounty.hash],
            submission_id: hashIdMap[stagedBounty.hash],
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
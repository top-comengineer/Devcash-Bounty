'use strict';
module.exports = (sequelize, DataTypes) => {
  var UBounty = sequelize.define('UBounty', {
    // The ID this uBounty has on-chain
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: false,
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hunter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // The hash of this uBounty data
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
      tableName: 'ubounties'
  });

  // Set submissions one-to-many relationship
  UBounty.associate = function(models) {
    models.UBounty.hasMany(models.Submission, {as: 'submissions', foreignKey: 'ubounty_id'})
    models.UBounty.hasMany(models.SubmissionStaged, {as: 'submissions_staging', foreignKey: 'ubounty_id'})
    models.UBounty.hasMany(models.RevisionStaged, {as: 'revisions_staging', foreignKey: 'ubounty_id'})
    models.UBounty.hasMany(models.Revision, {as: 'revisions', foreignKey: 'ubounty_id'})

  };

  return UBounty;
};
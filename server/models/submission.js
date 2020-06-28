'use strict';
module.exports = (sequelize, DataTypes) => {
  var Submission = sequelize.define('Submission', {
    // The ID/index of this submission on-chain
    submission_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        autoincrement: false,
        allowNull: false
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    submission_data: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: true
    },    
    // The FK reference to the uBounty this submission belongs to
    ubounty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id'
        }
    },
    // The hash of this submission data
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    }    
  }, {
      tableName: 'submissions',
      uniqueKeys: {
        Items_unique: {
            fields: ['submission_id', 'ubounty_id']
        }
     }      
  });

  // Set associations with bounty and revisions
  Submission.associate = function(models) {
    models.Submission.belongsTo(models.UBounty, {
      onDelete: "CASCADE",
      foreignKeyConstraint: true,
      foreignKey: 'ubounty_id',
      as: 'ubounty'
    });    
    models.Submission.hasMany(models.Revision, {as: 'revisions', foreignKey: 'submission_id'})
    models.Submission.hasMany(models.RevisionStaged, {as: 'revisions_staging', foreignKey: 'submission_id'})
  };

  return Submission;
};
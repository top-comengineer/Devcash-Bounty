'use strict';
module.exports = (sequelize, DataTypes) => {
  var Revision = sequelize.define('Revision', {
    // The ID/index of this submission on-chain
    revision_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        autoincrement: false,
        allowNull: false
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    revision_data: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // The FK reference to the uBounty this revision belongs to
    ubounty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id'
        }
    },
    // The FK reference to the submission this revision belongs to
    submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id'
        }
    },
    // The hash of this revision data
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    }    
  }, {
      tableName: 'revisions'     
  });

  // Associate 1 to many relationship with uBounties
  Revision.associate = function (models) {
    models.RevisionStaged.belongsTo(models.UBounty, {
      onDelete: "CASCADE",
      foreignKeyConstraint: true,
      foreignKey: 'ubounty_id'
    });
    models.Revision.belongsTo(models.Submission, {
      onDelete: "CASCADE",
      foreignKeyConstraint: true,
      foreignKey: 'submission_id'
    });
};

  return Revision;
};
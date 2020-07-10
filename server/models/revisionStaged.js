'use strict';
module.exports = (sequelize, DataTypes) => {
  var RevisionStaged = sequelize.define('RevisionStaged', {
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
      tableName: 'revisions_staging'     
  });

  // Associate 1 to many relationship with uBounties
  RevisionStaged.associate = function (models) {
    models.RevisionStaged.belongsTo(models.UBounty, {
      onDelete: "CASCADE",
      foreignKeyConstraint: true,
      foreignKey: 'ubounty_id'
    });
    models.RevisionStaged.belongsTo(models.Submission, {
      onDelete: "CASCADE",
      foreignKeyConstraint: true,
      foreignKey: 'submission_id'
    });
};

  return RevisionStaged;
};
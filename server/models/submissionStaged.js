'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubmissionStaged = sequelize.define('SubmissionStaged', {
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
      allowNull: false
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false
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
      tableName: 'submissions_staging'     
  });

  // Associate 1 to many relationship with uBounties
  SubmissionStaged.associate = function (models) {
    models.SubmissionStaged.belongsTo(models.UBounty, {
      onDelete: "CASCADE",
      foreignKeyConstraint: true,
      foreignKey: 'ubounty_id'
    });
  };

  return SubmissionStaged;
};
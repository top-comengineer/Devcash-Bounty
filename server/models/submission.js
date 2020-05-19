'use strict';
module.exports = (sequelize, DataTypes) => {
  var Submission = sequelize.define('Submission', {
    // The ID of this submission on-chain
    submission_id: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        autoincrement: false,
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
    title: DataTypes.STRING
  }, {
      tableName: 'submissions'
  });

  // Associate 1 to many relationship with uBounties
  Submission.associate = function (models) {
    models.Submission.belongsTo(models.UBounty, {
      onDelete: "CASCADE",
      foreignKeyConstraint: true,
      foreignKey: 'ubounty_id'
    });
  };

  return Submission;
};
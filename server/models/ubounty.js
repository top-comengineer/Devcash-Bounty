'use strict';
module.exports = (sequelize, DataTypes) => {
  var UBounty = sequelize.define('UBounty', {
    // The ID this uBounty has on-chain
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: false,
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
  };

  return UBounty;
};
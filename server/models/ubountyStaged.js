'use strict';
// For staged bounties, these do not have an ID
module.exports = (sequelize, DataTypes) => {
  var UBountyStaged = sequelize.define('UBountyStaged', {
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
      tableName: 'ubounties_staging',
      indexes: [
          {
            name: 'hash_index',
            using: 'BTREE',
            fields: [
                'hash'
            ]
          }
      ]
  });

  return UBountyStaged;
};
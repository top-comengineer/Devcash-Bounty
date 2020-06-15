'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'ubounties',
        'category',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'ubounties_staging',
        'category',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),      
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ubounties_staging', 'category'),
      queryInterface.removeColumn('ubounties', 'category'),
    ]);
  }
};

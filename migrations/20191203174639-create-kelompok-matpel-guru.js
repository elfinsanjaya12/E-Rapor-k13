'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('kelompok_matpel_gurus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MatpelId: {
        type: Sequelize.INTEGER
      },
      GuruId: {
        type: Sequelize.INTEGER
      },
      KelasId: {
        type: Sequelize.INTEGER
      },
      TahunId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('kelompok_matpel_gurus');
  }
};
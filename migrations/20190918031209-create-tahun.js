'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tahuns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tahun: {
        type: Sequelize.STRING
      },
      kepala_sekolah: {
        type: Sequelize.STRING
      },
      nip: {
        type: Sequelize.STRING
      },
      tgl_raport: {
        type: Sequelize.DATEONLY
      },
      semester: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Tahuns');
  }
};
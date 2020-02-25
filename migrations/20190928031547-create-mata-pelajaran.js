'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MataPelajarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kelompok: {
        type: Sequelize.STRING
      },
      kode: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      nilaikkm: {
        type: Sequelize.INTEGER
      },
      // TahunId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: "CASCADE",
      //   allowNull: true,
      //   references: {
      //     model: "Tahuns",
      //     key: "id"
      //   }
      // },
      // KelasId: {
      //   type: Sequelize.INTEGER,
      //   onDelete: "CASCADE",
      //   allowNull: true,
      //   references: {
      //     model: "Kelas",
      //     key: "id"
      //   }
      // },
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
    return queryInterface.dropTable('MataPelajarans');
  }
};
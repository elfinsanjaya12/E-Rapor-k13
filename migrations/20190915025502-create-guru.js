'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Gurus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nip: {
        type: Sequelize.STRING,
        unique: true
      },
      nama: {
        type: Sequelize.STRING
      },
      jk: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      pendidikan_terakhir: {
        type: Sequelize.STRING
      },
      no_telpon: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "Users",
          key: "id"
        }
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
    return queryInterface.dropTable('Gurus');
  }
};
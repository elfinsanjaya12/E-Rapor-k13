'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NilaiEktrakulikulers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      KelasId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "Kelas",
          key: "id"
        }
      },
      SiswaId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "Siswas",
          key: "id"
        }

      },
      TahunId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "Tahuns",
          key: "id"
        }
      },
      EkstraId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "ekstrakulikullers",
          key: "id"
        }
      },
      nilai: {
        type: Sequelize.STRING
      },
      desk: {
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
    return queryInterface.dropTable('NilaiEktrakulikulers');
  }
};
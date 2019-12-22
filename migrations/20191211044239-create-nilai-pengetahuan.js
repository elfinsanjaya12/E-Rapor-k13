'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NilaiPengetahuans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GuruId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "Gurus",
          key: "id"
        }
      },
      MatpelId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "MataPelajarans",
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
      KelasId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "Kelas",
          key: "id"
        }
      },
      latihan: {
        type: Sequelize.INTEGER
      },
      uts: {
        type: Sequelize.INTEGER
      },
      uas: {
        type: Sequelize.INTEGER
      },
      ket: {
        type: Sequelize.STRING
      },
      nilai_akhir: {
        type: Sequelize.INTEGER
      },
      nilai: {
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
    return queryInterface.dropTable('NilaiPengetahuans');
  }
};
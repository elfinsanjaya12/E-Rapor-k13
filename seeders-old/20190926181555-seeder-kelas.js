'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Kelas', [
      {
        tingkat: "7",
        nama: "VII a",
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "8",
        nama: "VIII a",
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "9",
        nama: "IX a",
        kouta: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "X",
        nama: "Kelas X b",
        kouta: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "8",
        nama: "VIII b",
        kouta: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "9",
        nama: "IX b",
        kouta: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Kelas', null, {});

  }
};

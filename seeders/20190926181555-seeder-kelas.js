'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Kelas', [
      {
        tingkat: "X",
        nama: "Kelas X a",
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "XI",
        nama: "Kelas XI a",
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "XII",
        nama: "Kelas XII a",
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
        tingkat: "XI",
        nama: "Kelas XI b",
        kouta: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "XII",
        nama: "Kelas XII b",
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

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Kelas', [
      {
        tingkat: "1",
        nama: "Kelas 1a",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "2",
        nama: "Kelas 2a",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "3",
        nama: "Kelas 3a",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "1",
        nama: "Kelas 1b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "2",
        nama: "Kelas 1b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "3",
        nama: "Kelas 1b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Kelas', null, {});

  }
};

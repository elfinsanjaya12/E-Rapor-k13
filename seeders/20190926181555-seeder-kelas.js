'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Kelas', [
      {
        tingkat: "X",
        nama: "Kelas X a",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "XI",
        nama: "Kelas XI a",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "XII",
        nama: "Kelas XII a",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "X",
        nama: "Kelas X b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "XI",
        nama: "Kelas XI b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tingkat: "XII",
        nama: "Kelas XII b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Kelas', null, {});

  }
};

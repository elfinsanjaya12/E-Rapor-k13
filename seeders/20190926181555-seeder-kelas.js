'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Kelas', [
      {
        tingkat: "1",
        nama: "Kelas 1a"
      },
      {
        tingkat: "2",
        nama: "Kelas 2a"
      },
      {
        tingkat: "3",
        nama: "Kelas 3a"
      },
      {
        tingkat: "1",
        nama: "Kelas 1b"
      },
      {
        tingkat: "2",
        nama: "Kelas 1b"
      },
      {
        tingkat: "3",
        nama: "Kelas 1b"
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Kelas', null, {});

  }
};

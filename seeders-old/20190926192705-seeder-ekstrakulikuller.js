'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Ekstrakulikullers', [
      {
        nama: "Kepramukaan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Paskibra",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Rohani Islam",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "PMR",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Drum Band",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Bola Basket",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Ekstrakulikullers', null, {});

  }
};

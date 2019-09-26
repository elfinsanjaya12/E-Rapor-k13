'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Ekstrakulikullers', [
      {
        nama: "Tari",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "BBQ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: "Pramuka",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Ekstrakulikullers', null, {});

  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tahuns', [
      {
        tahun: "2019",
        status: "Active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tahun: "2018",
        status: "Nonactive",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tahuns', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Gurus', [
      {
        nip: "1489898989",
        nama: "Fidin",
        jk: "pria",
        status: "Active",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nip: "15312376",
        nama: "itce",
        jk: "wanita",
        status: "Nonactive",
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Gurus', null, {});
  }
};

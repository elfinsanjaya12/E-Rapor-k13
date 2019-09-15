'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Gurus', [{
      nip: "1489898989",
      nama: "elfin sanjaya",
      jk: "pria",
      status: "Active",
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Gurus', null, {});
  }
};

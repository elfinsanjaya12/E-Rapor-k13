'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('kelompok_matpel_gurus', [
      {
        MatpelId: 1,
        KelasId: 1,
        GuruId: 1,
        TahunId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('kelompok_matpel_gurus', null, {});
  }
};

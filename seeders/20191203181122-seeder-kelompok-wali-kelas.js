'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('kelompok_wali_kelas', [
      {
        GuruId: 1,
        TahunId: 1,
        KelasId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('kelompok_wali_kelas', null, {});

  }
};

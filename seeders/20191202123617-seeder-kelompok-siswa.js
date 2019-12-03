'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kelompok_kelas', [
      {
        KelasId: 1,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        KelasId: 1,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        KelasId: 1,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        KelasId: 1,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        KelasId: 2,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {

        KelasId: 2,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Kelompok_kelas', null, {});
  }
};

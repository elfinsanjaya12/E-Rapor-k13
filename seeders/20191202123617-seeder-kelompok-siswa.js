'use strict';
const uuid = require('uuid/v4'); // ES5
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kelompok_kelas', [
      {
        id: uuid(),
        KelasId: 1,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        KelasId: 1,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        KelasId: 1,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        KelasId: 1,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        KelasId: 2,
        SiswaId: 1,
        TahunId: 1,
        kouta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
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

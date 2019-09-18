'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MataPelajarans', [
      {
        kode: "IPA",
        nama: "Ilmu Pengetahun Alam",
        nilaikkm: 75,
        TahunId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kode: "IPA",
        nama: "Ilmu Pengetahun Alam",
        nilaikkm: 75,
        TahunId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MataPelajarans', null, {});

  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('NilaiPengetahuans', [{
      GuruId: 1,
      MatpelId: 1,
      SiswaId: 1,
      TahunId: 1,
      latihan: 50,
      uts: 50,
      uas: 50,
      ket: "tidak baik",
      nilai_akhir: 50,
      nilai: 'd',
      status: "N"
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('NilaiPengetahuans', null, {});

  }
};

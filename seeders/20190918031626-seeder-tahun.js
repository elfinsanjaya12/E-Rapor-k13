'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tahuns', [
      {
        tahun: "2019-2020",
        kepala_sekolah: "kepala sekolah",
        nip: '14141241241',
        tgl_raport: new Date(),
        semester: "Satu",
        status: "Active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tahun: "2018-2019",
        status: "Nonactive",
        kepala_sekolah: "kepala sekolah",
        nip: '14141241241',
        semester: "Dua",
        tgl_raport: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tahun: "2018-2019",
        status: "Nonactive",
        kepala_sekolah: "kepala sekolah",
        nip: '14141241241',
        semester: "Satu",
        tgl_raport: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tahuns', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Siswas', [{
      nis: "1234556",
      nama: 'Elfin Sanjaya',
      nisn: "123456789909",
      jk: "Pria",
      tgl_lahir: new Date(),
      tmpt_lahir: "Bandar Lampung",
      agama: "Islam",
      status: "Active",
      anak_ke: "1",
      alamat: "Lampung",
      no_telp: "082377954408",
      asal_sekolah: "SD 3 Raja Basa",
      alamat_asal_sekolah: "Lampung",
      diterima_kelas: "VII",
      tgl_diterima: new Date(),
      di_terima_semester: "Satu",
      no_ijazah: "123124",
      tahun_ijazah: "2007",
      no_skhu: "241874",
      tahun_skhu: "2007",
      ortu_ayah: "Udin",
      ortu_ibu: "Tuti",
      alamat_ortu: "Bandar Lampung",
      no_ortu: "0878786767",
      pkj_ortu_ayah: "Buruh",
      pkj_ortu_bu: "Buru",
      wali: "Meri",
      alamat_wali: "Lampung",
      no_wali: "08328274823",
      pkj_wali: "Bos",
      foto: "",
      UserId: 4
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Siswas', null, {});
  }
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nis: {
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      nisn: {
        type: Sequelize.INTEGER
      },
      jk: {
        type: Sequelize.STRING
      },
      tgl_lahir: {
        type: Sequelize.DATEONLY
      },
      tmpt_lahir: {
        type: Sequelize.STRING
      },
      agama: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      anak_ke: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      no_telp: {
        type: Sequelize.STRING
      },
      asal_sekolah: {
        type: Sequelize.STRING
      },
      alamat_asal_sekolah: {
        type: Sequelize.STRING
      },
      diterima_kelas: {
        type: Sequelize.STRING
      },
      tgl_diterima: {
        type: Sequelize.DATEONLY
      },
      di_terima_semester: {
        type: Sequelize.STRING
      },
      no_ijazah: {
        type: Sequelize.STRING
      },
      tahun_ijazah: {
        type: Sequelize.STRING
      },
      no_skhu: {
        type: Sequelize.STRING
      },
      tahun_skhu: {
        type: Sequelize.STRING
      },
      ortu_ayah: {
        type: Sequelize.STRING
      },
      ortu_ibu: {
        type: Sequelize.STRING
      },
      alamat_ortu: {
        type: Sequelize.STRING
      },
      no_ortu: {
        type: Sequelize.STRING
      },
      pkj_ortu_ayah: {
        type: Sequelize.STRING
      },
      pkj_ortu_bu: {
        type: Sequelize.STRING
      },
      wali: {
        type: Sequelize.STRING
      },
      alamat_wali: {
        type: Sequelize.STRING
      },
      no_wali: {
        type: Sequelize.STRING
      },
      pkj_wali: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: true,
        references: {
          model: "Users",
          key: "id"
        }
      },
      isHaveKelas: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Siswas');
  }
};
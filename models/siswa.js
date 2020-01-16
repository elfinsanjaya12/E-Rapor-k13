'use strict';

module.exports = (sequelize, DataTypes) => {
  const Siswa = sequelize.define('Siswa', {
    nis: DataTypes.STRING,
    nama: DataTypes.STRING,
    nisn: DataTypes.STRING,
    jk: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    tmpt_lahir: DataTypes.STRING,
    agama: DataTypes.STRING,
    status: DataTypes.STRING,
    anak_ke: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    asal_sekolah: DataTypes.STRING,
    alamat_asal_sekolah: DataTypes.STRING,
    diterima_kelas: DataTypes.STRING,
    tgl_diterima: DataTypes.DATE,
    di_terima_semester: DataTypes.STRING,
    no_ijazah: DataTypes.STRING,
    tahun_ijazah: DataTypes.STRING,
    no_skhu: DataTypes.STRING,
    tahun_skhu: DataTypes.STRING,
    ortu_ayah: DataTypes.STRING,
    ortu_ibu: DataTypes.STRING,
    alamat_ortu: DataTypes.STRING,
    no_ortu: DataTypes.STRING,
    pkj_ortu_ayah: DataTypes.STRING,
    pkj_ortu_bu: DataTypes.STRING,
    wali: DataTypes.STRING,
    alamat_wali: DataTypes.STRING,
    no_wali: DataTypes.STRING,
    pkj_wali: DataTypes.STRING,
    foto: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    isHaveKelas: DataTypes.STRING
  }, {});
  Siswa.associate = function (models) {
    // associations can be defined here
    Siswa.belongsTo(sequelize.models.User, {
      foreignKey: "UserId"
    });
    // hooks sebelum create di uppercase dlu
    Siswa.beforeCreate(siswa => {
      siswa.nis = siswa.nis.toUpperCase();
      siswa.nisn = siswa.nisn.toUpperCase();
      siswa.nama = siswa.nama.toUpperCase();
      siswa.jk = siswa.jk.toUpperCase();
      siswa.tmpt_lahir = siswa.tmpt_lahir.toUpperCase();
      siswa.agama = siswa.agama.toUpperCase();
      siswa.alamat_asal_sekolah = siswa.alamat_asal_sekolah.toUpperCase();
      siswa.alamat = siswa.alamat.toUpperCase();
      siswa.asal_sekolah = siswa.asal_sekolah.toUpperCase();
      siswa.ortu_ayah = siswa.ortu_ayah.toUpperCase();
      siswa.ortu_ibu = siswa.ortu_ibu.toUpperCase();
      siswa.alamat_ortu = siswa.alamat_ortu.toUpperCase();
      siswa.pkj_ortu_ayah = siswa.pkj_ortu_ayah.toUpperCase();
      siswa.pkj_ortu_bu = siswa.pkj_ortu_bu.toUpperCase();
      return siswa
    })

  };

  return Siswa;
};
'use strict';
const bcrypt = require("bcryptjs");

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
    UserId: DataTypes.INTEGER
  }, {});
  Siswa.associate = function (models) {
    // associations can be defined here
    // associations can be defined here
    Siswa.belongsTo(sequelize.models.User, {
      foreignKey: "UserId"
    });
  };

  Siswa.afterCreate(async siswa => {
    const { nis } = siswa

    const password = bcrypt.hashSync(nis, 10);
    try {
      const user = await sequelize.models.User.create({
        username: nis,
        role: 'siswa',
        password: password,
        status: 'Nonactive',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const siswa = await sequelize.models.Siswa.update({
        UserId: user.id,
      }, {
        where: {
          nis: nis
        }
      })
      return siswa

    } catch (e) {
      throw new Error(e)
    }
  })

  return Siswa;
};
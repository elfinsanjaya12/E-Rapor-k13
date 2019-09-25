'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tahun = sequelize.define('Tahun', {
    tahun: DataTypes.STRING,
    kepala_sekolah: DataTypes.STRING,
    nip: DataTypes.STRING,
    tgl_raport: DataTypes.DATE,
    semester: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Tahun.associate = function (models) {
    // associations can be defined here
  };
  return Tahun;
};
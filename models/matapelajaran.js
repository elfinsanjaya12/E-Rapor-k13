'use strict';
module.exports = (sequelize, DataTypes) => {
  const MataPelajaran = sequelize.define('MataPelajaran', {
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    nilai - kkm: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER
  }, {});
  MataPelajaran.associate = function(models) {
    // associations can be defined here
  };
  return MataPelajaran;
};
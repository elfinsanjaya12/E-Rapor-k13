'use strict';
module.exports = (sequelize, DataTypes) => {
  const MataPelajaran = sequelize.define('MataPelajaran', {
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    nilaikkm: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER
  }, {});
  MataPelajaran.associate = function (models) {
    // associations can be defined here
    MataPelajaran.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });
  };
  return MataPelajaran;
};
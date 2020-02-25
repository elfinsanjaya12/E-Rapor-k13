'use strict';
module.exports = (sequelize, DataTypes) => {
  const kelompok_kelas = sequelize.define('kelompok_kelas', {
    KelasId: DataTypes.INTEGER,
    SiswaId: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER,
  }, {});
  kelompok_kelas.associate = function (models) {
    // associations can be defined here

    kelompok_kelas.belongsTo(sequelize.models.Kelas, {
      foreignKey: "KelasId"
    });

    kelompok_kelas.belongsTo(sequelize.models.Siswa, {
      foreignKey: "SiswaId"
    });

    kelompok_kelas.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });
  };
  return kelompok_kelas;
};
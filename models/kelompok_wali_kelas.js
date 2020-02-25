'use strict';
module.exports = (sequelize, DataTypes) => {
  const kelompok_wali_kelas = sequelize.define('kelompok_wali_kelas', {
    GuruId: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER,
    KelasId: DataTypes.INTEGER
  }, {});
  kelompok_wali_kelas.associate = function (models) {
    // associations can be defined here
    kelompok_wali_kelas.belongsTo(sequelize.models.Guru, {
      foreignKey: "GuruId"
    });

    kelompok_wali_kelas.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });
    kelompok_wali_kelas.belongsTo(sequelize.models.Kelas, {
      foreignKey: "KelasId"
    });
  };
  return kelompok_wali_kelas;
};
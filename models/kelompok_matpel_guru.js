'use strict';
module.exports = (sequelize, DataTypes) => {
  const kelompok_matpel_guru = sequelize.define('kelompok_matpel_guru', {
    MatpelId: DataTypes.INTEGER,
    GuruId: DataTypes.INTEGER,
    KelasId: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER
  }, {});
  kelompok_matpel_guru.associate = function (models) {
    // associations can be defined here
    /** relasi matapelajaran */
    kelompok_matpel_guru.belongsTo(sequelize.models.MataPelajaran, {
      foreignKey: "MatpelId"
    });
    /** relasi guru */
    kelompok_matpel_guru.belongsTo(sequelize.models.Guru, {
      foreignKey: "GuruId"
    });
    /** relasi kelas */
    kelompok_matpel_guru.belongsTo(sequelize.models.Kelas, {
      foreignKey: "KelasId"
    });
    /** relasi tahun */
    kelompok_matpel_guru.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });
  };
  return kelompok_matpel_guru;
};
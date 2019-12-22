'use strict';
module.exports = (sequelize, DataTypes) => {
  const NilaiPengetahuan = sequelize.define('NilaiPengetahuan', {
    GuruId: DataTypes.INTEGER,
    MatpelId: DataTypes.INTEGER,
    SiswaId: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER,
    KelasId: DataTypes.INTEGER,
    latihan: DataTypes.INTEGER,
    uts: DataTypes.INTEGER,
    uas: DataTypes.INTEGER,
    ket: DataTypes.STRING,
    nilai_akhir: DataTypes.INTEGER,
    nilai: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  NilaiPengetahuan.associate = function (models) {
    // associations can be defined here
    NilaiPengetahuan.belongsTo(sequelize.models.Guru, {
      foreignKey: "GuruId"
    });

    NilaiPengetahuan.belongsTo(sequelize.models.Siswa, {
      foreignKey: "SiswaId"
    });

    NilaiPengetahuan.belongsTo(sequelize.models.MataPelajaran, {
      foreignKey: "MatpelId"
    });

    NilaiPengetahuan.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });

    NilaiPengetahuan.belongsTo(sequelize.models.Kelas, {
      foreignKey: "KelasId"
    });
  };
  return NilaiPengetahuan;
};
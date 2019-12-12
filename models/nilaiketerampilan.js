'use strict';
module.exports = (sequelize, DataTypes) => {
  const NilaiKeterampilan = sequelize.define('NilaiKeterampilan', {
    GuruId: DataTypes.INTEGER,
    MatpelId: DataTypes.INTEGER,
    SiswaId: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER,
    latihan: DataTypes.INTEGER,
    uts: DataTypes.INTEGER,
    uas: DataTypes.INTEGER,
    ket: DataTypes.STRING,
    nilai_akhir: DataTypes.INTEGER,
    nilai: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  NilaiKeterampilan.associate = function (models) {
    // associations can be defined here
    NilaiKeterampilan.belongsTo(sequelize.models.Guru, {
      foreignKey: "GuruId"
    });

    NilaiKeterampilan.belongsTo(sequelize.models.Siswa, {
      foreignKey: "SiswaId"
    });

    NilaiKeterampilan.belongsTo(sequelize.models.MataPelajaran, {
      foreignKey: "MatpelId"
    });

    NilaiKeterampilan.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });
  };
  return NilaiKeterampilan;
};
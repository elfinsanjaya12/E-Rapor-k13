'use strict';
module.exports = (sequelize, DataTypes) => {
  const NilaiSikap = sequelize.define('NilaiSikap', {
    SiswaId: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER,
    KelasId: DataTypes.INTEGER,
    nilai_sosial: DataTypes.STRING,
    ket_sosial: DataTypes.STRING,
    nilai_spiritual: DataTypes.STRING,
    ket_spiritual: DataTypes.STRING
  }, {});
  NilaiSikap.associate = function (models) {
    // associations can be defined here
    NilaiSikap.belongsTo(sequelize.models.Kelas, {
      foreignKey: "KelasId"
    });

    NilaiSikap.belongsTo(sequelize.models.Siswa, {
      foreignKey: "SiswaId"
    });

    NilaiSikap.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });
  };
  return NilaiSikap;
};
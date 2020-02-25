'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prestasi = sequelize.define('Prestasi', {
    SiswaId: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER,
    KelasId: DataTypes.INTEGER,
    jenis: DataTypes.STRING,
    ket: DataTypes.STRING
  }, {});
  Prestasi.associate = function (models) {
    // associations can be defined here
    Prestasi.belongsTo(sequelize.models.Siswa, {
      foreignKey: "SiswaId"
    });

    Prestasi.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });

    Prestasi.belongsTo(sequelize.models.Kelas, {
      foreignKey: "KelasId"
    });
  };
  return Prestasi;
};

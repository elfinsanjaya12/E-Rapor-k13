'use strict';
module.exports = (sequelize, DataTypes) => {
  const NilaiAbsen = sequelize.define('NilaiAbsen', {
    TahunId: DataTypes.INTEGER,
    SiswaId: DataTypes.INTEGER,
    KelasId: DataTypes.INTEGER,
    s: DataTypes.INTEGER,
    a: DataTypes.INTEGER,
    i: DataTypes.INTEGER
  }, {});
  NilaiAbsen.associate = function (models) {
    // associations can be defined here
    NilaiAbsen.belongsTo(sequelize.models.Kelas, {
      foreignKey: "KelasId"
    });

    NilaiAbsen.belongsTo(sequelize.models.Siswa, {
      foreignKey: "SiswaId"
    });

    NilaiAbsen.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });
  };
  return NilaiAbsen;
};
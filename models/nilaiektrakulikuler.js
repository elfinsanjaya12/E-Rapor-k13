'use strict';
module.exports = (sequelize, DataTypes) => {
  const NilaiEktrakulikuler = sequelize.define('NilaiEktrakulikuler', {
    TahunId: DataTypes.INTEGER,
    SiswaId: DataTypes.INTEGER,
    EkstraId: DataTypes.INTEGER,
    KelasId: DataTypes.INTEGER,
    nilai: DataTypes.STRING,
    desk: DataTypes.STRING
  }, {});
  NilaiEktrakulikuler.associate = function (models) {
    // associations can be defined here
    NilaiEktrakulikuler.belongsTo(sequelize.models.Kelas, {
      foreignKey: "KelasId"
    });

    NilaiEktrakulikuler.belongsTo(sequelize.models.Siswa, {
      foreignKey: "SiswaId"
    });

    NilaiEktrakulikuler.belongsTo(sequelize.models.Tahun, {
      foreignKey: "TahunId"
    });

    NilaiEktrakulikuler.belongsTo(sequelize.models.Ekstrakulikuller, {
      foreignKey: "EkstraId"
    });
  };
  return NilaiEktrakulikuler;
};
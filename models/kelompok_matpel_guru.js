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
  };
  return kelompok_matpel_guru;
};
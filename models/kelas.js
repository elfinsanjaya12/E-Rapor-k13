'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kelas = sequelize.define('Kelas', {
    tingkat: DataTypes.STRING,
    nama: DataTypes.STRING,
    kouta: DataTypes.INTEGER
  }, {});
  Kelas.associate = function (models) {
    // associations can be defined here
  };
  return Kelas;
};
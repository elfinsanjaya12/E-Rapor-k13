'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rangking = sequelize.define('Rangking', {
    SiswaId: DataTypes.INTEGER,
    TahunId: DataTypes.INTEGER,
    GuruId: DataTypes.INTEGER,
    totalNilai: DataTypes.INTEGER
  }, {});
  Rangking.associate = function(models) {
    // associations can be defined here
  };
  return Rangking;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tahun = sequelize.define('Tahun', {
    tahun: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Tahun.associate = function(models) {
    // associations can be defined here
  };
  return Tahun;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ekstrakulikuller = sequelize.define('Ekstrakulikuller', {
    nama: DataTypes.STRING
  }, {});
  Ekstrakulikuller.associate = function(models) {
    // associations can be defined here
  };
  return Ekstrakulikuller;
};
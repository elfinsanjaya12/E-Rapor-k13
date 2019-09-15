'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guru = sequelize.define('Guru', {
    nip: DataTypes.STRING,
    nama: DataTypes.STRING,
    jk: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Guru.associate = function (models) {
    // associations can be defined here
    Guru.belongsTo(sequelize.models.User, {
      foreignKey: "UserId"
    });
  };
  return Guru;
};
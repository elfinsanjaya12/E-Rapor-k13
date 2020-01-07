'use strict';
// const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Guru = sequelize.define('Guru', {
    nip: DataTypes.STRING,
    nama: DataTypes.STRING,
    jk: DataTypes.STRING,
    status: DataTypes.STRING,
    pendidikan_terakhir: DataTypes.STRING,
    no_telpon: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Guru.associate = function (models) {
    // associations can be defined here
    Guru.belongsTo(sequelize.models.User, {
      foreignKey: "UserId"
    });
  };

  // hooks
  // Guru.afterCreate(async guru => {
  //   const { nip } = guru
  //   const password = bcrypt.hashSync(nip, 10);
  //   try {
  //     const user = await sequelize.models.User.create({
  //       username: nip,
  //       role: 'guru',
  //       password: password,
  //       status: 'Nonactive',
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     })

  //     const guru = await sequelize.models.Guru.update({
  //       UserId: user.id,
  //     }, {
  //       where: {
  //         nip: nip
  //       }
  //     })
  //     return guru

  //   } catch (e) {
  //     throw new Error(e)
  //   }
  // })

  return Guru;
};
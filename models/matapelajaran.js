'use strict';
module.exports = (sequelize, DataTypes) => {
  const MataPelajaran = sequelize.define('MataPelajaran', {
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    nilaikkm: DataTypes.INTEGER,
    // KelasId: DataTypes.INTEGER
  }, {});
  MataPelajaran.associate = function (models) {
    // associations can be defined here
    // MataPelajaran.belongsTo(sequelize.models.Kelas, {
    //   foreignKey: "KelasId"
    // });
  };

  // hooks
  // MataPelajaran.afterCreate(async matpel => {
  //   const { tahun } = matpel
  //   try {
  //     const tahun = await sequelize.models.Tahun.create({
  //       tahun: tahun,
  //       status: "Active"
  //     })

  //     const mata_pelajaran = await sequelize.models.MataPelajaran.update({
  //       TahunId: tahun.id,
  //     }, {
  //       where: {
  //         id: 
  //       }
  //     })
  //     return guru

  //   } catch (e) {
  //     throw new Error(e)
  //   }
  // })

  return MataPelajaran;
};
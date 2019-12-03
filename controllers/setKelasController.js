const { Kelas, kelompok_kelas, Tahun, Siswa } = require("../models");
const Op = require("sequelize").Op;

exports.viewSetKelas = async (req, res) => {
  try {
    const userLogin = req.session.user

    const kelas = await Kelas.findAll({
      order: [
        ['nama', 'ASC']
      ]
    })

    const k_kelas = await kelompok_kelas.findAll({
      include: [
        { model: Kelas },
        {
          model: Tahun,
          where: {
            status: { [Op.eq]: "Active" }
          }
        },
        { model: Siswa },
      ]
    })

    res.render('admin/set_kelas/view_set_kelas', {
      title: "E-Raport | Set Kelas",
      user: userLogin,
      k_kelas: k_kelas,
      kelas: kelas
    })

  } catch (err) {
    throw err
  }
}

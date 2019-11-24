const { Kelas } = require("../models");

exports.viewSetKelas = async (req, res) => {
  try {
    const userLogin = req.session.user

    const kelas = await Kelas.findAll()

    res.render('admin/set_kelas/view_set_kelas', {
      title: "E-Raport | Set Kelas",
      user: userLogin,
      kelas: kelas,
    })

  } catch (err) {
    throw err
  }
}

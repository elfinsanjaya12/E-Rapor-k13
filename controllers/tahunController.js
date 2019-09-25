const { Tahun } = require("../models");
const Op = require("sequelize").Op;


exports.viewTahun = async (req, res) => {
  try {
    const userLogin = req.session.user
    const tahun = await Tahun.findAll()

    res.render('admin/tahun/view_tahun', {
      user: userLogin,
      tahun: tahun
    })
  } catch (err) {
    throw err
  }
}

const { MataPelajaran, Tahun } = require("../models");
const Op = require("sequelize").Op;

const include = {
  include: [
    { model: Tahun }
  ]
}

exports.viewMatPel = async (req, res) => {
  try {
    const userLogin = req.session.user

    const matpel = await MataPelajaran.findAll({
      ...include
    })

    res.render('admin/mata_pelajaran/view_mata_pelajaran', {
      user: userLogin,
      matpel: matpel,
    })
  } catch (err) {
    throw err
  }
}


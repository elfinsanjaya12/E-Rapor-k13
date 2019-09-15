const { Guru, User } = require("../models");
const Op = require("sequelize").Op;
const include = {
  include: [{ model: User }]
}

exports.viewGuru = async (req, res) => {
  try {
    const userLogin = req.session.user
    const guru = await Guru.findAll({ ...include })

    res.render("admin/guru/view", {
      user: userLogin,
      guru: guru
    })
  } catch (err) {
    throw err
  }
}

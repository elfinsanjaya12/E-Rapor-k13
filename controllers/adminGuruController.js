const { Guru, kelompok_matpel_guru, Tahun, Kelas, MataPelajaran } = require("../models");
const Op = require("sequelize").Op;

const include = {
  include: [
    { model: Tahun },
    { model: Kelas },
    { model: MataPelajaran }
  ]
}

exports.viewHome = (req, res) => {
  const userLogin = req.session.user
  if (userLogin.role === "guru") {
    res.render("guru/home/view_home", {
      title: "E-Raport | Guru",
      user: userLogin
    })
  } else {
    req.session.destroy();
    res.redirect("signin");
  }
}

exports.viewRiwayat = async (req, res) => {
  const userLogin = req.session.user
  Guru.findOne({
    where: { UserId: { [Op.eq]: userLogin.id } }
  }).then((guru) => {
    kelompok_matpel_guru.findAll({
      where: { GuruId: { [Op.eq]: guru.id } },
      ...include
    }).then((riwayat) => {
      console.log(riwayat)
      res.render("guru/riwayat/view_riwayat", {
        title: "E-Raport | Guru",
        user: userLogin,
        riwayat
      })
    })
  })
}
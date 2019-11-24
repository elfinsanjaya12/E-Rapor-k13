const { Guru, User } = require("../models");
const Op = require("sequelize").Op;

exports.viewHome = async (req, res) => {
  try {
    res.render("guru/home/view_home", {
      title: "E-Raport | Guru",
    })
  } catch (err) {
    throw err
  }
}

exports.viewMatpelDiampuh = async (req, res) => {
  try {
    res.render("guru/matpel_diampuh/view_matpel_diampuh", {
      title: "E-Raport | Matpel Diampuh",
    })
  } catch (err) {
    throw err
  }
}

exports.viewRiwayatMengajar = async (req, res) => {
  try {
    res.render("guru/riwayat_mengajar/view_riwayat_mengajar", {
      title: "E-Raport | Matpel Diampuh",
    })
  } catch (err) {
    throw err
  }
}

exports.viewAbsen = async (req, res) => {
  try {
    res.render("guru/absen/view_absen", {
      title: "E-Raport | Absen",
    })
  } catch (err) {
    throw err
  }
}

exports.viewRaport = async (req, res) => {
  try {
    res.render("guru/raport/view_raport", {
      title: "E-Raport | Absen",
    })
  } catch (err) {
    throw err
  }
}

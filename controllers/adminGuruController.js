const { Guru, User } = require("../models");
const Op = require("sequelize").Op;

exports.viewHome = async (req, res) => {
  const userLogin = req.session.user
  try {
    res.render("guru/home/view_home", {
      title: "E-Raport | Guru",
      user: userLogin
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

exports.viewNilaiSikap = async (req, res) => {
  try {
    res.render("guru/input_nilai_sikap/view_input_nilai_sikap", {
      title: "E-Raport | Input Nilai Sikap",
    })
  } catch (err) {
    throw err
  }
}

exports.viewNilaiEktra = async (req, res) => {
  try {
    res.render("guru/input_nilai_ektrakulikuler/view_input_nilai_ektrakulikuler", {
      title: "E-Raport | Input Nilai Ektrakulikuler",
    })
  } catch (err) {
    throw err
  }
}

exports.viewValidasiNilai = async (req, res) => {
  try {
    res.render("guru/validasi_nilai/view_validasi_nilai", {
      title: "E-Raport | Input Nilai Ektrakulikuler",
    })
  } catch (err) {
    throw err
  }
}
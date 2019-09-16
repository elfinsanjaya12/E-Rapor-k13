const { Guru, User } = require("../models");
const Op = require("sequelize").Op;
const swal = require('sweetalert2')
const include = {
  include: [{ model: User }]
}

exports.viewGuru = async (req, res) => {
  try {
    const userLogin = req.session.user
    const guru = await Guru.findAll({ ...include })

    res.render("admin/guru/view", {
      user: userLogin,
      guru: guru,
    })
  } catch (err) {
    throw err
  }
}

exports.actionCreate = async (req, res) => {
  const { nip, nama, jk } = req.body;
  await Guru.create({
    nip: nip,
    nama: nama,
    jk: jk,
    status: 'Nonactive'
  });
  res.redirect("/admin/guru");
}

exports.actionFind = async (req, res) => {
  const { id } = req.params;
  Astor.findOne({ where: { id: { [Op.eq]: id } } }).then((editGuru) => {
    res.render('/admin/guru/guru', {
      editGuru: editGuru
    });
  });
}

exports.actionUpdate = async (req, res) => {
  const { id, nip, nama, jk } = req.body

  const updateGuru = await Guru.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })

  if (updateGuru) {
    updateGuru.nip = nip
    updateGuru.nama = nama
    updateGuru.jk = jk
    await updateGuru.save()
  }
  res.redirect('/admin/guru')
}
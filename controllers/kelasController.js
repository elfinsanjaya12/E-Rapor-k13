const { Kelas } = require("../models");
const Op = require("sequelize").Op;


exports.viewKelas = async (req, res) => {
  try {
    const userLogin = req.session.user

    const kelas = await Kelas.findAll()
    res.render('admin/kelas/view_kelas', {
      title: "E-Raport | Kelas",
      user: userLogin,
      kelas: kelas,
    })

  } catch (err) {
    throw err
  }
}

exports.actionCreate = async (req, res) => {
  const { tingkat, nama } = req.body
  await Kelas.create({ tingkat, nama })
  res.redirect("/admin/kelas");
}

exports.actionUpdate = async (req, res) => {
  const { id, tingkat, nama } = req.body

  const updateKelas = await Kelas.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })

  if (updateKelas) {
    updateKelas.tingkat = tingkat
    updateKelas.nama = nama
    await updateKelas.save()
  }
  res.redirect('/admin/kelas')
}

exports.actionDetele = async (req, res) => {
  let { id } = req.params;
  const kelas = await Kelas.findOne({ where: { id: { [Op.eq]: id } } })
  kelas.destroy()
  res.redirect('/admin/kelas');
}
const { Ekstrakulikuller } = require("../models");
const Op = require("sequelize").Op;


exports.viewEkstrakulikuller = async (req, res) => {
  try {
    const userLogin = req.session.user

    const ekstra = await Ekstrakulikuller.findAll()

    res.render('admin/ekstra/view_ekstra', {
      title: "E-Raport | Ekstrakulikuller",
      user: userLogin,
      ekstra: ekstra,
    })

  } catch (err) {
    throw err
  }
}

exports.actionCreate = async (req, res) => {
  const { nama } = req.body
  await Ekstrakulikuller.create({ nama })
  res.redirect("/admin/ekstra");
}

exports.actionUpdate = async (req, res) => {
  const { id, nama } = req.body

  const updateEkstrakulikuller = await Ekstrakulikuller.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })

  if (updateEkstrakulikuller) {
    updateEkstrakulikuller.nama = nama
    await updateEkstrakulikuller.save()
  }
  res.redirect('/admin/ekstra')
}

exports.actionDetele = async (req, res) => {
  let { id } = req.params;
  const ekstra = await Ekstrakulikuller.findOne({ where: { id: { [Op.eq]: id } } })
  ekstra.destroy()
  res.redirect('/admin/ekstra');
}
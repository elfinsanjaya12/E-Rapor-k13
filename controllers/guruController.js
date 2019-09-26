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
      title: "E-Raport | Guru",
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

exports.actionDetele = (req, res) => {
  let { id } = req.params;
  console.log(id)
  Guru.findOne({ where: { id: { [Op.eq]: id } } }).then(async (guru) => {
    let UserId = guru.UserId
    const user = await User.findOne({ where: { id: { [Op.eq]: UserId } } })
    user.destroy()
    guru.destroy().then(() => {
      res.redirect('/admin/guru');
    })
  }).catch((err) => {
    console.log(err)
    res.redirect('/admin/guru');
  });
}

exports.actionUpdateStatus = async (req, res) => {
  let { id } = req.params
  let guru = await Guru.findOne({
    ...include,
    where: {
      id: { [Op.eq]: id }
    }
  })
  if (guru.User.status === "Active") {
    const user = await User.findOne({
      where: {
        id: { [Op.eq]: guru.UserId }
      }
    })
    if (user && guru) {
      user.status = "Nonactive"
      guru.status = "Nonactive"
      await user.save()
    }
    res.redirect("/admin/guru")
  } else {
    const user = await User.findOne({
      where: {
        id: { [Op.eq]: guru.UserId }
      }
    })
    if (user && guru) {
      user.status = "Active"
      guru.status = "Active"
      await user.save()

    }
    res.redirect("/admin/guru")
  }
}
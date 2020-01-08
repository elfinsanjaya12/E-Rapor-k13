const { Guru, User } = require("../models");
const Op = require("sequelize").Op;
const bcrypt = require("bcryptjs");

const include = {
  include: [{ model: User }]
}

exports.viewGuru = async (req, res) => {
  try {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    const userLogin = req.session.user

    if (userLogin.role === "admin") {
      const guru = await Guru.findAll({ ...include })
      res.render("admin/guru/view", {
        title: "E-Rapor | Guru",
        user: userLogin,
        guru: guru,
        alert: alert
      })
    } else {
      req.session.destroy()
      res.redirect('/signin');
    }
  } catch (err) {
    throw err
  }
}

exports.actionCreate = async (req, res) => {
  const { nip, nama, jk } = req.body;
  const password = bcrypt.hashSync("guru123", 10);
  try {
    const cek_guru = await Guru.findOne({ where: { nip: { [Op.eq]: nip } } })
    if (cek_guru) {
      req.flash('alertMessage', 'NIP guru sudah ada yang memakai, silahkan ganti dengan yang lain!');
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/guru');
    } else {

      User.create({
        username: nip,
        role: 'guru',
        password: password,
        status: 'Nonactive'
      }).then((user) => {
        Guru.create({
          nip: nip,
          nama: nama,
          jk: jk,
          status: 'Nonactive',
          UserId: user.id
        }).then(() => {
          req.flash('alertMessage', `Sukses Menambahkan Data Guru Baru dengan Nama : ${nama} dan NIP: ${nip}`);
          req.flash('alertStatus', 'success');
          res.redirect("/admin/guru")
        })
      }).catch((err) => {
        res.redirect("/admin/guru")
      });
    }
  } catch (error) {
    console.log(error)
  }
}

exports.actionUpdate = async (req, res) => {
  const { id, nip, nama, jk } = req.body

  try {
    const updateGuru = await Guru.findOne({
      where: {
        id: { [Op.eq]: id }
      }
    })

    const updateUser = await User.findOne({
      where: {
        id: { [Op.eq]: updateGuru.UserId }
      }
    })

    if (updateGuru) {
      updateGuru.nip = nip
      updateGuru.nama = nama
      updateGuru.jk = jk
      await updateGuru.save()
    }
    if (updateUser) {
      updateUser.username = nip
      await updateUser.save();
    }
    req.flash('alertMessage', `Sukses Mengubah Data Guru dengan Nama : ${nama} dan NIP: ${nip}`);
    req.flash('alertStatus', 'success');
    res.redirect('/admin/guru')

  } catch (error) {
    console.log(error)
  }
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
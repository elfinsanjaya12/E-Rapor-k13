const { Kelas } = require("../models");
const Op = require("sequelize").Op;


exports.viewKelas = async (req, res) => {
  try {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    const userLogin = req.session.user

    const kelas = await Kelas.findAll()
    res.render('admin/kelas/view_kelas', {
      title: "E-Rapor | Kelas",
      user: userLogin,
      kelas: kelas,
      alert: alert
    })

  } catch (err) {
    throw err
  }
}

exports.actionCreate = async (req, res) => {
  const { tingkat, nama } = req.body
  const cek_kelas = await Kelas.findOne({
    where: {
      nama: { [Op.eq]: nama }
    }
  })
  if (cek_kelas) {
    req.flash('alertMessage', `Kelas sudah terdaftar`);
    req.flash('alertStatus', 'warning');
    res.redirect("/admin/kelas");
  } else {
    await Kelas.create({ tingkat, nama })
    req.flash('alertMessage', `Sukses Menambahkan Data`);
    req.flash('alertStatus', 'success');
    res.redirect("/admin/kelas");
  }
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
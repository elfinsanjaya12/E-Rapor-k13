const { MataPelajaran, Tahun } = require("../models");
const Op = require("sequelize").Op;

const include = {
  include: [
    { model: Tahun }
  ]
}

exports.viewMatPel = async (req, res) => {
  try {
    const userLogin = req.session.user

    const matpel = await MataPelajaran.findAll({
      ...include
    })

    res.render('admin/mata_pelajaran/view_mata_pelajaran', {
      user: userLogin,
      matpel: matpel,
    })
  } catch (err) {
    throw err
  }
}

exports.actionCreate = async (req, res) => {
  const { kode, nama, nilaikkm, tahun } = req.body;

  const thn = await Tahun.create({
    tahun: tahun,
    status: "Active"
  })

  await MataPelajaran.create({
    kode: kode,
    nama: nama,
    nilaikkm: nilaikkm,
    TahunId: thn.id
  });
  res.redirect("/admin/mata-pelajaran");
}


exports.actionUpdate = async (req, res) => {
  const { id, kode, nama, nilaikkm, tahun } = req.body


  const updateMataPelajaran = await MataPelajaran.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })
  if (updateMataPelajaran) {
    updateMataPelajaran.kode = kode
    updateMataPelajaran.nama = nama
    updateMataPelajaran.nilaikkm = nilaikkm
    await updateMataPelajaran.save()
  }

  const updateTahun = await Tahun.findOne({
    where: {
      id: { [Op.eq]: updateMataPelajaran.id }
    }
  })

  if (updateTahun) {
    updateTahun.tahun = tahun
    await updateTahun.save()
  }
  res.redirect('/admin/mata-pelajaran')
}
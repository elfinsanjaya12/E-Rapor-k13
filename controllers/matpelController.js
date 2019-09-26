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
      title: "E-Raport | MatPel",
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

exports.actionDetele = (req, res) => {
  let { id } = req.params;
  MataPelajaran.findOne({ where: { id: { [Op.eq]: id } } }).then(async (matpel) => {
    let TahunId = matpel.TahunId
    const tahun = await Tahun.findOne({ where: { id: { [Op.eq]: TahunId } } })
    tahun.destroy()
    matpel.destroy().then(() => {
      res.redirect('/admin/mata-pelajaran');
    })
  }).catch((err) => {
    console.log(err)
    res.redirect('/admin/mata-pelajaran');
  });
}

exports.actionUpdateStatus = async (req, res) => {
  let { id } = req.params
  let matpel = await MataPelajaran.findOne({
    ...include,
    where: {
      id: { [Op.eq]: id }
    }
  })
  if (matpel.Tahun.status === "Active") {
    const tahun = await Tahun.findOne({
      where: {
        id: { [Op.eq]: matpel.TahunId }
      }
    })
    if (tahun) {
      tahun.status = "Nonactive"
      await tahun.save()
    }
    res.redirect("/admin/mata-pelajaran")
  } else {
    const tahun = await Tahun.findOne({
      where: {
        id: { [Op.eq]: matpel.TahunId }
      }
    })
    if (tahun) {
      tahun.status = "Active"
      await tahun.save()
    }
    res.redirect("/admin/mata-pelajaran")
  }
}
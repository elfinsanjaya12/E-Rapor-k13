const { Tahun } = require("../models");
const Op = require("sequelize").Op;


exports.viewTahun = async (req, res) => {
  try {
    const userLogin = req.session.user
    const tahun = await Tahun.findAll({
      order: [
        ['id', 'DESC'],
      ],
    })

    res.render('admin/tahun/view_tahun', {
      title: "E-Raport | Tahun",
      user: userLogin,
      tahun: tahun
    })
  } catch (err) {
    throw err
  }
}


exports.actionCreate = async (req, res) => {
  const { kepala_sekolah, nip, semester, tgl_raport, tahun } = req.body

  await Tahun.create({
    tahun: tahun,
    kepala_sekolah: kepala_sekolah,
    nip: nip,
    semester: semester,
    tgl_raport: tgl_raport,
    status: "Nonactive"
  })

  res.redirect("/admin/tahun");

}

exports.actionUpdateStatusActive = async (req, res) => {
  let { id } = req.params
  const tahun = await Tahun.findAll()

  for (var i = 0; i < tahun.length; i++) {
    tahun[i].status = "Nonactive";
    await tahun[i].save()
  }

  let updateStatus = await Tahun.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })

  if (updateStatus) {
    updateStatus.status = "Active"
    await updateStatus.save()
  }

  res.redirect("/admin/tahun")
}

exports.actionUpdate = async (req, res) => {
  const { id, kepala_sekolah, semester, nip, tgl_raport, tahun } = req.body

  const updateTahun = await Tahun.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })

  if (updateTahun) {
    updateTahun.nip = nip
    updateTahun.kepala_sekolah = kepala_sekolah
    updateTahun.semester = semester
    updateTahun.tgl_raport = tgl_raport
    updateTahun.tahun = tahun
    await updateTahun.save()
  }
  res.redirect('/admin/tahun')
}
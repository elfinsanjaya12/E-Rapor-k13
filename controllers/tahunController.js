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

const { Siswa } = require("../models");
const Op = require("sequelize").Op;


exports.viewSiswa = async (req, res) => {
  try {
    const userLogin = req.session.user

    const siswa = await Siswa.findAll()

    res.render('admin/siswa/view_siswa', {
      title: "E-Raport | Siswa",
      user: userLogin,
      siswa: siswa,
      action: "view"
    })

  } catch (err) {
    throw err
  }
}

exports.actionCreate = async (req, res) => {
  const {
    nama,
    nisn,
    nis,
    jk,
    tgl_lahir,
    tmpt_lahir,
    agama,
    // anak_ke,
    alamat,
    no_telp,
    asal_sekolah,
    alamat_asal_sekolah,
    diterima_kelas,
    // tgl_diterima,
    di_terima_semester,
    no_ijazah,
    tahun_ijazah,
    no_skhu,
    tahun_skhu,
    ortu_ayah,
    ortu_ibu,
    alamat_ortu,
    no_ortu,
    pkj_ortu_ayah,
    pkj_ortu_bu,
    wali,
    alamat_wali,
    no_wali,
    pkj_wali,
    // foto,
  } = req.body

  await Siswa.create({
    nama: nama,
    nisn: nisn,
    nis: nis,
    jk: jk,
    tgl_lahir: tgl_lahir,
    tmpt_lahir: tmpt_lahir,
    agama: agama,
    status: "Nonactive",
    // anak_ke,
    alamat: alamat,
    no_telp: no_telp,
    asal_sekolah: asal_sekolah,
    alamat_asal_sekolah,
    diterima_kelas: diterima_kelas,
    // tgl_diterima :tgl_diterima,
    di_terima_semester: di_terima_semester,
    no_ijazah: no_ijazah,
    tahun_ijazah: tahun_ijazah,
    no_skhu: no_skhu,
    tahun_skhu: tahun_skhu,
    ortu_ayah: ortu_ayah,
    ortu_ibu: ortu_ibu,
    alamat_ortu: alamat_ortu,
    no_ortu: no_ortu,
    pkj_ortu_ayah: pkj_ortu_ayah,
    pkj_ortu_bu: pkj_ortu_bu,
    wali: wali,
    alamat_wali: alamat_wali,
    no_wali: no_wali,
    pkj_wali: pkj_wali,
    // foto: foto,
  })
  res.redirect("/admin/siswa");
}

exports.actionUpdate = async (req, res) => {
  const { id, nama } = req.body

  const updateSiswa = await Siswa.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })

  if (updateSiswa) {
    updateSiswa.nama = nama
    await updateSiswa.save()
  }
  res.redirect('/admin/siswa')
}

exports.actionDetele = async (req, res) => {
  let { id } = req.params;
  const siswa = await Siswa.findOne({ where: { id: { [Op.eq]: id } } })
  siswa.destroy()
  res.redirect('/admin/siswa');
}
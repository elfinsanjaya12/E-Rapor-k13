const {
  Guru,
  kelompok_wali_kelas,
  Tahun,
  Kelas,
  MataPelajaran,
  kelompok_kelas,
  Siswa,
  NilaiPengetahuan,
  NilaiKeterampilan,
  NilaiAbsen,
  Prestasi,
  NilaiSikap,
  Ekstrakulikuller,
  NilaiEktrakulikuler
} = require("../models");
const Op = require("sequelize").Op;

exports.viewHome = async (req, res) => {
  const userLogin = req.session.user
  try {
    res.render("siswa/home/view_home", {
      title: "E-Rapor | Guru",
      user: userLogin
    })
  } catch (err) {
    throw err
  }
}

exports.viewNilai = async (req, res) => {
  const userLogin = req.session.user
  try {
    const cek_siswa = await Siswa.findOne({
      where: { UserId: { [Op.eq]: userLogin.id } }
    })

    const siswa_kelas = await kelompok_kelas.findAll({
      where: { SiswaId: { [Op.eq]: cek_siswa.id } },
      include: [
        { model: Tahun }]
    })

    res.render("siswa/nilai/view_nilai", {
      title: "E-Rapor | Nilai",
      user: userLogin,
      siswa_kelas
    })
  } catch (err) {
    throw err
  }
}

exports.cetakRaport = async (req, res) => {
  let { SiswaId, TahunId } = req.params
  console.log(SiswaId)

  try {
    // cek siswa
    let siswa = await kelompok_kelas.findOne({
      where: {
        SiswaId: { [Op.eq]: SiswaId },
        TahunId: { [Op.eq]: TahunId }
      },
      include: [
        { model: Siswa },
        { model: Tahun },
        { model: Kelas }
      ]
    })

    // cek absen siswa
    let absen = await NilaiAbsen.findOne({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId },
        TahunId: { [Op.eq]: TahunId }
      }
      ,
      include: [
        { model: Siswa },
        { model: Tahun },
        { model: Kelas }
      ]
    })

    let ekstra = await NilaiEktrakulikuler.findAll({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId },
        TahunId: { [Op.eq]: TahunId }
      },
      include: [
        { model: Siswa },
        { model: Tahun },
        { model: Kelas },
        { model: Ekstrakulikuller }
      ]
    })

    let nilai_sikap = await NilaiSikap.findOne({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId },
        TahunId: { [Op.eq]: TahunId }
      },
    })

    let kelompok_a = await MataPelajaran.findAll({
      where: { kelompok: { [Op.eq]: "A" } }
    })

    let kelompok_b = await MataPelajaran.findAll({
      where: { kelompok: { [Op.eq]: "B" } }
    })

    let nilai_pengetahuan = await NilaiPengetahuan.findAll({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId },
        TahunId: { [Op.eq]: TahunId },
        status: { [Op.eq]: "Active" }
      },
    })

    let nilai_keterampilan = await NilaiKeterampilan.findAll({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId },
        TahunId: { [Op.eq]: TahunId },
        status: { [Op.eq]: "Active" }
      },
    })

    let prestasi = await Prestasi.findAll({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId },
        TahunId: { [Op.eq]: TahunId }
      },
    })
    if (ekstra[0].Ekstrakulikuller !== null) {

      res.render("siswa/nilai/cetak_nilai", {
        title: "E-Rapor | Raport",
        siswa,
        absen,
        view: "Isi",
        ekstra,
        kelompok_a,
        kelompok_b,
        nilai_pengetahuan,
        nilai_keterampilan,
        nilai_sikap,
        prestasi,
      })

    } else {

      res.render("siswa/nilai/cetak_nilai", {
        title: "E-Rapor | Raport",
        siswa,
        absen,
        view: "Kosong",
        ekstra,
        kelompok_a,
        kelompok_b,
        nilai_pengetahuan,
        nilai_keterampilan,
        nilai_sikap,
        prestasi,

      })
    }

  } catch (error) {
    console.log(error)
  }
}
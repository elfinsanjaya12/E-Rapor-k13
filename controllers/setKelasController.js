const {
  Kelas,
  kelompok_kelas,
  Tahun,
  Siswa,
  NilaiAbsen,
  NilaiSikap,
  NilaiEktrakulikuler
} = require("../models");
const Op = require("sequelize").Op;

const include = {
  include: [
    { model: Kelas },
    {
      model: Tahun,
      where: {
        status: { [Op.eq]: "Active" }
      }
    },
    { model: Siswa },
  ]
}

exports.viewSetKelas = async (req, res) => {
  try {
    const userLogin = req.session.user

    const kelas = await Kelas.findAll({
      order: [
        ['nama', 'ASC']
      ]
    })

    const k_kelas = await kelompok_kelas.findAll({
      ...include
    })

    res.render('admin/set_kelas/view_set_kelas', {
      title: "E-Raport | Set Kelas",
      user: userLogin,
      k_kelas: k_kelas,
      kelas: kelas
    })

  } catch (err) {
    throw err
  }
}


exports.viewAddSetKelas = (req, res) => {
  const userLogin = req.session.user
  if (userLogin.role === "admin") {
    Kelas.findAll().then(async (kelas) => {
      const kelompok_kelas_siswa = await kelompok_kelas.findAll()
      res.render("admin/set_kelas/tambah_set_kelas", {
        title: "E-Raport | Tambah Set Kelas",
        user: userLogin,
        kelas: kelas,
        kelompok_kelas_siswa: kelompok_kelas_siswa
      })
    }).catch((err) => {
      res.redirect('/admin/set-kelas/tambah');
    });
  } else {
    req.session.destroy()
    res.redirect('/signin');
  }
}

exports.viewDetailKelasSiswa = (req, res) => {
  const userLogin = req.session.user
  const id_kelas = req.params.id

  kelompok_kelas.findAll({
    where: {
      KelasId: { [Op.eq]: id_kelas }
    },
    ...include
  }).then(async (kelas_siswa) => {

    const all_siswa = await Siswa.findAll({
      where: {
        isHaveKelas: { [Op.eq]: "N" }
      }
    })

    res.render("admin/set_kelas/detail_kelompok_siswa", {
      title: "E-Raport | Tambah Detail Kelas Siswa",
      all_siswa,
      kelas_siswa,
      user: userLogin,
      id_kelas
    })
  }).catch((err) => {
    console.log(err)
  });
}

exports.actionDeteleSiswaKelompok = async (req, res) => {
  const { id, SiswaId, KelasId } = req.params

  try {
    // delete siswa
    const delete_siswa = await kelompok_kelas.findOne({
      where: {
        SiswaId: { [Op.eq]: SiswaId },
        id: { [Op.eq]: id },
      }
    })

    const delete_siswa_nilai_absen = await NilaiAbsen.findOne({
      where: {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: KelasId },
      }
    })

    const delete_nilai_sikap = await NilaiSikap.findOne({
      where: {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: KelasId },
      }
    })

    const delete_nilai_ektra = await NilaiEktrakulikuler.findOne({
      where: {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: KelasId },
      }
    })

    // update kouta kelas 
    const update_kouta_kelas = await Kelas.findOne({ where: { id: { [Op.eq]: KelasId } } })
    if (update_kouta_kelas) {
      update_kouta_kelas.kouta -= 1;
      await update_kouta_kelas.save()
    }
    // update isHaveKelas siswa
    const update_siswa = await Siswa.findOne({ where: { id: { [Op.eq]: SiswaId } } })
    if (update_siswa) {
      update_siswa.isHaveKelas = "N";
      await update_siswa.save()
    }
    delete_siswa.destroy();
    delete_siswa_nilai_absen.destroy();
    delete_nilai_sikap.destroy();
    delete_nilai_ektra.destroy();
    res.redirect(`/admin/set-kelas/${KelasId}`)
  } catch (error) {
    console.log(error)
  }
}

exports.actionAddSiswaInKelas = async (req, res) => {
  const { KelasId, SiswaId } = req.params
  // cek status tahun active
  const tahun = await Tahun.findOne({ where: { status: { [Op.eq]: "Active" } } })
  if (tahun) {
    kelompok_kelas.create({
      KelasId: KelasId,
      SiswaId: SiswaId,
      TahunId: tahun.id
    }).then(async (update_kouta_siswa) => {
      // create table nilai absen

      await NilaiAbsen.create({
        KelasId: KelasId,
        SiswaId: SiswaId,
        TahunId: tahun.id,
        s: 0,
        a: 0,
        i: 0
      })

      await NilaiSikap.create({
        KelasId: KelasId,
        SiswaId: SiswaId,
        TahunId: tahun.id,
        nilai_sosial: '-',
        nilai_spiritual: '-',
        ket_spiritual: '-',
        ket_sosial: '-'
      })

      await NilaiEktrakulikuler.create({
        KelasId: KelasId,
        SiswaId: SiswaId,
        TahunId: tahun.id,
        nilai: '-',
        desk: '-'
      })

      // cek kelas 
      const update_kelas = await Kelas.findOne({
        where: {
          id: { [Op.eq]: update_kouta_siswa.KelasId }
        }
      })
      // update kouta kelas
      if (update_kelas) {
        update_kelas.kouta += 1,
          await update_kelas.save()
      }
      // cek siswa
      const update_siswa = await Siswa.findOne({
        where: {
          id: { [Op.eq]: update_kouta_siswa.SiswaId }
        }
      })
      // update isHaveKelas siswa
      if (update_siswa) {
        update_siswa.isHaveKelas = "Y";
        await update_siswa.save()
      }

      res.redirect(`/admin/set-kelas/${KelasId}`)
    }).catch((err) => {
      console.log(err)
    });
  }
}
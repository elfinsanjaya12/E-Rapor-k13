const {
  Guru,
  kelompok_matpel_guru,
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
  NilaiSikap
} = require("../models");
const Op = require("sequelize").Op;


exports.viewHome = async (req, res) => {
  const userLogin = req.session.user
  try {
    res.render("wali_kelas/home/view_home", {
      title: "E-Raport | Guru",
      user: userLogin
    })
  } catch (err) {
    throw err
  }
}
// ====== matpel di ampuh nilai pengetahuan ========= \\
exports.viewMatpelDiampuh = async (req, res) => {
  const userLogin = req.session.user
  Guru.findOne({
    where: { UserId: { [Op.eq]: userLogin.id } }
  }).then((guru) => {
    kelompok_matpel_guru.findAll({
      where: { GuruId: { [Op.eq]: guru.id } },
      include: [
        { model: Tahun },
        { model: Kelas },
        { model: MataPelajaran },
        {
          model: Tahun,
          where: {
            status: { [Op.eq]: "Active" }
          }
        },
      ]
    }).then((diampuh) => {

      res.render("wali_kelas/matpel_diampuh/view_matpel_diampuh", {
        title: "E-Raport | Matpel Diampuh",
        user: userLogin,
        diampuh
      })
    })
  })
}

exports.viewMatpelPengetahuan = async (req, res) => {
  const { KelasId } = req.params
  const userLogin = req.session.user

  const kelas = await Kelas.findOne({
    where: {
      id: { [Op.eq]: KelasId }
    },
  })
  kelompok_kelas.findAll({
    where: {
      KelasId: { [Op.eq]: KelasId }
    },
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
  }).then((kelompok_siswa) => {
    res.render("wali_kelas/matpel_diampuh/view_input_nilai_pengetahuan", {
      title: "E-Raport | Wali Kelas",
      user: userLogin,
      kelompok_siswa,
      kelas: kelas.nama
    })
  })
}

exports.viewDetailNilai = async (req, res) => {
  const { SiswaId } = req.params
  const userLogin = req.session.user

  const siswa = await Siswa.findOne({
    where: {
      id: { [Op.eq]: SiswaId }
    },
  })

  const kelas_siswa = await kelompok_kelas.findOne({
    SiswaId: { [Op.eq]: SiswaId }
  })

  const kelas_guru = await kelompok_matpel_guru.findOne({
    KelasId: { [Op.eq]: kelas_siswa.KelasId }
  })

  NilaiPengetahuan.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId }
    },
    include: [
      {
        model: Tahun,
        where: {
          status: { [Op.eq]: "Active" }
        }
      },
      { model: Siswa },
      { model: Guru },
      { model: MataPelajaran },
    ]
  }).then((nilai) => {

    res.render("wali_kelas/matpel_diampuh/view_detail_input_nilai_pengetahuan", {
      title: "E-Raport | Guru",
      user: userLogin,
      nilai: nilai === null ? 0 : nilai,
      siswa,
      kelas_guru
    })

  })
}

exports.actionCreateNilai = (req, res) => {
  const { latihan, uts, uas, SiswaId, GuruId, TahunId, MatpelId } = req.body
  let n_latihan = 60 / 100 * latihan;
  let n_uts = 20 / 100 * uts;
  let n_uas = 20 / 100 * uas;
  const n_nilai = n_latihan + n_uts + n_uas;
  let alphabet;
  let keterangan;
  // console.log(n_latihan)
  // console.log(n_nilai)
  // pikir kan logic nilai berdasarkan kkm
  if (n_nilai >= 88 && n_nilai <= 100) {
    alphabet = "A";
    keterangan = "Sangat Baik Memahami Materi";
  } else if (n_nilai >= 74 && n_nilai < 88) {
    alphabet = "B";
    keterangan = "Baik Memahami Materi";
  } else if (n_nilai >= 60 && n_nilai < 74) {
    alphabet = "C";
    keterangan = "Cukup Baik Memahami Materi";
  } else if (n_nilai < 60) {
    alphabet = "D";
    keterangan = "Kurang Baik Memahami Materi";
  }

  NilaiPengetahuan.create({
    latihan: latihan,
    uts: uts,
    uas: uas,
    SiswaId: SiswaId,
    GuruId: GuruId,
    TahunId: TahunId,
    MatpelId: MatpelId,
    ket: keterangan,
    nilai_akhir: n_nilai,
    nilai: alphabet,
    status: "Nonactive"
  }).then(() => {
    res.redirect(`/wali-kelas/matpel-diampuh/input-nilai/${SiswaId}`)
  })
}

exports.actionDeteleNilai = (req, res) => {
  const { id, SiswaId } = req.params
  NilaiPengetahuan.findOne({
    where: { id: { [Op.eq]: id } }
  }).then((nilai) => {
    nilai.destroy();
    res.redirect(`/wali-kelas/matpel-diampuh/input-nilai/${SiswaId}`)
  })
}
// ====== matpel di ampuh nilai keterampilan ========= \\
exports.viewMatpelKeterampilan = async (req, res) => {
  const { KelasId } = req.params
  const userLogin = req.session.user

  const kelas = await Kelas.findOne({
    where: {
      id: { [Op.eq]: KelasId }
    },
  })
  kelompok_kelas.findAll({
    where: {
      KelasId: { [Op.eq]: KelasId }
    },
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
  }).then((kelompok_siswa) => {
    res.render("wali_kelas/matpel_diampuh/view_input_nilai_keterampilan", {
      title: "E-Raport | Wali Kelas",
      user: userLogin,
      kelompok_siswa,
      kelas: kelas.nama
    })
  })
}
exports.viewDetailNilaiKeterampilan = async (req, res) => {
  const { SiswaId } = req.params
  const userLogin = req.session.user

  const siswa = await Siswa.findOne({
    where: {
      id: { [Op.eq]: SiswaId }
    },
  })

  const kelas_siswa = await kelompok_kelas.findOne({
    SiswaId: { [Op.eq]: SiswaId }
  })

  const kelas_guru = await kelompok_matpel_guru.findOne({
    KelasId: { [Op.eq]: kelas_siswa.KelasId }
  })

  NilaiKeterampilan.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId }
    },
    include: [
      {
        model: Tahun,
        where: {
          status: { [Op.eq]: "Active" }
        }
      },
      { model: Siswa },
      { model: Guru },
      { model: MataPelajaran },
    ]
  }).then((nilai) => {

    res.render("wali_kelas/matpel_diampuh/view_detail_input_nilai_keterampilan", {
      title: "E-Raport | Guru",
      user: userLogin,
      nilai: nilai === null ? 0 : nilai,
      siswa,
      kelas_guru
    })

  })
}

exports.actionCreateNilaiKeterampilan = (req, res) => {
  const { latihan, uts, uas, SiswaId, GuruId, TahunId, MatpelId } = req.body
  let n_latihan = 60 / 100 * latihan;
  let n_uts = 20 / 100 * uts;
  let n_uas = 20 / 100 * uas;
  const n_nilai = n_latihan + n_uts + n_uas;
  let alphabet;
  let keterangan;
  // console.log(n_latihan)
  // console.log(n_nilai)
  // pikir kan logic nilai berdasarkan kkm
  if (n_nilai >= 88 && n_nilai <= 100) {
    alphabet = "A";
    keterangan = "Sangat Baik Memahami Materi";
  } else if (n_nilai >= 74 && n_nilai < 88) {
    alphabet = "B";
    keterangan = "Baik Memahami Materi";
  } else if (n_nilai >= 60 && n_nilai < 74) {
    alphabet = "C";
    keterangan = "Cukup Baik Memahami Materi";
  } else if (n_nilai < 60) {
    alphabet = "D";
    keterangan = "Kurang Baik Memahami Materi";
  }

  NilaiKeterampilan.create({
    latihan: latihan,
    uts: uts,
    uas: uas,
    SiswaId: SiswaId,
    GuruId: GuruId,
    TahunId: TahunId,
    MatpelId: MatpelId,
    ket: keterangan,
    nilai_akhir: n_nilai,
    nilai: alphabet,
    status: "Nonactive"
  }).then(() => {
    res.redirect(`/wali-kelas/matpel-diampuh/input-nilai/keterampilan/${SiswaId}`)
  })
}

exports.actionDeteleNilaiKeterampilan = (req, res) => {
  const { id, SiswaId } = req.params
  NilaiKeterampilan.findOne({
    where: { id: { [Op.eq]: id } }
  }).then((nilai) => {
    nilai.destroy();
    res.redirect(`/wali-kelas/matpel-diampuh/input-nilai/keterampilan/${SiswaId}`)
  })
}

const include = {
  include: [
    { model: Tahun },
    { model: Kelas },
    { model: MataPelajaran }
  ]
}
exports.viewRiwayatMengajar = async (req, res) => {

  const userLogin = req.session.user
  Guru.findOne({
    where: { UserId: { [Op.eq]: userLogin.id } }
  }).then((guru) => {
    kelompok_matpel_guru.findAll({
      where: { GuruId: { [Op.eq]: guru.id } },
      ...include
    }).then((riwayat) => {
      res.render("wali_kelas/riwayat_mengajar/view_riwayat_mengajar", {
        title: "E-Raport | Matpel Diampuh",
        user: userLogin,
        riwayat
      })
    })
  })
}

// =============== awal absen ============== \\
exports.viewAbsen = async (req, res) => {
  const userLogin = req.session.user
  Guru.findOne({
    where: { UserId: { [Op.eq]: userLogin.id } }
  }).then((guru) => {
    kelompok_wali_kelas.findOne({
      where: {
        GuruId: { [Op.eq]: guru.id }
      }
    }).then((nilai_absen) => {
      NilaiAbsen.findAll({
        where: { KelasId: { [Op.eq]: nilai_absen.KelasId } },
        include: [
          { model: Tahun },
          { model: Kelas },
          { model: Siswa }
        ]
      }).then((get_nilai_absen) => {
        res.render("wali_kelas/absen/view_absen", {
          title: "E-Raport | Absen",
          user: userLogin,
          get_nilai_absen
        })
      })
    })
  })
}

exports.actionCreateNilaiAbsen = async (req, res) => {
  const s = req.body.s;
  const i = req.body.i;
  const a = req.body.a;
  const dataSiswa = req.body.id;

  console.log(s)
  console.log(i)
  console.log(a)
  if (typeof dataSiswa === 'string' || dataSiswa instanceof String) {
    await NilaiAbsen.update({
      s: s,
      i: i,
      a: a
    }, {
      where: {
        id: { [Op.eq]: parseInt(req.body.id) }
      }
    });
    res.redirect("/wali-kelas/input-absen")
  } else {
    for (let i = 0; i < dataSiswa.length; i++) {
      await NilaiAbsen.update({
        s: s[i],
        i: i[i],
        a: a[i]
      }, {
        where: {
          id: { [Op.eq]: req.body.id[i] }
        }
      });
    }
    res.redirect("/wali-kelas/input-absen")
  }
}

// =============== akhir absen ============== \\

// =============== prestasi siswa ================\\
exports.viewPrestasiSiswa = (req, res) => {
  const userLogin = req.session.user
  // cek guru
  Guru.findOne({
    where: { UserId: { [Op.eq]: userLogin.id } }
  }).then((guru) => {
    // cek wali kelas
    kelompok_wali_kelas.findOne({
      where: {
        GuruId: { [Op.eq]: guru.id }
      }
    }).then(async (wali_kelas) => {
      const kelompok_siswa = await kelompok_kelas.findAll({
        where: { KelasId: { [Op.eq]: wali_kelas.KelasId } },
        include: [
          { model: Siswa }
        ]
      })
      // cek mahasiswa berprestasi
      Prestasi.findAll({
        where: { KelasId: { [Op.eq]: wali_kelas.KelasId } },
        include: [
          {
            model: Tahun,
            where: { status: { [Op.eq]: "Active" } }
          },
          { model: Kelas },
          { model: Siswa }
        ]
      }).then((prestasi) => {
        res.render("wali_kelas/prestasi/view_prestasi", {
          title: "E-Raport | Prestasi",
          user: userLogin,
          prestasi,
          kelompok_siswa
        })
      })
    })
  })
}

exports.actionCreatePrestasi = async (req, res) => {
  const { SiswaId, jenis, ket } = req.body

  try {
    const cek_tahun = await Tahun.findOne({
      where: {
        status: { [Op.eq]: "Active" }
      }
    })
    console.log(cek_tahun)
    kelompok_kelas.findOne({
      where: {
        SiswaId: { [Op.eq]: SiswaId }
      }
    }).then((kelas_siswa) => {
      console.log(kelas_siswa)
      Prestasi.create({
        SiswaId: SiswaId,
        TahunId: cek_tahun.id,
        KelasId: kelas_siswa.KelasId,
        jenis: jenis,
        ket: ket
      }).then(() => {
        res.redirect("/wali-kelas/prestasi")
      }).catch((err) => {
        console.log(err)
      });
    })
  } catch (error) {
    console.log(error)
  }
}


exports.actionDetelePrestasi = (req, res) => {
  const { id } = req.params
  Prestasi.findOne({
    where: { id: { [Op.eq]: id } }
  }).then((prestasi) => {
    prestasi.destroy();
    res.redirect(`/wali-kelas/prestasi`)
  })
}

// =============== akhir prestasi =================\\

exports.viewRaport = async (req, res) => {
  try {
    res.render("wali_kelas/raport/view_raport", {
      title: "E-Raport | Absen",
    })
  } catch (err) {
    throw err
  }
}

// =============== awal nilai sikap =================\\
exports.viewNilaiSikap = async (req, res) => {
  const userLogin = req.session.user
  Guru.findOne({
    where: { UserId: { [Op.eq]: userLogin.id } }
  }).then((guru) => {
    kelompok_wali_kelas.findOne({
      where: {
        GuruId: { [Op.eq]: guru.id }
      }
    }).then((cek_nilai_sikap) => {
      NilaiSikap.findAll({
        where: { KelasId: { [Op.eq]: cek_nilai_sikap.KelasId } },
        include: [
          {
            model: Tahun,
            where: { status: { [Op.eq]: "Active" } }
          },
          { model: Kelas },
          { model: Siswa }
        ]
      }).then((nilai_sikap) => {
        res.render("wali_kelas/input_nilai_sikap/view_input_nilai_sikap", {
          title: "E-Raport | Input Nilai Sikap",
          user: userLogin,
          nilai_sikap
        })
      })
    })
  })
}

exports.actionCreateNilaiSikap = async (req, res) => {
  const n_sosial = req.body.nilai_sosial;
  const n_spiritual = req.body.nilai_spiritual;
  const nilai_sikap = req.body.id;
  var ket_sosial, ket_spiritual;
  for (let i = 0; i < nilai_sikap.length; i++) {
    if (n_sosial[i] === "A") {
      ket_sosial = "selalu bersikap santun pada orang lain, peduli pada sesama teman, memiliki kepercayaan diri yang baik, responsif dalam pergaulan, memiliki sikap jujur, disiplin, dan tanggungjawab yang tinggi."
    } else if (n_sosial[i] === "B") {
      ket_sosial = "memiliki sikap santun pada orang lain, peduli pada sesama teman, memiliki kepercaya diri yang baik, cukup responsif dalam pergaulan, memiliki sikap jujur, disiplin, dan tanggungjawab yang cukup tinggi."
    } else if (n_sosial[i] === "C") {
      ket_sosial = "memiliki sikap yang cukup santun pada orang lain, cukup peduli pada sesama teman, memiliki kepercayaan diri yang cukup baik, responsif dalam pergaulan, memiliki sikap jujur, cukup disiplin, dan tanggungjawab yang cukup baik."
    } else if (n_sosial[i] === "D") {
      ket_sosial = "sering bersikap kurang santun pada orang lain, kurang peduli pada sesama teman, kepercayaan diri kurang baik , tidak responsif dalam pergaulan, kurang memiliki sikap jujur, disiplin, dan tanggungjawab yang rendah."
    }

    if (n_spiritual[i] === "A") {
      ket_spiritual = "selalu bersyukur dan berdoa sebelum melakukan kegiatan serta memiliki toleran yang sangat tinggi pada pemeluk agama yang berbeda, ketaatan beribadah sangat baik dan selalu mengingatkan teman-temannya untuk melaksanakan ajaran agamanya dengan baik."
    } else if (n_spiritual[i] === "B") {
      ket_spiritual = "selalu bersyukur dan berdoa sebelum melakukan kegiatan serta memiliki toleran yang tinggi pada pemeluk agama yang berbeda, ketaatan beribadah baik dan sering mengingatkan teman-temannya untuk melaksanakan ajaran agamanya dengan baik."
    } else if (n_spiritual[i] === "C") {
      ket_spiritual = "selalu bersyukur dan berdoa sebelum melakukan kegiatan serta memiliki toleran yang cukup tinggi pada pemeluk agama yang berbeda, ketaatan beribadah mulai berkembang dari waktu ke waktu."
    } else if (n_spiritual[i] === "D") {
      ket_spiritual = "selalu bersyukur dan berdoa sebelum melakukan kegiatan akan tetapi memiliki sikap kurang toleran pada pemeluk agama yang berbeda, ketaatan beribadah masih belum menunjukan perkembangan yang baik."
    }

    await NilaiSikap.update({
      nilai_sosial: n_sosial[i],
      nilai_spiritual: n_spiritual[i],
      ket_spiritual: ket_spiritual,
      ket_sosial: ket_sosial
    }, {
      where: {
        id: { [Op.eq]: req.body.id[i] }
      }
    });
  }
  res.redirect("/wali-kelas/input-nilai-sikap")

}
// =============== akhir nilai sikap =================\\
exports.viewNilaiEktra = async (req, res) => {
  const userLogin = req.session.user
  try {
    res.render("wali_kelas/input_nilai_ektrakulikuler/view_input_nilai_ektrakulikuler", {
      title: "E-Raport | Input Nilai Ektrakulikuler",
      user: userLogin
    })
  } catch (err) {
    throw err
  }
}

exports.viewValidasiNilai = async (req, res) => {
  const userLogin = req.session.user
  try {
    res.render("wali_kelas/validasi_nilai/view_validasi_nilai", {
      title: "E-Raport | Input Nilai Ektrakulikuler",
      user: userLogin
    })
  } catch (err) {
    throw err
  }
}
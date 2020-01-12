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
  NilaiSikap,
  Ekstrakulikuller,
  NilaiEktrakulikuler,
  User
} = require("../models");
const Op = require("sequelize").Op;
const bcrypt = require("bcryptjs");

exports.viewHome = async (req, res) => {
  const userLogin = req.session.user
  try {
    res.render("wali_kelas/home/view_home", {
      title: "E-Rapor | Guru",
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
        title: "E-Rapor | Matpel Diampuh",
        user: userLogin,
        diampuh
      })
    })
  })
}

exports.viewMatpelPengetahuan = async (req, res) => {

  const { KelasId, MatpelId } = req.params
  const userLogin = req.session.user

  const kelas = await Kelas.findOne({
    where: {
      id: { [Op.eq]: KelasId }
    },
  })
  // ini bug 24/12/2019
  const cek_matpel = await MataPelajaran.findOne({
    where: {
      id: { [Op.eq]: MatpelId }
    }
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
      title: "E-Rapor | Wali Kelas",
      user: userLogin,
      kelompok_siswa,
      kelas: kelas.nama,
      cek_matpel
    })
  })
}

exports.viewDetailNilai = async (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus };
  const { SiswaId, MatpelId } = req.params
  const userLogin = req.session.user

  const siswa = await Siswa.findOne({
    where: {
      id: { [Op.eq]: SiswaId }
    },
  })

  const kelas_siswa = await kelompok_kelas.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId }
    }
  })

  const cek_matpel = await MataPelajaran.findOne({
    where: {
      id: { [Op.eq]: MatpelId }
    }
  })


  const kelas_guru = await kelompok_matpel_guru.findOne({
    where: {
      KelasId: { [Op.eq]: kelas_siswa.KelasId }
    }
  })

  NilaiPengetahuan.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId },
      MatpelId: { [Op.eq]: MatpelId }
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
      title: "E-Rapor | Guru",
      user: userLogin,
      nilai: nilai === null ? 0 : nilai,
      siswa,
      kelas_guru,
      cek_matpel,
      alert
    })

  })
}

exports.actionCreateNilai = (req, res) => {
  const { latihan, uts, uas, SiswaId, GuruId, TahunId, MatpelId, KelasId } = req.body
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
    KelasId: KelasId,
    ket: keterangan,
    nilai_akhir: n_nilai,
    nilai: alphabet,
    status: "Nonactive"
  }).then(() => {
    req.flash('alertMessage', `Sukses Create Nilai`);
    req.flash('alertStatus', 'success');
    res.redirect(`/wali-kelas/matpel-diampuh/input-nilai/${SiswaId}/matpel/${MatpelId}`)
  })
}

exports.actionDeteleNilai = (req, res) => {
  const { id, SiswaId } = req.params
  NilaiPengetahuan.findOne({
    where: { id: { [Op.eq]: id } }
  }).then((nilai) => {
    const cek_matpel = nilai.MatpelId
    nilai.destroy();
    res.redirect(`/wali-kelas/matpel-diampuh/input-nilai/${SiswaId}/matpel/${cek_matpel}`)
  })
}
// ====== matpel di ampuh nilai keterampilan ========= \\
exports.viewMatpelKeterampilan = async (req, res) => {
  const { KelasId, MatpelId } = req.params
  const userLogin = req.session.user

  const kelas = await Kelas.findOne({
    where: {
      id: { [Op.eq]: KelasId }
    },
  })
  // ini bug 24/12/2019
  const cek_matpel = await MataPelajaran.findOne({
    where: {
      id: { [Op.eq]: MatpelId }
    }
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
      title: "E-Rapor | Wali Kelas",
      user: userLogin,
      kelompok_siswa,
      kelas: kelas.nama,
      cek_matpel
    })
  })
}
exports.viewDetailNilaiKeterampilan = async (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus };
  const { SiswaId, MatpelId } = req.params
  const userLogin = req.session.user

  const siswa = await Siswa.findOne({
    where: {
      id: { [Op.eq]: SiswaId }
    },
  })

  const cek_matpel = await MataPelajaran.findOne({
    where: {
      id: { [Op.eq]: MatpelId }
    }
  })

  const kelas_siswa = await kelompok_kelas.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId }
    }
  })

  const kelas_guru = await kelompok_matpel_guru.findOne({
    where: {
      KelasId: { [Op.eq]: kelas_siswa.KelasId }
    }
  })

  NilaiKeterampilan.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId },
      MatpelId: { [Op.eq]: MatpelId }
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
      title: "E-Rapor | Guru",
      user: userLogin,
      nilai: nilai === null ? 0 : nilai,
      siswa,
      kelas_guru,
      cek_matpel,
      alert
    })

  })
}

exports.actionCreateNilaiKeterampilan = (req, res) => {
  const { latihan, uts, uas, SiswaId, GuruId, TahunId, MatpelId, KelasId } = req.body
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
    KelasId: KelasId,
    ket: keterangan,
    nilai_akhir: n_nilai,
    nilai: alphabet,
    status: "Nonactive"
  }).then(() => {
    req.flash('alertMessage', `Sukses Create Nilai`);
    req.flash('alertStatus', 'success');
    res.redirect(`/wali-kelas/matpel-diampuh/input-nilai/keterampilan/${SiswaId}/matpel/${MatpelId}`)
  })
}

exports.actionDeteleNilaiKeterampilan = (req, res) => {
  const { id, SiswaId } = req.params
  NilaiKeterampilan.findOne({
    where: { id: { [Op.eq]: id } }
  }).then((nilai) => {
    const cek_matpel = nilai.MatpelId
    nilai.destroy();
    res.redirect(`/wali-kelas/matpel-diampuh/input-nilai/keterampilan/${SiswaId}/matpel/${cek_matpel}`)
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
        title: "E-Rapor | Matpel Diampuh",
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
          title: "E-Rapor | Absen",
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
    for (let x = 0; x < dataSiswa.length; x++) {
      await NilaiAbsen.update({
        s: s[x],
        i: i[x],
        a: a[x]
      }, {
        where: {
          id: { [Op.eq]: req.body.id[x] }
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
          title: "E-Rapor | Prestasi",
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
          title: "E-Rapor | Input Nilai Sikap",
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

// nilai ektrakulikuler
exports.viewNilaiEktra = async (req, res) => {
  const userLogin = req.session.user
  try {
    const ekstra = await Ekstrakulikuller.findAll()
    res.render("wali_kelas/input_nilai_ektrakulikuler/view_input_nilai_ektrakulikuler", {
      title: "E-Rapor | Input Nilai Ektrakulikuler",
      user: userLogin,
      ekstra,
    })
  } catch (err) {
    throw err
  }
}

exports.viewKelompokSiswaEktra = async (req, res) => {
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
      const kelompok_siswa = await NilaiEktrakulikuler.findAll({
        where: { KelasId: { [Op.eq]: wali_kelas.KelasId } },
        include: [
          { model: Siswa }
        ]
      })
      res.status(200).json({
        kelompok_siswa: kelompok_siswa
      });
    })
  })
}

exports.actionCreateEktra = async (req, res) => {
  const dataSiswa = req.body.id;
  const EkstraId = req.body.id_ekstra;
  const nilai = req.body.nilai;
  let desk = "";
  for (let i = 0; i < dataSiswa.length; i++) {
    if (nilai[i] === "A") {
      desk = "Sangat Baik"
    } else if (nilai[i] === "B") {
      desk = "Baik"
    } else if (nilai[i] === "C") {
      desk = "Cukup"
    } else if (nilai[i] === "D") {
      desk = "Kurang"
    } else {
      desk = "-"
    }

    await NilaiEktrakulikuler.update({
      EkstraId: EkstraId,
      nilai: nilai[i],
      desk: desk
    }, {
      where: {
        id: { [Op.eq]: req.body.id[i] }
      }
    });
  }

  res.redirect("/wali-kelas/ekstra")
}

exports.viewValidasiNilai = async (req, res) => {
  const userLogin = req.session.user

  try {
    const matpel = await MataPelajaran.findAll()
    res.render("wali_kelas/validasi_nilai/view_validasi_nilai", {
      title: "E-Rapor | Input Nilai Ektrakulikuler",
      user: userLogin,
      matpel: matpel
    })
  } catch (err) {
    throw err
  }
}

exports.showNilaiKeterampilan = async (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus };
  // session user login
  const userLogin = req.session.user
  const { MatpelId } = req.params

  try {
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

        const nilai_keterampilan = await NilaiKeterampilan.findAll({
          where: {
            MatpelId: { [Op.eq]: MatpelId }
          },
          include: [
            { model: Siswa }
          ]
        })
        res.render("wali_kelas/validasi_nilai/show_nilai_keterampilan", {
          title: "E-Rapor | Show Nilai Keterampilan",
          user: userLogin,
          kelompok_siswa,
          nilai_keterampilan,
          alert
        })
      })
    })

  } catch (error) {
    console.log(error)
  }
}

exports.updateStatusNilaiKeterampilan = async (req, res) => {
  const data_siswa = req.body.id
  const MatpelId = req.body.MatpelId

  try {
    if (data_siswa) {
      if (typeof data_siswa === 'string' || data_siswa instanceof String) {
        // cek nilai pengetahuan
        let update = await NilaiKeterampilan.findOne({
          where: {
            id: { [Op.eq]: data_siswa }
          }
        });

        if (update) {
          update.status = "Active";
          await update.save();
        }
        req.flash('alertMessage', `Sukses Validasi semua nilai`);
        req.flash('alertStatus', 'success');
        return res.redirect(`/wali-kelas/validasi/show-nilai-pengetahuan/${update.MatpelId}`);
      } else {
        for (var i = 0; i < data_siswa.length; i++) {
          var update = await NilaiKeterampilan.update({
            status: "Active"
          }, {
            where: {
              id: { [Op.eq]: req.body.id[i] }
            }
          })
        }
      }
      req.flash('alertMessage', `Sukses Validasi semua nilai`);
      req.flash('alertStatus', 'success');
      res.redirect(`/wali-kelas/validasi/show-nilai-keterampilan/${MatpelId[0]}`)
    } else {
      req.flash('alertMessage', `Tidak Ada Nilai Mahasiswa`);
      req.flash('alertStatus', 'warning');
      res.redirect(`/wali-kelas/validasi/show-nilai-keterampilan/${MatpelId}`)
    }

  } catch (error) {
    console.log(error);
  }

}

// sidebar validasi nilai
exports.showNilaiPengetahuan = async (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus };
  // session user login
  const userLogin = req.session.user
  const { MatpelId } = req.params

  try {
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

        const nilai_pengetahuan = await NilaiPengetahuan.findAll({
          where: {
            MatpelId: { [Op.eq]: MatpelId }
          },
          include: [
            { model: Siswa }
          ]
        })
        res.render("wali_kelas/validasi_nilai/show_nilai_pengetahuan", {
          title: "E-Rapor | Show Nilai Pengetahuan",
          user: userLogin,
          kelompok_siswa,
          nilai_pengetahuan,
          alert
        })
      })
    })

  } catch (error) {
    console.log(error)
  }
}

exports.updateStatusNilaiPengetahuan = async (req, res) => {
  const data_siswa = req.body.id
  const MatpelId = req.body.MatpelId
  if (data_siswa) {

    if (typeof data_siswa === 'string' || data_siswa instanceof String) {
      // cek nilai pengetahuan
      let update = await NilaiPengetahuan.findOne({
        where: {
          id: { [Op.eq]: data_siswa }
        }
      });

      if (update) {
        update.status = "Active";
        await update.save();
      }
      req.flash('alertMessage', `Sukses Validasi semua nilai`);
      req.flash('alertStatus', 'success');
      return res.redirect(`/wali-kelas/validasi/show-nilai-pengetahuan/${update.MatpelId}`);
    } else {
      for (var i = 0; i < data_siswa.length; i++) {
        await NilaiPengetahuan.update({
          status: "Active"
        }, {
          where: {
            id: { [Op.eq]: req.body.id[i] }
          }
        })
      }
    }
    req.flash('alertMessage', `Sukses Validasi semua nilai`);
    req.flash('alertStatus', 'success');
    res.redirect(`/wali-kelas/validasi/show-nilai-pengetahuan/${MatpelId[0]}`)
  } else {
    req.flash('alertMessage', `Tidak Ada Nilai Mahasiswa`);
    req.flash('alertStatus', 'warning');
    res.redirect(`/wali-kelas/validasi/show-nilai-pengetahuan/${MatpelId}`)
  }
}

/** Start Cetak raport */

exports.viewCetakRaport = (req, res) => {

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
      res.render("wali_kelas/raport/view_raport", {
        title: "E-Rapor | Raport",
        kelompok_siswa,
        user: userLogin
      })
    })
  })
}


exports.cetakRaport = async (req, res) => {
  let { SiswaId } = req.params

  try {
    // cek siswa
    let siswa = await kelompok_kelas.findOne({
      where: { SiswaId: { [Op.eq]: SiswaId } },
      include: [
        { model: Siswa },
        { model: Tahun },
        { model: Kelas }
      ]
    })

    console.log("siswa");
    console.log(siswa);

    // cek absen siswa
    let absen = await NilaiAbsen.findOne({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId }
      }
      ,
      include: [
        { model: Siswa },
        { model: Tahun },
        { model: Kelas }
      ]
    })
    console.log("absen");
    console.log(absen);

    let ekstra = await NilaiEktrakulikuler.findAll({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId }
      },
      include: [
        { model: Siswa },
        { model: Tahun },
        { model: Kelas },
        { model: Ekstrakulikuller }
      ]
    })

    console.log("ekstra");
    console.log(ekstra[0].Ekstrakulikuller);


    let nilai_sikap = await NilaiSikap.findOne({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId }
      },
    })
    console.log("nilai_sikap");
    console.log(nilai_sikap);
    let kelompok_a = await MataPelajaran.findAll({
      where: { kelompok: { [Op.eq]: "A" } }
    })

    console.log("kelompok_a");
    console.log(kelompok_a);

    let kelompok_b = await MataPelajaran.findAll({
      where: { kelompok: { [Op.eq]: "B" } }
    })

    console.log("kelompok_b");
    console.log(kelompok_b);

    let nilai_pengetahuan = await NilaiPengetahuan.findAll({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId }
      },
    })
    console.log("nilai_pengetahuan");
    console.log(nilai_pengetahuan);

    let nilai_keterampilan = await NilaiKeterampilan.findAll({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId }
      },
    })

    console.log("nilai_keterampilan");
    console.log(nilai_keterampilan);

    let prestasi = await Prestasi.findAll({
      where:
      {
        SiswaId: { [Op.eq]: SiswaId },
        KelasId: { [Op.eq]: siswa.KelasId }
      },
    })

    console.log("prestasi");
    console.log(prestasi);

    // if (ekstra[0].Ekstrakulikuller !== null) {
    const userLogin = req.session.user
    // cek guru
    Guru.findOne({
      where: { UserId: { [Op.eq]: userLogin.id } }
    }).then((guru) => {
      // cek wali kelas
      kelompok_wali_kelas.findOne({
        where: {
          GuruId: { [Op.eq]: guru.id }
        },
        include: [{
          model: Guru
        }]
      }).then((wali_kelas) => {
        console.log("wali_kelas")
        console.log(wali_kelas)
        res.render("wali_kelas/raport/cetak_raport", {
          title: "E-Rapor | Raport",
          siswa,
          absen,
          view: "Isi",
          ekstra: ekstra[0].Ekstrakulikuller === null ? [] : ekstra,
          kelompok_a,
          kelompok_b,
          nilai_pengetahuan,
          nilai_keterampilan,
          nilai_sikap,
          prestasi,
          wali_kelas
        })
      })
    })
    // } else {
    //   const userLogin = req.session.user
    //   // cek guru
    //   Guru.findOne({
    //     where: { UserId: { [Op.eq]: userLogin.id } }
    //   }).then((guru) => {
    //     // cek wali kelas
    //     kelompok_wali_kelas.findOne({
    //       where: {
    //         GuruId: { [Op.eq]: guru.id }
    //       },
    //       include: [{
    //         model: Guru
    //       }]
    //     }).then((wali_kelas) => {
    //       console.log("wali_kelas")
    //       console.log(wali_kelas)
    //       res.render("wali_kelas/raport/cetak_raport", {
    //         title: "E-Rapor | Raport",
    //         siswa,
    //         absen,
    //         view: "Kosong",
    //         ekstra: ekstra[0].Ekstrakulikuller === null ? [] : ekstra,
    //         kelompok_a,
    //         kelompok_b,
    //         nilai_pengetahuan,
    //         nilai_keterampilan,
    //         nilai_sikap,
    //         prestasi,
    //         wali_kelas
    //       })
    //     })
    //   })

    // }

  } catch (error) {
    console.log(error)
    return res.redirect("/wali-kelas/raport")
  }
}
/** End Cetak Raport */


// biodata guru 
exports.viewBiodata = async (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus };
  const userLogin = req.session.user
  // cek guru
  const guru = await Guru.findOne({
    where: { UserId: { [Op.eq]: userLogin.id } }
  })
  res.render('wali_kelas/profile/view_profile', {
    title: "E-Rapor || Biodata",
    user: userLogin,
    guru,
    alert: alert
  })
}

// ubah password
exports.actionChangePassword = async (req, res) => {
  try {
    const { id, password_baru, konfirmasi_password } = req.body;
    console.log(id)
    const user = await User.findOne({
      where: {
        id: { [Op.eq]: id }
      }
    })
    console.log(user)
    if (user) {
      if (password_baru === konfirmasi_password) {
        const password = bcrypt.hashSync(password_baru, 10);
        user.password = password;
        await user.save();
        req.flash('alertMessage', `Success Ubah Password`);
        req.flash('alertStatus', 'success');
        return res.redirect("/wali-kelas/profile")
      } else {
        req.flash('alertMessage', `Password Baru dan Konfirmasi Tidak Cocok !!!`);
        req.flash('alertStatus', 'warning');
        return res.redirect("/wali-kelas/profile")
      }
    } else {
      req.flash('alertMessage', `User Not Found !!!`);
      req.flash('alertStatus', 'warning');
      return res.redirect("/wali-kelas/profile")
    }

  } catch (error) {

  }

}


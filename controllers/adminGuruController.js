const {
  Guru,
  kelompok_matpel_guru,
  Tahun,
  Kelas,
  MataPelajaran,
  kelompok_kelas,
  Siswa,
  NilaiPengetahuan,
  NilaiKeterampilan
} = require("../models");
const Op = require("sequelize").Op;

const include = {
  include: [
    { model: Tahun },
    { model: Kelas },
    { model: MataPelajaran }
  ]
}

exports.viewHome = (req, res) => {
  const userLogin = req.session.user
  if (userLogin.role === "guru") {
    res.render("guru/home/view_home", {
      title: "E-Rapor | Guru",
      user: userLogin
    })
  } else {
    req.session.destroy();
    res.redirect("signin");
  }
}

exports.viewRiwayat = async (req, res) => {
  const userLogin = req.session.user
  Guru.findOne({
    where: { UserId: { [Op.eq]: userLogin.id } }
  }).then((guru) => {
    kelompok_matpel_guru.findAll({
      where: { GuruId: { [Op.eq]: guru.id } },
      ...include
    }).then((riwayat) => {
      res.render("guru/riwayat/view_riwayat", {
        title: "E-Rapor | Guru",
        user: userLogin,
        riwayat
      })
    })
  })
}

// view nilai matpel yang diampuh \\
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
      res.render("guru/diampuh/view_diampuh", {
        title: "E-Rapor | Guru",
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

    // let nilai = await NilaiPengetahuan.findOne({
    //   where: {
    //     SiswaId: { [Op.eq]: kelompok_siswa.SiswaId }
    //   },
    // })
    // console.log(nilai) 
    // logic agar tidak error
    // if (nilai === null) {
    //   nilai = 0
    // }
    res.render("guru/diampuh/view_input_nilai_pengetahuan", {
      title: "E-Rapor | Guru",
      user: userLogin,
      kelompok_siswa,
      kelas: kelas.nama,
      cek_matpel
      // nilai
    })
  })
}

exports.viewDetailNilai = async (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus };
  const { SiswaId, MatpelId } = req.params

  // agar yang masuk tahun aktip saja pada saat penilai
  const tahun = await Tahun.findOne({ where: { status: { [Op.eq]: "Active" } } })

  const userLogin = req.session.user

  const siswa = await Siswa.findOne({
    where: {
      id: { [Op.eq]: SiswaId }
    },
  })

  const kelas_siswa = await kelompok_kelas.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId },
      TahunId: { [Op.eq]: tahun.id }
    }
  })

  const cek_matpel = await MataPelajaran.findOne({
    where: {
      id: { [Op.eq]: MatpelId }
    }
  })

  const kelas_guru = await kelompok_matpel_guru.findOne({
    where: {
      KelasId: { [Op.eq]: kelas_siswa.KelasId },
      TahunId: { [Op.eq]: tahun.id }
    }
  })
  console.log("kelas id" + kelas_guru.KelasId);

  NilaiPengetahuan.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId },
      MatpelId: { [Op.eq]: MatpelId },
      TahunId: { [Op.eq]: tahun.id }
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
    if (nilai === null) {
      nilai = 0;
    }
    res.render("guru/diampuh/view_detail_input_nilai_pengetahuan", {
      title: "E-Rapor | Guru",
      user: userLogin,
      nilai,
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
    res.redirect(`/guru/matpel/input-nilai/${SiswaId}/matpel/${MatpelId}`)
  })
}

exports.actionDeteleNilai = (req, res) => {
  const { id, SiswaId } = req.params
  NilaiPengetahuan.findOne({
    where: { id: { [Op.eq]: id } }
  }).then((nilai) => {
    const cek_matpel = nilai.MatpelId
    nilai.destroy();
    res.redirect(`/guru/matpel/input-nilai/${SiswaId}/matpel/${cek_matpel}`)
  })
}

// ===== nilai keterampilan bug ============ \\
exports.viewMatpelKeterampilan = async (req, res) => {
  const { KelasId, MatpelId } = req.params
  const userLogin = req.session.user

  // ini bug 24/12/2019
  const cek_matpel = await MataPelajaran.findOne({
    where: {
      id: { [Op.eq]: MatpelId }
    }
  })

  kelompok_kelas.findAll({
    where: {
      KelasId: { [Op.eq]: KelasId },

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
    res.render("guru/diampuh/view_input_nilai_keterampilan", {
      title: "E-Rapor | Guru",
      user: userLogin,
      kelompok_siswa,
      kelas: kelompok_siswa[0].Kela.nama,
      // ini bug 24/12/2019
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

  // agar yang masuk tahun aktip saja pada saat penilai
  const tahun = await Tahun.findOne({ where: { status: { [Op.eq]: "Active" } } })

  // cek siswa
  const siswa = await Siswa.findOne({
    where: {
      id: { [Op.eq]: SiswaId }
    },
  })
  // lalu cek matpel 
  const cek_matpel = await MataPelajaran.findOne({
    where: {
      id: { [Op.eq]: MatpelId }
    }
  })

  const kelas_siswa = await kelompok_kelas.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId },
      TahunId: { [Op.eq]: tahun.id }
    }
  })

  const kelas_guru = await kelompok_matpel_guru.findOne({
    where: {
      KelasId: { [Op.eq]: kelas_siswa.KelasId },
      TahunId: { [Op.eq]: tahun.id }
    }
  })

  NilaiKeterampilan.findOne({
    where: {
      SiswaId: { [Op.eq]: SiswaId },
      MatpelId: { [Op.eq]: MatpelId },
      TahunId: { [Op.eq]: tahun.id }
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
    if (nilai === null) {
      nilai = 0;
    }

    res.render("guru/diampuh/view_detail_input_nilai_keterampilan", {
      title: "E-Rapor | Guru",
      user: userLogin,
      nilai,
      siswa,
      kelas_guru,
      cek_matpel,
      alert
    })
  })

  // if (SiswaId !== "" && kelas_guru.GuruId !== "" && kelas_guru.MatpelId !== "") {
  // console.log(SiswaId + " " + kelas_guru.GuruId + " " + kelas_guru.MatpelId)
  // res.redirect(`/guru/matpel/input-nilai/keterampilan/${SiswaId}`)
  // } else {

}

exports.actionCreateKeterampilan = (req, res) => {
  const {
    latihan,
    uts,
    uas,
    SiswaId,
    GuruId,
    TahunId,
    MatpelId,
    KelasId
  } = req.body

  console.log(latihan, uts, uas, SiswaId, GuruId, TahunId, MatpelId, KelasId)
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
    res.redirect(`/guru/matpel/input-nilai/keterampilan/${SiswaId}/matpel/${MatpelId}`)
  })
}

exports.actionDeteleNilaiKeterampilan = (req, res) => {
  const { id, SiswaId } = req.params
  NilaiKeterampilan.findOne({
    where: { id: { [Op.eq]: id } }
  }).then((nilai) => {
    const cek_matpel = nilai.MatpelId;
    nilai.destroy();
    res.redirect(`/guru/matpel/input-nilai/keterampilan/${SiswaId}/matpel/${cek_matpel}`)
  })
}
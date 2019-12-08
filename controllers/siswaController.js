const { Siswa, User } = require("../models");
const Op = require("sequelize").Op;
const bcrypt = require("bcryptjs");

exports.viewSiswa = async (req, res) => {
  try {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    const userLogin = req.session.user;
    const siswa = await Siswa.findAll()
    if (userLogin.role === "admin") {

      res.render('admin/siswa/view_siswa', {
        title: "E-Raport | Siswa",
        user: userLogin,
        siswa: siswa,
        alert: alert,
        action: "view"
      })
    } else {
      req.session.destroy();
      res.redirect("/signin")
    }

  } catch (err) {
    throw err
  }
}

exports.actionCreate = async (req, res) => {
  var {
    nama,
    nisn,
    nis,
    jk,
    tgl_lahir,
    tmpt_lahir,
    agama,
    alamat,
    no_telp,
    asal_sekolah,
    alamat_asal_sekolah,
    diterima_kelas,
    tgl_diterima,
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
    pkj_wali
  } = req.body

  const passwordDefault = bcrypt.hashSync(nis, 7);
  const cek_siswa = await Siswa.findOne({ where: { nis: { [Op.eq]: nis } } })

  if (cek_siswa) {
    req.flash('alertMessage', 'NIS siswa sudah ada yang memakai, silahkan ganti dengan yang lain!');
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/siswa');
  } else {
    User.create({
      username: nis,
      role: 'siswa',
      password: passwordDefault,
      status: 'Nonactive'
    }).then((user) => {
      Siswa.create({
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
        tgl_diterima: tgl_diterima,
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
        UserId: user.id,
        isHaveKelas: "N"
        // foto: foto,
      }).then(() => {
        req.flash('alertMessage', `Sukses Menambahkan Data Siswa Baru dengan Nama : ${nama} dan NIS: ${nis}`);
        req.flash('alertStatus', 'success');
        res.redirect("/admin/siswa");
      }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect("/admin/siswa");
      });
    }).catch((err) => {
      req.flash('alertMessage', err.message);
      req.flash('alertStatus', 'danger');
      res.redirect("/admin/siswa")
    });
  }
}

exports.actionDetele = (req, res) => {
  let { id } = req.params;
  Siswa.findOne({ where: { id: { [Op.eq]: id } } }).then(async (siswa) => {
    let UserId = siswa.UserId
    const user = await User.findOne({ where: { id: { [Op.eq]: UserId } } })
    user.destroy()
    siswa.destroy().then(() => {
      res.redirect('/admin/siswa');
    })
  }).catch((err) => {
    res.redirect('/admin/siswa');
  });
}

exports.actionFind = (req, res) => {
  const { id } = req.params
  const userLogin = req.session.user;

  Siswa.findOne({
    where: { id: { [Op.eq]: id } }
  }).then((siswa) => {
    res.render('admin/siswa/view_siswa', {
      title: "E-Raport | Siswa",
      user: userLogin,
      siswa: siswa,
      action: "edit"
    })
  }).catch((err) => {
    console.log(err)
    res.redirect('/admin/siswa');
  });
}

exports.actionUpdate = (req, res) => {
  const { id } = req.params
  const {
    nama,
    nisn,
    nis,
    jk,
    tgl_lahir,
    tmpt_lahir,
    agama,
    alamat,
    no_telp,
    asal_sekolah,
    alamat_asal_sekolah,
    diterima_kelas,
    tgl_diterima,
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
    pkj_wali
  } = req.body

  Siswa.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  }).then((siswa) => {
    return siswa.update({
      nama,
      nisn,
      nis,
      jk,
      tgl_lahir,
      tmpt_lahir,
      agama,
      alamat,
      no_telp,
      asal_sekolah,
      alamat_asal_sekolah,
      diterima_kelas,
      tgl_diterima,
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
      pkj_wali
    }).then(() => {
      req.flash('alertMessage', `Sukses Mengubah Data Siswa Baru dengan Nama : ${nama} dan NIS: ${nis}`);
      req.flash('alertStatus', 'success');
      res.redirect("/admin/siswa");
    }).catch((err) => {
      req.flash('alertMessage', err.message);
      req.flash('alertStatus', 'danger');
      res.redirect("/admin/siswa");
    });
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    res.redirect("/admin/siswa");
  });
}
const { kelompok_matpel_guru, Tahun, Kelas, Guru, MataPelajaran } = require("../models");
const Op = require("sequelize").Op;

const include = {
  include: [
    {
      model: Tahun,
      where: {
        status: { [Op.eq]: "Active" }
      }
    },
    { model: Kelas },
    { model: Guru },
    { model: MataPelajaran }
  ]
}

exports.viewSetMatpel = async (req, res) => {
  try {
    const userLogin = req.session.user
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    if (userLogin.role === "admin") {
      const matpel_guru = await kelompok_matpel_guru.findAll({ ...include })
      const guru = await Guru.findAll()
      const kelas = await Kelas.findAll()
      const mata_pelajaran = await MataPelajaran.findAll()
      res.render('admin/set_mata_pelajaran/view_set_mata_pelajaran', {
        title: "E-Rapor | Set Mata Pelajaran",
        user: userLogin,
        matpel_guru: matpel_guru,
        guru,
        kelas,
        mata_pelajaran,
        alert
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
  const { GuruId, MatpelId, KelasId } = req.body
  try {
    const tahun = await Tahun.findOne({ where: { status: { [Op.eq]: "Active" } } })
    const cek_ = await kelompok_matpel_guru.findOne({
      where: {
        // GuruId: { [Op.eq]: GuruId },
        MatpelId: { [Op.eq]: MatpelId },
        KelasId: { [Op.eq]: KelasId },
        TahunId: { [Op.eq]: tahun.id }
      }
    })

    if (cek_) {
      req.flash('alertMessage', `mata pelajaran, sudah ada gurunya. Data tidak masuk..`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/set-matpel');
    } else {
      Tahun.findOne({
        where: {
          status: { [Op.eq]: "Active" }
        }
      }).then((tahun) => {
        if (tahun) {
          kelompok_matpel_guru.create({
            MatpelId,
            KelasId,
            GuruId,
            TahunId: tahun.id
          }).then(() => {
            req.flash('alertMessage', '1 mata pelajaran, success tambah guru.');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/set-matpel');
          }).catch((err) => {
            req.flash('alertMessage', `err.message`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/set-matpel');
          });
        }
      }).catch((err) => {
        req.flash('alertMessage', `err.message`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/set-matpel');
      });
    }
  } catch (error) {
    console.log(err)
  }
}

exports.actionDelete = async (req, res) => {
  const { id } = req.params
  try {
    const matpel = await kelompok_matpel_guru.findOne({ where: { id: { [Op.eq]: id } } })
    if (matpel) {
      matpel.destroy();
      res.redirect('/admin/set-matpel');
    }
  } catch (error) {
    console.log(error)
  }
}
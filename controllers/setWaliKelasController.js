const { Kelas, Guru, kelompok_wali_kelas, Tahun, User } = require("../models");
const Op = require("sequelize").Op;

exports.viewSetWaliKelas = async (req, res) => {
  try {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    const userLogin = req.session.user

    if (userLogin.role === "admin") {
      const kelas = await Kelas.findAll();
      const guru = await Guru.findAll()
      const wali_kelas = await kelompok_wali_kelas.findAll({
        include: [
          { model: Kelas },
          { model: Guru },
          {
            model: Tahun,
            where: {
              status: { [Op.eq]: "Active" }
            }
          },
        ]
      })
      res.render('admin/set_wali_kelas/view_set_wali_kelas', {
        title: "E-Rapor | Set Wali Kelas",
        user: userLogin,
        wali_kelas: wali_kelas,
        kelas: kelas,
        guru: guru,
        alert: alert
      })
    } else {
      req.session.destroy()
      res.redirect('/signin');
    }

  } catch (err) {
    throw err
  }
}


exports.actionCreateWaliKelas = async (req, res) => {
  const { KelasId, GuruId } = req.body
  try {
    const cek_wali_kelas = await kelompok_wali_kelas.findOne({
      where: {
        [Op.or]: [
          { KelasId: { [Op.eq]: KelasId } },
          { GuruId: { [Op.eq]: GuruId } }
        ]
      }
    })

    if (cek_wali_kelas) {
      req.flash('alertMessage', 'Kelas sudah memiliki wali kelas!');
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/set-wali-kelas');
    } else {
      Tahun.findOne({
        where: {
          status: { [Op.eq]: "Active" }
        }
      }).then((tahun) => {
        if (tahun) {
          kelompok_wali_kelas.create({
            KelasId,
            GuruId,
            TahunId: tahun.id
          }).then((guru) => {
            Guru.findOne({
              where: { id: { [Op.eq]: guru.GuruId } }
            }).then((user) => {
              console.log("masuk")
              User.findOne({ where: { id: { [Op.eq]: user.UserId } } }).then((update_user) => {
                if (update_user) {

                  update_user.update({ role: "wali kelas" }).then(() => {
                    req.flash('alertMessage', 'Success Tambah Wali Kelas');
                    req.flash('alertStatus', 'success');
                    res.redirect('/admin/set-wali-kelas');
                  })
                }
              }).catch((err) => {
                req.flash('alertMessage', `err.message`);
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/set-wali-kelas');
              });
            }).catch((err) => {
              req.flash('alertMessage', `err.message`);
              req.flash('alertStatus', 'danger');
              res.redirect('/admin/set-wali-kelas');
            });
          }).catch((err) => {
            req.flash('alertMessage', `err.message`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/set-wali-kelas');
          });
        }
      }).catch((err) => {
        req.flash('alertMessage', `err.message`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/set-wali-kelas');
      });
    }
  } catch (error) {
    console.log(error)
  }
}

exports.actionDetele = async (req, res) => {
  let { id } = req.params;
  const wali_kelas = await kelompok_wali_kelas.findOne({ where: { id: { [Op.eq]: id } } })
  wali_kelas.destroy()
  res.redirect('/admin/set-wali-kelas');
}
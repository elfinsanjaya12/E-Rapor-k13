const { User, Guru } = require("../models");
const bcrypt = require("bcryptjs");
const Op = require("sequelize").Op;

/* GET login page from template adminlte. */
exports.viewSignin = async (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus };
  if (req.session.user == null || req.session.user == undefined) {
    res.render("login", { alert: alert });
  } else {
    res.redirect('/admin')
  }
}

exports.actionLogin = async (req, res) => {

  const { username, password } = req.body;
  let user = await User.findOne({ where: { username: { [Op.eq]: username } } });

  if (user) {
    if (user.status === "Active") {
      const guru = await Guru.findOne({ where: { UserId: { [Op.eq]: user.id } } })
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        req.session.user = {
          id: user.id,
          username: user.username,
          nama: guru === null ? "admin" : guru.nama,
          role: user.role,
          status: user.status
        }

        console.log(user.role + " " + user.status)
        if (user.role === "admin" && user.status === "Active") {
          res.redirect("/admin");
        } else if (user.role === "wali kelas" && user.status === "Active") {
          res.redirect("/wali-kelas");
        } else if (user.role === "siswa" && user.status === "Active") {
          res.redirect("/siswa");
        } else if (user.role === "guru" && user.status === "Active") {
          res.redirect("/guru");
        } else {
          console.log(user.role + " " + user.status)
          req.flash('alertMessage', 'Mohon Maaf Status Anda Belum Aktif!');
          res.redirect("/signin");
          req.flash('alertStatus', 'danger');
        }
      } else {
        req.flash('alertMessage', 'Username dan Password tidak valid!');
        req.flash('alertStatus', 'danger');
        res.redirect("/signin");
      }
    } else {
      req.flash('alertMessage', 'Mohon Maaf Status Anda Belum Aktif!');
      req.flash('alertStatus', 'danger');
      res.redirect("/signin");
    }
  } else {
    req.flash('alertMessage', 'Username dan Password tidak valid');
    req.flash('alertStatus', 'danger');
    res.redirect("/signin");
  }
}

exports.actionLogout = async (req, res) => {
  req.session.destroy()
  res.redirect('/signin');
}
const { User } = require("../models");
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
  const user = await User.findOne({ where: { username: { [Op.eq]: username } } });

  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        status: user.status
      }

      if (user.role === "admin") {
        res.redirect("/admin");
      } else if (user.role === "wali kelas") {
        res.redirect("/wali-kelas");
      } else if (user.role === "siswa") {
        res.redirect("/siswa");
      } else if (user.role === "guru") {
        res.redirect("/guru");
      }
    } else {
      req.flash('alertMessage', 'Mohon Maaf Session Anda Salah Silahkan Login Kembali!');
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
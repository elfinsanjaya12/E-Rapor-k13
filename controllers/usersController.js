const { User } = require("../models");
const bcrypt = require("bcryptjs");
const Op = require("sequelize").Op;

/* GET login page from template adminlte. */
exports.viewSignin = async (req, res) => {
  if (req.session.user == null || req.session.user == undefined) {
    res.render("login", { action: "false" });
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
      } else if (user.role === "guru") {
        res.redirect("/guru");
      } else if (user.role === "siswa") {
        res.redirect("/siswa");
      }
    } else {
      res.redirect("/signin");
    }
  } else {
    res.render("login", { action: "view" });
  }
}

exports.actionLogout = async (req, res) => {
  req.session.destroy()
  res.redirect('/signin');
}
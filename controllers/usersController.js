const { User } = require("../models");
const bcrypt = require("bcrypt");
const Op = require("sequelize").Op;

/* GET login page from template adminlte. */
exports.viewSignin = async (req, res) => {
  res.render("index", { action: "false" });
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
        res.redirect("/siswa");
      } else if (user.role === "siswa") {
        res.redirect("/guru");
      }
    } else {
      res.redirect("/signin");
    }
  } else {
    res.render("login", { action: "view" });
  }
}
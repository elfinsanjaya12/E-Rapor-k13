var express = require('express');
var router = express.Router();
let {
  viewKelas,

} = require("../controllers/kelasController")

const auth = require('../middlewares/auth')

router.get("/admin/kelas", auth.isLogin, viewKelas)


module.exports = router;

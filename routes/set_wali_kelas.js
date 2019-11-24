var express = require('express');
var router = express.Router();
let {
  viewSetWaliKelas
} = require("../controllers/setWaliKelasController")

const auth = require('../middlewares/auth')

router.get("/admin/set-wali-kelas", auth.isLogin, viewSetWaliKelas)


module.exports = router;

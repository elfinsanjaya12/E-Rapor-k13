var express = require('express');
var router = express.Router();
let {
  viewSetWaliKelas,
  actionCreateWaliKelas
} = require("../controllers/setWaliKelasController")

const auth = require('../middlewares/auth')

router.get("/admin/set-wali-kelas", auth.isLogin, viewSetWaliKelas)
router.post("/admin/set-wali-kelas", auth.isLogin, actionCreateWaliKelas)


module.exports = router;

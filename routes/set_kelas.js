var express = require('express');
var router = express.Router();
let {
  viewSetKelas,
  viewAddSetKelas
} = require("../controllers/setKelasController")

const auth = require('../middlewares/auth')

router.get("/admin/set-kelas", auth.isLogin, viewSetKelas)
router.get("/admin/set-kelas/tambah", auth.isLogin, viewAddSetKelas)



module.exports = router;

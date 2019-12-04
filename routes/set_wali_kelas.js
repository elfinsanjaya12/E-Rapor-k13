var express = require('express');
var router = express.Router();
let {
  viewSetWaliKelas,
  actionCreateWaliKelas,
  actionDetele
} = require("../controllers/setWaliKelasController")

const auth = require('../middlewares/auth')

router.get("/admin/set-wali-kelas", auth.isLogin, viewSetWaliKelas)
router.post("/admin/set-wali-kelas", auth.isLogin, actionCreateWaliKelas)
router.get("/admin/set-wali-kelas/delete/:id", actionDetele)


module.exports = router;

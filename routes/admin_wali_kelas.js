var express = require('express');
var router = express.Router();
let {
  viewHome,
  viewMatpelDiampuh,
  viewRiwayatMengajar,
  viewAbsen,
  viewRaport,
  viewNilaiSikap,
  viewNilaiEktra,
  viewValidasiNilai
} = require("../controllers/adminWaliKelasController")

const auth = require('../middlewares/auth')

router.get("/wali-kelas", auth.isLogin, viewHome)
router.get("/wali-kelas/matpel-diampuh", auth.isLogin, viewMatpelDiampuh)
router.get("/wali-kelas/riwayat", auth.isLogin, viewRiwayatMengajar)
router.get("/wali-kelas/input-absen", auth.isLogin, viewAbsen)
router.get("/wali-kelas/raport", auth.isLogin, viewRaport)
router.get("/wali-kelas/input-nilai-sikap", auth.isLogin, viewNilaiSikap)
router.get("/wali-kelas/ekstra", auth.isLogin, viewNilaiEktra)
router.get("/wali-kelas/validasi", auth.isLogin, viewValidasiNilai)


module.exports = router;


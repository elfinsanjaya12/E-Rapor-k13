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
} = require("../controllers/adminGuruController")

const auth = require('../middlewares/auth')

router.get("/guru", auth.isLogin, viewHome)
router.get("/guru/matpel-diampuh", auth.isLogin, viewMatpelDiampuh)
router.get("/guru/riwayat", auth.isLogin, viewRiwayatMengajar)
router.get("/guru/input-absen", auth.isLogin, viewAbsen)
router.get("/guru/raport", auth.isLogin, viewRaport)
router.get("/guru/input-nilai-sikap", auth.isLogin, viewNilaiSikap)
router.get("/guru/ekstra", auth.isLogin, viewNilaiEktra)
router.get("/guru/validasi", auth.isLogin, viewValidasiNilai)


module.exports = router;


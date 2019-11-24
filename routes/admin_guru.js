var express = require('express');
var router = express.Router();
let {
  viewHome,
  viewMatpelDiampuh,
  viewRiwayatMengajar,
  viewAbsen,
  viewRaport
} = require("../controllers/adminGuruController")

const auth = require('../middlewares/auth')

router.get("/guru", auth.isLogin, viewHome)
router.get("/guru/matpel-diampuh", auth.isLogin, viewMatpelDiampuh)
router.get("/guru/riwayat", auth.isLogin, viewRiwayatMengajar)
router.get("/guru/input-absen", auth.isLogin, viewAbsen)
router.get("/guru/raport", auth.isLogin, viewRaport)

module.exports = router;


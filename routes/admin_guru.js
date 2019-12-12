var express = require('express');
var router = express.Router();
let {
  viewHome,
  viewRiwayat,
  viewMatpelDiampuh,
  viewMatpelPengetahuan,
  viewDetailNilai,
  actionCreateNilai,
  actionDeteleNilai,
  viewMatpelKeterampilan,
  viewDetailNilaiKeterampilan,
  actionCreateKeterampilan,
  actionDeteleNilaiKeterampilan
} = require("../controllers/adminGuruController")

const auth = require('../middlewares/auth')
router.use(auth.isLogin);
router.get("/guru", viewHome)
router.get("/guru/riwayat-mengajar", viewRiwayat)
router.get("/guru/matpel", viewMatpelDiampuh)
router.get("/guru/matpel/pengetahuan/:KelasId", viewMatpelPengetahuan)
router.get("/guru/matpel/input-nilai/:SiswaId", viewDetailNilai)
router.post("/guru/matpel/pengetahuan/input-nilai", actionCreateNilai)
router.get("/guru/matpel/pengetahuan/:id/:SiswaId", actionDeteleNilai)

// ========================================================================
router.get("/guru/matpel/keterampilan/:KelasId", viewMatpelKeterampilan)
router.get("/guru/matpel/input-nilai/keterampilan/:SiswaId", viewDetailNilaiKeterampilan)
router.post("/guru/matpel/keterampilan/input-nilai", actionCreateKeterampilan)
router.get("/guru/matpel/keterampilan/:id/:SiswaId", actionDeteleNilaiKeterampilan)


module.exports = router;


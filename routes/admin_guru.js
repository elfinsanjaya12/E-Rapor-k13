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

router.get("/guru/matpel/pengetahuan/:KelasId/:MatpelId", viewMatpelPengetahuan)
// bug 24-12-2019
router.get("/guru/matpel/input-nilai/:SiswaId/matpel/:MatpelId", viewDetailNilai)
router.post("/guru/matpel/pengetahuan/input-nilai", actionCreateNilai)
router.get("/guru/matpel/pengetahuan/:id/delete/:SiswaId", actionDeteleNilai)

// ========================================================================
router.get("/guru/matpel/keterampilan/:KelasId/:MatpelId", viewMatpelKeterampilan)
// bug 24-12-2019
router.get("/guru/matpel/input-nilai/keterampilan/:SiswaId/matpel/:MatpelId", viewDetailNilaiKeterampilan)
router.post("/guru/matpel/keterampilan/input-nilai", actionCreateKeterampilan)
router.get("/guru/matpel/keterampilan/:id/delete/:SiswaId", actionDeteleNilaiKeterampilan)


module.exports = router;


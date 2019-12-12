var express = require('express');
var router = express.Router();
let {
  viewHome,
  viewMatpelDiampuh,
  viewMatpelPengetahuan,
  viewDetailNilai,
  actionCreateNilai,
  actionDeteleNilai,
  viewRiwayatMengajar,
  viewAbsen,
  viewRaport,
  viewNilaiSikap,
  viewNilaiEktra,
  viewValidasiNilai
} = require("../controllers/adminWaliKelasController")

const auth = require('../middlewares/auth')

router.use(auth.isLogin)
router.get("/wali-kelas", viewHome)
router.get("/wali-kelas/matpel-diampuh", viewMatpelDiampuh)
router.get("/wali-kelas/matpel-diampuh/pengetahuan/:KelasId", viewMatpelPengetahuan)
router.get("/wali-kelas/matpel-diampuh/input-nilai/:SiswaId", viewDetailNilai)
router.post("/wali-kelas/matpel-diampuh/pengetahuan/input-nilai", actionCreateNilai)
router.get("/wali-kelas/matpel-diampuh/pengetahuan/:id/:SiswaId", actionDeteleNilai)



router.get("/wali-kelas/riwayat", viewRiwayatMengajar)
router.get("/wali-kelas/input-absen", viewAbsen)
router.get("/wali-kelas/raport", viewRaport)
router.get("/wali-kelas/input-nilai-sikap", viewNilaiSikap)
router.get("/wali-kelas/ekstra", viewNilaiEktra)
router.get("/wali-kelas/validasi", viewValidasiNilai)


module.exports = router;


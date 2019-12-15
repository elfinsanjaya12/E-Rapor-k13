var express = require('express');
var router = express.Router();
let {
  viewHome,
  viewMatpelDiampuh,
  //== input nilai pengetahuan ==\\
  viewMatpelPengetahuan,
  viewDetailNilai,
  actionCreateNilai,
  actionDeteleNilai,
  //== input nilai keterampilan ==\\
  viewMatpelKeterampilan,
  viewDetailNilaiKeterampilan,
  actionCreateNilaiKeterampilan,
  actionDeteleNilaiKeterampilan,
  viewRiwayatMengajar,
  // input nilai absen
  viewAbsen,
  actionCreateNilaiAbsen,
  // input prestasi
  viewPrestasiSiswa,
  actionCreatePrestasi,
  actionDetelePrestasi,
  viewRaport,
  viewNilaiSikap,
  viewNilaiEktra,
  viewValidasiNilai
} = require("../controllers/adminWaliKelasController")

const auth = require('../middlewares/auth')

router.use(auth.isLogin)
router.get("/wali-kelas", viewHome)
router.get("/wali-kelas/matpel-diampuh", viewMatpelDiampuh)
// == input nilai pengetahuan == \\
router.get("/wali-kelas/matpel-diampuh/pengetahuan/:KelasId", viewMatpelPengetahuan)
router.get("/wali-kelas/matpel-diampuh/input-nilai/:SiswaId", viewDetailNilai)
router.post("/wali-kelas/matpel-diampuh/pengetahuan/input-nilai", actionCreateNilai)
router.get("/wali-kelas/matpel-diampuh/pengetahuan/:id/:SiswaId", actionDeteleNilai)
//== input nilai keterampilan ==\\
router.get("/wali-kelas/matpel-diampuh/keterampilan/:KelasId", viewMatpelKeterampilan)
router.get("/wali-kelas/matpel-diampuh/input-nilai/keterampilan/:SiswaId", viewDetailNilaiKeterampilan)
router.post("/wali-kelas/matpel-diampuh/keterampilan/input-nilai", actionCreateNilaiKeterampilan)
router.get("/wali-kelas/matpel-diampuh/keterampilan/:id/:SiswaId", actionDeteleNilaiKeterampilan)
// == input nilai absen == \\
router.get("/wali-kelas/input-absen", viewAbsen)
router.post("/wali-kelas/input-absen", actionCreateNilaiAbsen)
// == input prestasi == \\
router.get("/wali-kelas/prestasi", viewPrestasiSiswa)
router.post("/wali-kelas/prestasi", actionCreatePrestasi)
router.get("/wali-kelas/prestasi/:id", actionDetelePrestasi)



router.get("/wali-kelas/riwayat", viewRiwayatMengajar)
router.get("/wali-kelas/raport", viewRaport)
router.get("/wali-kelas/input-nilai-sikap", viewNilaiSikap)
router.get("/wali-kelas/ekstra", viewNilaiEktra)
router.get("/wali-kelas/validasi", viewValidasiNilai)


module.exports = router;


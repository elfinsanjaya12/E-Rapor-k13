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
  viewCetakRaport,
  // nilai sikap
  viewNilaiSikap,
  actionCreateNilaiSikap,
  viewKelompokSiswaEktra,
  viewNilaiEktra,
  actionCreateEktra,
  // validasi nilai
  viewValidasiNilai,
  // showDetailNilaiMatpel,
  showNilaiKeterampilan,
  showNilaiPengetahuan,
  updateStatusNilaiKeterampilan,
  updateStatusNilaiPengetahuan,
  cetakRaport,
  // biodata 
  viewBiodata,
  actionChangePassword
} = require("../controllers/adminWaliKelasController")

const auth = require('../middlewares/auth')

router.use(auth.isLogin)
router.get("/wali-kelas", viewHome)
router.get("/wali-kelas/matpel-diampuh", viewMatpelDiampuh)
// == input nilai pengetahuan == \\
router.get("/wali-kelas/matpel-diampuh/pengetahuan/:KelasId/:MatpelId", viewMatpelPengetahuan)
router.get("/wali-kelas/matpel-diampuh/input-nilai/:SiswaId/matpel/:MatpelId", viewDetailNilai)
router.post("/wali-kelas/matpel-diampuh/pengetahuan/input-nilai", actionCreateNilai)
router.get("/wali-kelas/matpel-diampuh/pengetahuan/:id/delete/:SiswaId", actionDeteleNilai)
//== input nilai keterampilan ==\\
router.get("/wali-kelas/matpel-diampuh/keterampilan/:KelasId/:MatpelId", viewMatpelKeterampilan)
router.get("/wali-kelas/matpel-diampuh/input-nilai/keterampilan/:SiswaId/matpel/:MatpelId", viewDetailNilaiKeterampilan)
router.post("/wali-kelas/matpel-diampuh/keterampilan/input-nilai", actionCreateNilaiKeterampilan)
router.get("/wali-kelas/matpel-diampuh/keterampilan/:id/delete/:SiswaId", actionDeteleNilaiKeterampilan)
// == input nilai absen == \\
router.get("/wali-kelas/input-absen", viewAbsen)
router.post("/wali-kelas/input-absen", actionCreateNilaiAbsen)
// == input prestasi == \\
router.get("/wali-kelas/prestasi", viewPrestasiSiswa)
router.post("/wali-kelas/prestasi", actionCreatePrestasi)
router.get("/wali-kelas/prestasi/:id", actionDetelePrestasi)

router.get("/wali-kelas/riwayat", viewRiwayatMengajar)
router.get("/wali-kelas/raport", viewCetakRaport)
// == input nilai sikap == \\
router.get("/wali-kelas/input-nilai-sikap", viewNilaiSikap)
router.post("/wali-kelas/input-nilai-sikap", actionCreateNilaiSikap)

router.get("/wali-kelas/ekstra", viewNilaiEktra)
router.get("/wali-kelas/ekstra/json", viewKelompokSiswaEktra)
router.post("/wali-kelas/ekstra", actionCreateEktra)
// == validasi nilai ==\\
router.get("/wali-kelas/validasi", viewValidasiNilai)
// router.get("/wali-kelas/validasi/:MatpelId", showDetailNilaiMatpel)
router.get("/wali-kelas/validasi/show-nilai-keterampilan/:MatpelId", showNilaiKeterampilan)
router.get("/wali-kelas/validasi/show-nilai-pengetahuan/:MatpelId", showNilaiPengetahuan)
router.post("/wali-kelas/validasi/show-nilai-keterampilan/update", updateStatusNilaiKeterampilan)
router.post("/wali-kelas/validasi/show-nilai-pengetahuan/update", updateStatusNilaiPengetahuan)
router.get("/wali-kelas/validasi/cetak-raport/:SiswaId/tahun/:TahunId", cetakRaport)

router.get("/wali-kelas/profile", viewBiodata);
router.post("/wali-kelas/profile/change-password", actionChangePassword)

module.exports = router;



var express = require('express');
var router = express.Router();
let {
  viewHome,
  viewNilai,
  cetakRaport
} = require("../controllers/adminSiswaController")

const auth = require('../middlewares/auth')
router.use(auth.isLogin)
router.get("/siswa", viewHome)
router.get("/siswa/nilai", viewNilai)
router.get("/siswa/nilai/cetak-raport/:SiswaId/tahun/:TahunId", cetakRaport)

module.exports = router;


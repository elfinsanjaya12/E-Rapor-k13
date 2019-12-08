var express = require('express');
var router = express.Router();
let {
  viewSetKelas,
  viewAddSetKelas,
  viewDetailKelasSiswa,
  actionDeteleSiswaKelompok,
  actionAddSiswaInKelas
} = require("../controllers/setKelasController")

const auth = require('../middlewares/auth')

router.use(auth.isLogin)
router.get("/admin/set-kelas", viewSetKelas)
router.get("/admin/set-kelas/tambah", viewAddSetKelas)
router.get("/admin/set-kelas/:id", viewDetailKelasSiswa)
router.get("/admin/set-kelas/:id/detele/:SiswaId/kelas/:KelasId", actionDeteleSiswaKelompok)
router.get("/admin/set-kelas/:KelasId/add-kelompok/:SiswaId", actionAddSiswaInKelas)




module.exports = router;

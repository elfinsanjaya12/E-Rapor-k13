var express = require('express');
var router = express.Router();
let {
  viewSiswa,
  actionCreate,
  actionUpdate,
  actionDetele,
  actionFind
} = require("../controllers/siswaController")

const auth = require('../middlewares/auth')

router.get("/admin/siswa", auth.isLogin, viewSiswa)
router.post("/admin/siswa/create", actionCreate)
router.post("/admin/siswa/update/:id", actionUpdate)
router.get("/admin/siswa/delete/:id", actionDetele)
router.get("/admin/siswa/edit/:id", actionFind)


module.exports = router;

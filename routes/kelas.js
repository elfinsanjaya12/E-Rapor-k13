var express = require('express');
var router = express.Router();
let {
  viewKelas,
  actionCreate,
  actionUpdate
} = require("../controllers/kelasController")

const auth = require('../middlewares/auth')

router.get("/admin/kelas", auth.isLogin, viewKelas)
router.post("/admin/kelas/create", actionCreate)
router.post("/admin/kelas/update", actionUpdate)


module.exports = router;

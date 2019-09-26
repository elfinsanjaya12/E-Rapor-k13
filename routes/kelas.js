var express = require('express');
var router = express.Router();
let {
  viewKelas,
  actionCreate
} = require("../controllers/kelasController")

const auth = require('../middlewares/auth')

router.get("/admin/kelas", auth.isLogin, viewKelas)
router.post("/admin/kelas/create", actionCreate)


module.exports = router;

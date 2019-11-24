var express = require('express');
var router = express.Router();
let {
  viewSetKelas,
} = require("../controllers/setKelasController")

const auth = require('../middlewares/auth')

router.get("/admin/set-kelas", auth.isLogin, viewSetKelas)


module.exports = router;

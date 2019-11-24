var express = require('express');
var router = express.Router();
let {
  viewHome,
  viewNilai
} = require("../controllers/adminSiswaController")

const auth = require('../middlewares/auth')

router.get("/siswa", auth.isLogin, viewHome)
router.get("/siswa/nilai", auth.isLogin, viewNilai)

module.exports = router;


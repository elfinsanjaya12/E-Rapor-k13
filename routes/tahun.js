var express = require('express');
var router = express.Router();
let {
  viewTahun,
} = require("../controllers/tahunController")

const auth = require('../middlewares/auth')


router.get("/admin/tahun", auth.isLogin, viewTahun)

module.exports = router;

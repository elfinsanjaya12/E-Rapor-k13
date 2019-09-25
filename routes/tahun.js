var express = require('express');
var router = express.Router();
let {
  viewTahun,
  actionCreate
} = require("../controllers/tahunController")

const auth = require('../middlewares/auth')


router.get("/admin/tahun", auth.isLogin, viewTahun)
router.post("/admin/tahun/create", actionCreate)

module.exports = router;

var express = require('express');
var router = express.Router();
let {
  viewTahun,
  actionCreate,
  actionUpdateStatusActive,
  actionUpdate
} = require("../controllers/tahunController")

const auth = require('../middlewares/auth')


router.get("/admin/tahun", auth.isLogin, viewTahun)
router.post("/admin/tahun/create", actionCreate)
router.get("/admin/tahun/status/:id", actionUpdateStatusActive)
router.post("/admin/tahun/update", actionUpdate)

module.exports = router;

var express = require('express');
var router = express.Router();
let {
  viewMatPel,
  actionCreate,
  actionUpdate
} = require("../controllers/matpelController")

const auth = require('../middlewares/auth')


router.get("/admin/mata-pelajaran", auth.isLogin, viewMatPel)
router.post("/admin/mata-pelajaran/create", actionCreate)
router.post("/admin/mata-pelajaran/update", actionUpdate)

module.exports = router;

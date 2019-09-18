var express = require('express');
var router = express.Router();
let {
  viewMatPel,
  actionCreate
} = require("../controllers/matpelController")

const auth = require('../middlewares/auth')


router.get("/admin/mata-pelajaran", auth.isLogin, viewMatPel)
router.post("/admin/mata-pelajaran/create", actionCreate)


module.exports = router;

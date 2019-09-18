var express = require('express');
var router = express.Router();
let {
  viewMatPel
} = require("../controllers/matpelController")

const auth = require('../middlewares/auth')


router.get("/admin/mata-pelajaran", auth.isLogin, viewMatPel)


module.exports = router;

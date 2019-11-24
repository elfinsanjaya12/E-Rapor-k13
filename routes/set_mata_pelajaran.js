var express = require('express');
var router = express.Router();
let {
  viewSetMatpel,
} = require("../controllers/setMatpelController")

const auth = require('../middlewares/auth')

router.get("/admin/set-matpel", auth.isLogin, viewSetMatpel)


module.exports = router;

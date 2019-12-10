var express = require('express');
var router = express.Router();
let {
  viewHome,
  viewRiwayat
} = require("../controllers/adminGuruController")

const auth = require('../middlewares/auth')
router.use(auth.isLogin);
router.get("/guru", viewHome)
router.get("/guru/riwayat-mengajar", viewRiwayat)

module.exports = router;


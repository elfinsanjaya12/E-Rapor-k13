var express = require('express');
var router = express.Router();
let {
  viewGuru,
} = require("../controllers/guruController")

router.get("/admin/guru", viewGuru)


module.exports = router;

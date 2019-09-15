var express = require('express');
var router = express.Router();
let {
  viewGuru,
  actionCreate
} = require("../controllers/guruController")

router.get("/admin/guru", viewGuru)
router.post("/admin/guru", actionCreate)


module.exports = router;

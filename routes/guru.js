var express = require('express');
var router = express.Router();
let {
  viewGuru,
  actionCreate,
  actionUpdate,
  actionDetele,
  actionUpdateStatus
} = require("../controllers/guruController")

router.get("/admin/guru", viewGuru)
router.post("/admin/guru", actionCreate)
router.post("/admin/guru/update", actionUpdate)
router.get("/admin/guru/delete/:id", actionDetele)
router.get("/admin/guru/status/:id", actionUpdateStatus)


module.exports = router;

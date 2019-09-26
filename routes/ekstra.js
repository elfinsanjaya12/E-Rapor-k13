var express = require('express');
var router = express.Router();
let {
  viewEkstrakulikuller,
  actionCreate,
  actionUpdate,
  actionDetele
} = require("../controllers/ekstraController")

const auth = require('../middlewares/auth')

router.get("/admin/ekstra", auth.isLogin, viewEkstrakulikuller)
router.post("/admin/ekstra/create", actionCreate)
router.post("/admin/ekstra/update", actionUpdate)
router.get("/admin/ekstra/delete/:id", actionDetele)


module.exports = router;

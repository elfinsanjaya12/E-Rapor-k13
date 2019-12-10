var express = require('express');
var router = express.Router();
let {
  viewSetMatpel,
  actionCreate,
  actionDelete
} = require("../controllers/setMatpelController")

const auth = require('../middlewares/auth')

router.use(auth.isLogin)
router.get("/admin/set-matpel", viewSetMatpel)
router.post("/admin/set-matpel", actionCreate)
router.get("/admin/set-matpel/:id", actionDelete)

module.exports = router;

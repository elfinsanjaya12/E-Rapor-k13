var express = require('express');
var router = express.Router();
let {
  viewSignin,
  actionLogin
} = require("../controllers/usersController")

router.get("/signin", viewSignin)
router.post("/signin", actionLogin)


module.exports = router;

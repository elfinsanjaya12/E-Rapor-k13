var express = require('express');
var router = express.Router();
let {
  viewSignin,
  actionLogin,
  actionLogout
} = require("../controllers/usersController")
const auth = require("../middlewares/auth")
router.get("/signin", viewSignin)
router.post("/signin/action", actionLogin)
router.get("/logout", auth.isLogin, actionLogout)


module.exports = router;

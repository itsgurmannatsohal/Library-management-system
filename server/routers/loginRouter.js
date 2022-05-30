const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController.js");

router.get("/", loginController.viewlogin);
router.post("/", loginController.postlogin);

router.get("/signup", loginController.viewsignup);
router.post("/signup", loginController.postsignup);

router.get("/logout", loginController.logout);

module.exports = router;

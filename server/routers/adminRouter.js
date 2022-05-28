const express = require("express");
const router = express.Router();
const adminBooks = require("../controllers/adminBooks.js");
const adminRequests = require("../controllers/adminrequests.js");
const adminLogin = require("../controllers/adminLogin");

router.get("/", adminLogin.viewlogin);
router.get("/books", adminBooks.viewbooks);
router.get("/books/add", adminBooks.addbooks);
router.get("/requests", adminRequests.viewrequests);

module.exports = router;

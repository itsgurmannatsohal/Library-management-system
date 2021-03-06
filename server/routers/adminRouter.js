const express = require("express");
const router = express.Router();
const adminBooks = require("../controllers/adminBooks.js");
const adminRequests = require("../controllers/adminRequests.js");
const adminLogin = require("../controllers/adminLogin");

router.get("/", adminLogin.viewlogin);
router.post("/", adminLogin.postlogin);

router.get("/books", adminBooks.viewbooks);

router.get("/books/add", adminBooks.viewaddbooks);
router.post("/books/add", adminBooks.addbooks);

router.post("/books/plus", adminBooks.plusbooks);
router.post("/books/minus", adminBooks.minusbooks);

router.get("/requests", adminRequests.viewrequests);
router.post("/requests/accept", adminRequests.accept);
router.post("/requests/deny", adminRequests.deny);

module.exports = router;

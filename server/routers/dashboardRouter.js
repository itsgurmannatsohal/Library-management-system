const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController.js");

router.get("/", dashboardController.viewdashboard);
router.get("/list"), dashboardController.viewlist

module.exports = router;

const express = require("express");
const createCustomTrip = require("../controllers/customTrip");
const router = express.Router();

router.post("/", createCustomTrip);

module.exports = router;
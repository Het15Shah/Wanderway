const express = require("express");
const { checkForAuthentication } = require("../middlewares/auth");
const { cancelTrip, bookTrip, allbookedtrips } = require("../controllers/myTrip");
const router = express.Router();
router.post("/cancel/:id", cancelTrip);

router.post("/book/:tripId", checkForAuthentication, bookTrip);
router.get("/alltrips", checkForAuthentication, allbookedtrips);
module.exports = router;

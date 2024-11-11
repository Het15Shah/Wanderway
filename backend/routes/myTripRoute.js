const express = require('express');
const { checkForAuthentication } = require('../middlewares/auth');
const {cancelTrip , bookTrip} = require('../controllers/myTrip')
const router = express.Router();
router.post('/cancel/:id',cancelTrip);


router.post("/book/:tripId",checkForAuthentication,bookTrip);
module.exports = router;
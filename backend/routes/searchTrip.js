const express = require('express')
const router = express.Router();
const {searchTrip} = require('../controllers/searchTrip.js')


router.get('/',searchTrip);
module.exports = router;

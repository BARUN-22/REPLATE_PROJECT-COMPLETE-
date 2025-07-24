const express = require('express');
const router = express.Router();
const { handleDonation } = require('../controllers/donateController');

router.post("/", handleDonation);

module.exports = router;

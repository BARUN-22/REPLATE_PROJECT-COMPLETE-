const express = require('express');
const router = express.Router();
const { handleDonation } = require('../controllers/donatecontroller');

router.post("/", handleDonation);

module.exports = router;

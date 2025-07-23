const express = require('express');
const router = express.Router();
const Donation = require('../model/Donation');

router.get('/', async (req, res) => {
  try {
    const data = await Donation.aggregate([
      {
        $group: {
          _id: { $substr: ['$pickupDate', 0, 7] }, 
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } 
    ]);

    const formatted = data.map(item => ({
      month: item._id,
      donations: item.total
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Impact fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

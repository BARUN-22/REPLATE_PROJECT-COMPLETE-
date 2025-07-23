const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  pickupDate: String,
  address: String,
  confirmed: Boolean,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);

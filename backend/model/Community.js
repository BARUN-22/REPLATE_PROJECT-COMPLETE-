const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  title: String,
  description: String,
  label: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Community', communitySchema);

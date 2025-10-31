const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Stock ticker is required.'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [/^[A-Z]{1,5}$/, 'Stock ticker must be 1-5 uppercase letters.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Handle duplicate key error for the unique 'name' field
stockSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Stock ticker already exists in the watchlist.'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Stock', stockSchema);

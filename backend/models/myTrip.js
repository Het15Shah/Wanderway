const mongoose = require('mongoose');

const myTripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip', // Reference to the Trip model
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['booked', 'canceled'],
    default: 'booked',
  },
  cancelDate: {
    type: Date,
  },
} ,{timestamps: true});

// Middleware to automatically set cancelDate if the status is changed to 'canceled'
myTripSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'canceled') {
    this.cancelDate = new Date();
  }
  next();
});

const MyTrip = mongoose.model('MyTrip', myTripSchema);
module.exports = MyTrip;
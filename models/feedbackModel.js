const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  comments: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  average_ratings: {
    type: Number,
    min: 0,
    max: 5
  }
}, {
  timestamps: true 
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;

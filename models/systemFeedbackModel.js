
const mongoose = require('mongoose');

const systemFeedbackSchema = new mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: {
    type: String,
    trim: true
  },
  rec_date: {
    type: Date,
    default: Date.now
  }
});

const SystemFeedback = mongoose.model('SystemFeedback', systemFeedbackSchema);

module.exports = SystemFeedback;

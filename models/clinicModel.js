// models/clinic.model.js
const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  clinic_name: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  feedback_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback', // Assuming you have a Feedback model
  },
}, { timestamps: true });

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports =  Clinic;

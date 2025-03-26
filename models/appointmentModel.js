const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true,
  },
  userType: {
    type: String,
    enum: ['Patient', 'Doctor'],
    required: true,
  },
  appointment_date_time: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',
  },
}, { timestamps: true });

// Optional: Add Indexes
appointmentSchema.index({ patient_id: 1, doctor_id: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  appointment_id: {
    type: String,
    unique: true
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true
  },
  appointment_date_time: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Declined'],
    default: 'Pending'
  }
}, { timestamps: true });

// appointmentSchema.index({ clinic_id: 1, appointment_date_time: 1 });

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
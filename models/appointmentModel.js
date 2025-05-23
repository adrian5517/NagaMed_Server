const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  appointment_id: {
  type: String,
  unique: true,
  required: true
},
 patient_name: {
  type: String,
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
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  filled_by: {
    type: String,
    enum: ['self', 'relative'],
    default: 'self'
  }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;

const appointmentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true,
  },
  userType: {
    type: String,
    enum: ['Patient', 'Doctor'],
    default: 'Patient',
  },
  reason: {
    type: String,
    trim: true,
  },
  appointment_date_time: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: 'Appointment date must be in the future.',
    },
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',
  },
}, { timestamps: true });

// Remove any unnecessary indexes
appointmentSchema.index({ appointment_date_time: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;

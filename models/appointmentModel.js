const appointmentSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
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

appointmentSchema.index({ clinic_id: 1, appointment_date_time: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
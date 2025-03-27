const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const appointmentSchema = new mongoose.Schema(
  {
    appointment_id: { type: String, unique: true, required: true, default: uuidv4 },
    patient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    clinic_id: { type: String, required: true },
    appointment_date_time: { type: Date, required: true },
    status: { type: String, required: true, enum: ["Pending", "Confirmed", "Cancelled"] },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;

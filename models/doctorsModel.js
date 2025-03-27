const mongoose = require("mongoose");



const doctorSchema = new mongoose.Schema({
  clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  doctor_name: { type: String, required: true },
  contact_info: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: { type: String, required: true },
  license_number: { type: String, required: true, unique: true },
  feedback_id: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);

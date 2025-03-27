const clinicSchema = new mongoose.Schema({
  clinic_name: { type: String, required: true },
  contact_info: { type: String, required: true },
  address: { type: String, required: true },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    set: (v) => Math.round(v * 10) / 10, // Round to one decimal place
    get: (v) => v.toFixed(1),
  },
  feedback_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
}, { timestamps: true });

const Clinic = mongoose.model('Clinic', clinicSchema);
module.exports = Clinic;
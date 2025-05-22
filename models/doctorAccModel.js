const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorAccSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Name is required"],
    },
   clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: [true , "Clinic Id is Required"] }
    specialization: {
      type: String,
      required: [true, "Specialization is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    address: {
      type: String,
    },
    availability: [
    {
      day: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
    contact: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture: { 
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);



doctorAccSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

doctorAccSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

module.exports  = mongoose.model('DoctorAcc', doctorAccSchema);

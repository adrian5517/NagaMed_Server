const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const doctorAccSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true
    },
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
    contact: {
      type: String,
    },
    date_of_birth: {
      type: Date,
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

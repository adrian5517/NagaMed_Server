const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true }, // Ensure this line exists
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
};

module.exports = mongoose.model('User', userSchema);
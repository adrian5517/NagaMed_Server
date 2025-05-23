const Appointment = require("../models/appointmentModel");
const mongoose = require("mongoose");

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, clinic_id, appointment_date_time, status } = req.body;

    const appointment = new Appointment({
      patient_id,
      doctor_id,
      clinic_id,
      appointment_date_time,
      status
    });

    
    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID." });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointments by Doctor ID
exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid doctor ID." });
    }

    const appointments = await Appointment.find({ doctor_id: id });
    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found for this doctor." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointments by User ID
exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { id } = req.params;  // User ID from params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const appointments = await Appointment.find({ patient_id: id });  // Use userId from params

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found for this user." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment by ID (General Admin/User)
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID." });
    }

    const allowedUpdates = ["status", "appointment_date_time", "notes", "clinic_id"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).json({ message: "Invalid updates!" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment by User ID (User only)
exports.updateAppointmentByUser = async (req, res) => {
  try {
    const { id } = req.params;  // Appointment ID

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID." });
    }

    const allowedUpdates = ["status", "appointment_date_time", "notes", "clinic_id"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).json({ message: "Invalid updates!" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID." });
    }

    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Appointment by User ID (User only)
exports.deleteAppointmentByUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID." });
    }

    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

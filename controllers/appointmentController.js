const Appointment = require("../models/appointmentModel");

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const { appointment_id, patient_id, doctor_id, clinic_id, appointment_date_time, status } = req.body;

    // Check for duplicate appointment_id
    const existingAppointment = await Appointment.findOne({ appointment_id });
    if (existingAppointment) {
      return res.status(400).json({ message: "Appointment ID already exists." });
    }

    const appointment = new Appointment({ appointment_id, patient_id, doctor_id, clinic_id, appointment_date_time, status });
    await appointment.save();

    res.status(201).json({ message: "Appointment created successfully", appointment });
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

// Get Single Appointment
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

// Update Appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID." });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Appointment
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

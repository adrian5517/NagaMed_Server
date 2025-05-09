const Doctor = require("../models/doctorsModel");
const Clinic = require("../models/clinicModel");

// Get all doctors
const getAllDoctors = async (req, res) => {
    console.log("Fetching all doctors...");
    try {
      const doctors = await Doctor.find({});
      console.log("Doctors fetched:", doctors);
      res.json(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  };

// Get a single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data", error });
  }
};

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data", error });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getDoctorsByClinic = async (req, res) => {
  try {
    const clinicId = req.params.clinicId; // Retrieve the clinicId from URL parameter

    // Check if clinic exists
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }

    // Find doctors by clinic_id (ensure the value is properly cast to ObjectId)
    const doctors = await Doctor.find({ clinic_id: mongoose.Types.ObjectId(clinicId) }); // Ensures correct casting

    if (doctors.length === 0) {
      return res.status(404).json({ error: "No doctors available for this clinic." });
    }

    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors by clinic:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    getDoctorsByClinic,
}
const Clinic = require('../models/clinicModel');
const Doctor = require('../models/doctorAccModel');

const getAllClinics = async (req, res) => {
  try {
    const clinic = await Clinic.find().populate('feedback_id');
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id).populate('feedback_id');
    if (!clinic) return res.status(404).json({ error: 'Clinic not found' });
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const createClinic = async (req, res) => {
  try {
    const clinic = new Clinic(req.body);
    await clinic.save();
    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clinic) return res.status(404).json({ error: 'Clinic not found' });
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const deleteClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);
    if (!clinic) return res.status(404).json({ error: 'Clinic not found' });
    res.json({ message: 'Clinic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Doctors by Clinic ID
// Get Doctors by Clinic ID
const getDoctorsByClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ error: 'Clinic not found' });
    }

    // Corrected: Use clinic_id instead of clinicId
    const doctors = await Doctor.find({ clinic_id: clinic._id });

    if (doctors.length === 0) {
      return res.status(404).json({ error: 'No doctors available for this clinic.' });
    }

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    deleteClinic,
    createClinic,
    getClinicById,
    updateClinic,
    getAllClinics,
    getDoctorsByClinic,

}
// routes/clinic.routes.js
const express = require('express');
const {
  getAllClinics,
  getClinicById,
  createClinic,
  updateClinic,
  deleteClinic,
  getDoctorsByClinic
} = require('../controllers/clinicController');

const router = express.Router();

router.get('/', getAllClinics);
router.get('/:id', getClinicById);
router.post('/', createClinic);
router.put('/:id', updateClinic);
router.delete('/:id', deleteClinic);
router.get('/:id/doctor', getDoctorsByClinic);

module.exports = router;

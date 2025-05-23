const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByUser,
  updateAppointmentByUser,
  deleteAppointmentByUser
} = require("../controllers/appointmentController");



const router = express.Router();

// Public or authenticated (create could use auth as well)
router.post("/", createAppointment);

// Get all appointments
router.get("/", getAllAppointments);

// Get appointments for doctor by ID
router.get("/doctorauth/:id", getAppointmentsByDoctorId);

// 🔒 Authenticated user routes
router.get("/user",  getAppointmentsByUser);        
router.put("/user/:id", updateAppointmentByUser);
router.delete("/user/:id", deleteAppointmentByUser); 


// Get, update, delete single appointment by ID (admin/staff/general)
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;

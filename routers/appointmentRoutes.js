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

// Public route to create an appointment
router.post("/", createAppointment);

// Public route to get all appointments
router.get("/", getAllAppointments);

// Get appointments for doctor by ID
router.get("/doctorauth/:id", getAppointmentsByDoctorId);

// Get, update, delete appointments by userId (no authentication required)
router.get("/user/:id", getAppointmentsByUser);
router.put("/user/:id", updateAppointmentByUser);
router.delete("/user/:id", deleteAppointmentByUser);

// Get, update, delete single appointment by appointment ID (admin or general access)
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;

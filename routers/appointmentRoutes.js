const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctorId
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", createAppointment);
router.get('/doctorauth/:id', appointmentController.getAppointmentsByDoctorId);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;

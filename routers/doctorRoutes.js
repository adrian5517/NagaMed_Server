const express = require("express");
const router = express.Router();
const {getAllDoctors , getDoctorById , createDoctor , updateDoctor , deleteDoctor , getDoctorsByClinic} = require("../controllers/doctorController");

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
router.get("/clinic/:clinicId/doctor", getDoctorsByClinic);

module.exports = router;

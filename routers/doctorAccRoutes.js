const doctorController = require('../controllers/doctorAccController');
const router = require("express").Router();

router.post('/signup', doctorController.registerDoctor);
router.post('/signin', doctorController.loginDoctor);
router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);
router.get("/clinic/:clinicId/doctor", doctorController.getDoctorsByClinic);

module.exports = router;

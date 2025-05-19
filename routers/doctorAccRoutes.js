const {registerDoctor,loginDoctor} = require("../controllers/doctorAccController");
const router = require("express").Router();

router.post("/register",registerDoctor);
router.post("/login",loginDoctor);


module.exports = router;

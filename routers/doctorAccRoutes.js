const {registerDoctor,loginDoctor} = require("../controllers/doctorAccController");
const router = require("express").Router();

router.post("/signup",registerDoctor);
router.post("/signin",loginDoctor);


module.exports = router;

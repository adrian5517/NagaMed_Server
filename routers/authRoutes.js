const express = require("express");
const { signup, signin, authMiddleware } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;

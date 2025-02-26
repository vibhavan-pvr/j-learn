const express = require("express");
const { registerInstructor, loginInstructor } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerInstructor);
router.post("/login", loginInstructor);


module.exports = router;

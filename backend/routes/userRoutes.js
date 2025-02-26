const express = require("express");
const { enrollCourse, getCoursesById } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:id/enroll", authMiddleware, enrollCourse); 
router.get("/:id/get-courses-by-id", authMiddleware,getCoursesById)

module.exports = router;

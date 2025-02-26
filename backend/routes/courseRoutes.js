const express = require("express");
const { getAllCourses, addCourse, deleteCourse, deleteAllCourses, getCoursesByCourseId } = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllCourses);
router.post("/", authMiddleware, addCourse);
router.delete("/:id", authMiddleware, deleteCourse);
router.get("/:id", authMiddleware, getCoursesByCourseId);

router.delete("/", authMiddleware, deleteAllCourses);

module.exports = router;

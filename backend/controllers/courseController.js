const Course = require("../models/course");
const Instructor = require("../models/instructor");

// Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a New Course (Instructor Only)
exports.addCourse = async (req, res) => {
  console.log(req.body)
  try {
    const { title, description, instructor,instructor_id, rating, reviewCount, duration, lectures, level, content } = req.body;
    console.log(req.body.data)

    // Check if instructor exists
    const instructorData = await Instructor.findById(instructor_id);
    if (!instructorData) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Create a new course
    const course = new Course({
      title,
      description,
      instructor,
      instructor_id,
      rating,
      reviewCount,
      duration,
      lectures,
      level,
      content
    });

    await course.save();

    // Add course to instructor’s addedCourses list
    instructorData.addedCourses.push(course._id);
    await instructorData.save();

    res.json({ message: "Course added successfully", course });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Delete a Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully", course });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete All Courses
exports.deleteAllCourses = async (req, res) => {
  try {
    const result = await Course.deleteMany({});
    res.json({ message: "All courses deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getCoursesByCourseId = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const User = require("../models/user");
const Instructor = require("../models/instructor");
const Course = require("../models/course");

const jwt = require("jsonwebtoken");


const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

// Admin Login with Hardcoded Credentials
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password)
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });
    const user = {email:ADMIN_EMAIL, password:ADMIN_PASSWORD}
    res.json({ token,user});
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("enrolledCourses", "title description instructor rating reviewcount duration lectures level");
    res.json({ users, count: users.length });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  };

  exports.getInstructor = async (req, res) => {
    try {
      const instructors = await Instructor.find().populate("addedCourses", "title description instructor rating reviewcount duration lectures level");
      res.json({ instructors, count: instructors.length });
    } catch (error) {
      console.error("Error fetching Instructors: ", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
exports.getInstructorByID = async (req, res) => {
  try {
    // Fetch instructor by ID and populate basic course fields
    const instructor = await Instructor.findById(req.params.id)
      .populate("addedCourses", "title description instructor rating reviewcount duration lectures level");
      
    if (!instructor) return res.status(404).json({ error: "Instructor not found" });
      
    // Get the courses of the instructor
    const coursesWithStudents = await Promise.all(
      instructor.addedCourses.map(async (course) => {
        // Fetch the full course with populated students
        const fullCourse = await Course.findById(course._id)
          .populate("students", "_id name email progress enrolledDate");
          
        // Return a new object with all course properties plus populated students
        return {
          ...course.toObject(),
          students: fullCourse.students || []
        };
      })
    );
    
    // Create a modified instructor object with the coursesWithStudents
    const instructorWithCourses = {
      ...instructor.toObject(),
      // Keep the original addedCourses reference
      addedCourses: instructor.addedCourses,
      // Add a new property with fully populated courses including students
      courses: coursesWithStudents
    };
    
    // Return the instructor data
    res.json({ instructor: instructorWithCourses });
  } catch (error) {
    console.error("Error fetching Instructor by ID: ", error);
    res.status(500).json({ error: "Server error" });
  }
};
  
  // Delete a user
  exports.deleteInstructor = async (req, res) => {
      try {
        await Instructor.findByIdAndDelete(req.params.id);
        res.json({ message: "Instructor deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Error deleting Instructor" });
      }
    };
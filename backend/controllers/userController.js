const User = require("../models/user");
const Course = require("../models/course");

exports.enrollCourse = async (req, res) => {
  try {
    const { id } = req.params; // User ID from the request params
    const { courseId } = req.body; // Course ID from the request body

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user is already enrolled in the course
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ error: "User already enrolled in this course" });
    }

    // Add course to the user's enrolledCourses list
    user.enrolledCourses.push(courseId);
    await user.save();

    // Ensure the course has a students array
    if (!course.students) {
      course.students = [];
    }

    // Add the user to the course's students list
    course.students.push(user._id);
    await course.save();

    res.json({ message: "Enrolled successfully", user, course });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// exports.getAllCourses = async(req, res, next) => {
//   try {
//     const courses = await Course.find({});
//     res.status(200).json(courses);
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

exports.getCoursesById = async (req, res, next) => {
    const { id } = req.params;
    const data = await User.findById(id);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    const coursesIds =data.enrolledCourses;
    const courses = await Course.find({ _id: { $in: coursesIds } });
    res.json({ message: "Course found", courses });
  //  res.json({ message: "Course found",coursesIds });

};
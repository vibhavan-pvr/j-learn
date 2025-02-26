const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  
  // Courses added by this instructor
  addedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});


module.exports = mongoose.model("Instructor", InstructorSchema);

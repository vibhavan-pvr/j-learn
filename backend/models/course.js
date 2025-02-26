const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  instructor_id: { type: String, required: false },
  rating: { type: Number, required: true, min: 0, max: 5 },
  reviewCount: { type: Number, required: true, default: 0 },
  duration: { type: String, required: true }, // e.g., "27.5 total hours"
  lectures: { type: String, required: true }, // e.g., "339 lectures"
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "All Levels"], required: true },
  content: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", CourseSchema);

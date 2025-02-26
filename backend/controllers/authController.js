const User = require("../models/user");
const Instructor = require("../models/instructor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ name, email, password: hashedPassword ,enrolledCourses: []});
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};

// Login User
exports.loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// Register Instructor
exports.registerInstructor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the instructor already exists
    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({ error: "Instructor already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new instructor
    const instructor = new Instructor({ name, email, password: hashedPassword, addedCourses: [], students: [] });
    await instructor.save();

    res.json({ message: "Instructor registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Instructor Login
exports.loginInstructor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if instructor exists
    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: instructor._id, role: "instructor" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, instructor });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
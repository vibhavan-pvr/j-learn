const express = require("express");
const { getInstructor, deleteInstructor,getInstructorByID } = require("../controllers/adminController");
const router = express.Router();
router.get("/", getInstructor);
router.get('/:id',getInstructorByID);
router.delete("/:id", deleteInstructor);
module.exports = router;
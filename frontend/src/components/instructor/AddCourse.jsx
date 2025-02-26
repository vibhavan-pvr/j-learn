// src/components/instructor/AddCourse.jsx
import React,{useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddCourse = ({ addCourse, instructor }) => {
    const [selectedInstructor, setSelectedInstructor] = useState(instructor || null);
    const token = localStorage.getItem('token')
    useEffect(()=>{
        handleSubmit();
    },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const courseData = Object.fromEntries(formData);

    // Add instructor ID and name and additional defaults
    courseData.instructor = selectedInstructor ? selectedInstructor.name : "";
    courseData.instructor_id = selectedInstructor ? selectedInstructor._id : "";
    courseData.rating = 0;
    courseData.reviewCount = 0;
    courseData.students = [];
    courseData.content = courseData.description || ""; // Default content to description if not available

    try {
        // Send data to the backend API via POST request
        const response = await axios.post(
          "http://localhost:5000/api/courses", 
          courseData,  // courseData is the data to send in the body
          {
            headers: {
              Authorization: `Bearer ${token}` // Send token in Authorization header
            }
          }
        );
        console.log("Course data successfully posted", response.data);
      if(response.status == 200) {
      Swal.fire({
               title: "Start Learning!",
               text: "Successfully Added to the Course!",
               icon: "success",
             });

      }
        // Optionally handle successful submission (e.g., show a success message)
        e.target.reset(); // Reset form after submission
      } catch (error) {
        console.error("Error posting course data:", error);
      }
      
    }
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
          <input 
            id="title"
            name="title" 
            placeholder="e.g., Advanced Web Development" 
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            id="description"
            name="description" 
            placeholder="Detailed course description..." 
            className="p-3 border border-gray-300 rounded-md w-full h-32 focus:ring-blue-500 focus:border-blue-500" 
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input 
              id="duration"
              name="duration" 
              placeholder="e.g., 20 total hours" 
              className="p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="lectures" className="block text-sm font-medium text-gray-700 mb-1">Number of Lectures</label>
            <input 
              id="lectures"
              name="lectures" 
              placeholder="e.g., 40 lectures" 
              className="p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" 
              required 
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
          <select 
            id="level"
            name="level" 
            className="p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>All Levels</option>
          </select>
        </div>
        
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-150"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
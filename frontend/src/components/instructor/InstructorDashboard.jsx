// src/components/instructor/InstructorDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import AddCourse from "./AddCourse";
import CourseDetails from "./CourseDetails";

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [courses, setCourses] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [students, setStudents] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchInstructorDetails();
  }, []);

  useEffect(() => {
    // Check if the page has already been refreshed during this session
    if (!sessionStorage.getItem('refreshed')) {
      // Set the 'refreshed' flag to true in sessionStorage
      sessionStorage.setItem('refreshed', 'true');
      // Reload the page
      window.location.reload();
    }
  }, []);
  
  useEffect(() => {
    // When instructor data is loaded, get the courses from instructor.addedCourses
    if (instructor && instructor.addedCourses) {
      setCourses(instructor.addedCourses);
      
      // Fetch student details for each course
      instructor.addedCourses.forEach(course => {
        fetchStudentsForCourse(course);
      });
    }
    setLoading(false);
  }, [instructor]);

  const fetchInstructorDetails = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("instructor"));
      if (!userData || !userData._id) {
        console.error("No instructor data found in localStorage");
        navigate("/"); // Redirect to login if no instructor data
        return;
      }
      
      const response = await axios.get(`http://localhost:5000/api/admininstructors/${userData._id}`);
      setInstructor(response.data.instructor);
    } catch (error) {
      console.error("Error fetching instructor details:", error);
      setLoading(false);
    }
  };

  const fetchStudentsForCourse = async (course) => {
    if (!course.students || course.students.length === 0) {
      return;
    }
    
    try {
      // Create a new object to hold student data by courseId
      const courseStudents = [];
      
      // Fetch details for each student in the course
      for (const studentId of course.students) {
        const response = await axios.get(`http://localhost:5000/api/users/${studentId}`);
        if (response.data) {
          courseStudents.push(response.data);
        }
      }
      
      // Update the students state with the fetched data
      setStudents(prev => ({
        ...prev,
        [course._id]: courseStudents
      }));
    } catch (error) {
      console.error(`Error fetching students for course ${course._id}:`, error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Send token in Authorization header
        }
      });
      setCourses(courses.filter(course => course._id !== courseId));
      // Also update the instructor state to reflect the deleted course
      if (instructor) {
        setInstructor({
          ...instructor,
          addedCourses: instructor.addedCourses.filter(course => course._id !== courseId)
        });
      }
      // Clean up students state
      setStudents(prev => {
        const newStudents = {...prev};
        delete newStudents[courseId];
        return newStudents;
      });
      
      if (selectedCourse && selectedCourse._id === courseId) {
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("instructor");
    localStorage.removeItem("token");
    navigate("/");
  };

  const addCourse = async (courseData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/courses", courseData);
      // Update courses state with the new course
      const newCourse = response.data;
      setCourses([...courses, newCourse]);
      
      // Refresh instructor data to get updated addedCourses
      fetchInstructorDetails();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const viewCourseDetails = (course) => {
    setSelectedCourse(course);
    setActiveTab("CourseDetails");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout}
        selectedCourse={selectedCourse}
      />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeTab === "Dashboard" && (
              <Dashboard 
                courses={courses} 
                viewCourseDetails={viewCourseDetails} 
                deleteCourse={deleteCourse} 
              />
            )}

            {activeTab === "Profile" && instructor && (
              <Profile instructor={instructor} />
            )}

            {activeTab === "Add Courses" && (
              <AddCourse addCourse={addCourse} instructor={instructor} />
            )}

            {activeTab === "CourseDetails" && selectedCourse && (
              <CourseDetails 
                selectedCourse={selectedCourse} 
                students={students} 
                setActiveTab={setActiveTab} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
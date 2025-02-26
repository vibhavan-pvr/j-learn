import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBook, FaUser } from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      console.log(storedUser);
  
      if (!storedUser) return;
  
      const userData = JSON.parse(storedUser);
      setUser(userData);
  
      const token = localStorage.getItem('token'); // Get token from localStorage
  
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${userData._id}/get-courses-by-id`,
          {
            headers: {
              Authorization: `Bearer ${token}` // Send token in Authorization header
            }
          }
        );
        setCourses(res.data.courses || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  console.log(courses)
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 text-black p-6 " >
      {/* style={{ backgroundColor: "#fffee9" }} */}
        <h2 className="text-2xl font-bold mb-20">Dashboard</h2>
        {user && (
          <div className="mb-6 flex flex-col items-center gap-5">
            <FaUser className="inline-block mr-2" />
            <h1>UserName</h1>
            <p className="font-semibold text-2xl">{user.name}</p>
            <h1>UserMail Id</h1>
            <p className="text-black text-xl">{user.email}</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Enrolled Courses</h2>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => navigate(`/enrolled-course/${course._id}`)}
              >
                <FaBook className="text-blue-700 text-3xl mb-3" />
                <h3 className="text-xl font-bold text-blue-900">{course.title}</h3>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-gray-600">Rating: {course.rating} ⭐</p>
                <p className="text-gray-600">Duration: {course.duration}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No enrolled courses</p>
        )}
      </main>
    </div>
  );
}
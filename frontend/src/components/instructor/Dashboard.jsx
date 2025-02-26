// src/components/instructor/Dashboard.jsx
import React from "react";

const Dashboard = ({ courses, viewCourseDetails, deleteCourse }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">My Courses</h2>
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{course.level}</span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-gray-500">{course.duration}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{course.lectures}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-700">{course.rating || "N/A"}</span>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {course.students ? course.students.length : 0} Students
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => viewCourseDetails(course)} 
                  className="flex-1 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition duration-150"
                >
                  View Details
                </button>
                <button 
                  onClick={() => deleteCourse(course._id)} 
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition duration-150"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">You haven't added any courses yet.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
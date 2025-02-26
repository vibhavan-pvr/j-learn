// src/components/instructor/Sidebar.jsx
import React from "react";

const Sidebar = ({ activeTab, setActiveTab, handleLogout, selectedCourse }) => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-6">Instructor Panel</h2>
        <ul className="space-y-2">
          {["Dashboard", "Profile", "Add Courses"].map((tab) => (
            <li
              key={tab}
              className={`p-3 rounded-md cursor-pointer transition duration-150 ${
                activeTab === tab ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
          {selectedCourse && (
            <li
              className={`p-3 rounded-md cursor-pointer transition duration-150 ${
                activeTab === "CourseDetails" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("CourseDetails")}
            >
              Course Details
            </li>
          )}
          <li 
            className="p-3 rounded-md cursor-pointer text-red-400 hover:bg-red-800 hover:text-white transition duration-150 mt-8"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
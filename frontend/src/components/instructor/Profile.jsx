// src/components/instructor/Profile.jsx
import React from "react";

const Profile = ({ instructor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Profile</h2>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-32 font-medium text-gray-500">Name:</div>
          <div className="flex-1 text-gray-800 font-semibold">{instructor.name}</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-32 font-medium text-gray-500">Email:</div>
          <div className="flex-1 text-gray-800">{instructor.email}</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-32 font-medium text-gray-500">Courses:</div>
          <div className="flex-1 text-gray-800">{instructor.addedCourses ? instructor.addedCourses.length : 0}</div>
        </div>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-150">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
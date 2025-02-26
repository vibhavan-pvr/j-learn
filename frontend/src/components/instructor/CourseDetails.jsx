// src/components/instructor/CourseDetails.jsx
import React from "react";

const CourseDetails = ({ selectedCourse, students, setActiveTab }) => {
  console.log(students.students)
  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setActiveTab("Dashboard")}
          className="mr-4 text-blue-500 hover:text-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-3xl font-semibold text-gray-800">Course Details</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{selectedCourse.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">{selectedCourse.level}</span>
        </div>
        
        <p className="text-gray-600 mb-6">{selectedCourse.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Duration</div>
            <div className="font-semibold">{selectedCourse.duration}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Total Lectures</div>
            <div className="font-semibold">{selectedCourse.lectures}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Rating</div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">{selectedCourse.rating || "N/A"}</span>
              {selectedCourse.rating && (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Enrolled Students ({selectedCourse.students ? selectedCourse.students.length : 0})</h3>
        
        {selectedCourse.students && selectedCourse.students.length > 0 ? (
          <>
            {students[selectedCourse._id] ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled On</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students[selectedCourse._id].map((student, index) => (
                      <tr key={student._id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{student.name || "Unknown"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email || "Unknown"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.enrolledDate || "Unknown"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${student.progress || 0}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500">{student.progress || 0}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Loading student data...</span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No students enrolled in this course yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Admin components
import AdminPage from "./components/admin/AdminPage";
import AdminUsers from "./components/admin/AdminUsers";
import AdminInstructors from "./components/admin/AdminInstructors";
import AdminCourses from "./components/admin/AdminCourses";
// Instructor components
// Authentication components
import Login from "./components/landing/Login";
import Signup from "./components/landing/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
// User components
import Landing from "./components/landing/Landing";
import Home from "./components/user/Home";
import Dashboard from "./components/user/UserDashboard";
import ShowCourse from "./components/user/ShowCourse";
import CourseDetails from "./components/user/CourseDetails";
import NoPage from "./components/landing/NoPage";
import AboutUs from "./components/user/AboutUs";
import Header from "./components/user/Header";
import InstructorDashboard from "./components/instructor/InstructorDashboard";

// Layout component to include Header for user routes
const UserLayout = ({ children }) => (
  <>
    <Header />
    <div>{children}</div>
  </>
);

function App() {
  // Get the user's role from localStorage
  const userRole = localStorage.getItem('userRole');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - accessible to all */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />

        {/* User routes */}
        {(userRole === 'User' || !userRole) && (
          <>
            <Route path="/home" element={
              <ProtectedRoute element={<UserLayout><Home /></UserLayout>} requiredRole="User" />
            } />
            <Route path="/aboutus" element={
              <ProtectedRoute element={<UserLayout><AboutUs /></UserLayout>} requiredRole="User" />
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute element={<UserLayout><Dashboard /></UserLayout>} requiredRole="User" />
            } />
            <Route path="/courses" element={
              <ProtectedRoute element={<UserLayout><ShowCourse /></UserLayout>} requiredRole="User" />
            } />
            <Route path="/user/courses" element={
              <ProtectedRoute element={<UserLayout><ShowCourse /></UserLayout>} requiredRole="User" />
            } />
            <Route path="/enrolled-course/:id" element={
              <ProtectedRoute element={<UserLayout><CourseDetails /></UserLayout>} requiredRole="User" />
            } />
            <Route path="/course/:id" element={
              <ProtectedRoute element={<UserLayout><ShowCourse /></UserLayout>} requiredRole="User" />
            } />
          </>
        )}

        {/* Admin routes */}
        {(userRole === 'Admin' || !userRole) && (
          <>
            <Route path="/admin" element={
              <ProtectedRoute element={<AdminPage />} requiredRole="Admin" />
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute element={<AdminUsers />} requiredRole="Admin" />
            } />
            <Route path="/admin/instructors" element={
              <ProtectedRoute element={<AdminInstructors />} requiredRole="Admin" />
            } />
            <Route path="/admin/courses" element={
              <ProtectedRoute element={<AdminCourses />} requiredRole="Admin" />
            } />
          </>
        )}

        {/* Instructor routes */}
        {(userRole === 'Instructor' || !userRole) && (
          <>
            <Route path="/instructor" element={
              <ProtectedRoute element={<InstructorDashboard />} requiredRole="Instructor" />
            } />
          </>
        )}

        {/* Handle 404 and redirects */}
        <Route path="*" element={
          userRole === 'User' ? <UserLayout></UserLayout> :
            userRole === 'Admin' ? <Navigate to="/admin" /> :
              userRole === 'Instructor' ? <Navigate to="/instructor" /> :
                <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
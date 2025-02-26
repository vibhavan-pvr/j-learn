import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import { MdComputer } from "react-icons/md";
import { useState } from "react";

const Header = ({ handleLogout: propHandleLogout }) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    console.log("Logout clicked");
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    console.log("Confirm Logout clicked");
    localStorage.removeItem("token");
    setShowLogoutPopup(false);

    if (propHandleLogout) {
      propHandleLogout();
    }

    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <header className="sticky top-0 p-5 shadow-md flex justify-between items-center px-6 md:px-10 bg-yellow-300 w-full z-40">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <MdComputer className="text-black text-3xl md:text-4xl" />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-black">
          J-Learn
        </h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-4 md:space-x-8 text-sm md:text-lg font-medium text-gray-600">
        <Link to="/home" className="hover:text-black transition">Home</Link>
        <Link to="/aboutus" className="hover:text-black transition">About Us</Link>
        <Link to="/courses" className="hover:text-black transition">Courses</Link>

        {/* Dashboard & Logout */}
        <div className="flex space-x-4 md:space-x-8 text-sm md:text-lg font-medium">
          <Link to="/dashboard" className="hover:text-black transition flex items-center space-x-2">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <button onClick={handleLogoutClick} className="hover:text-black transition flex items-center space-x-2">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(true)} className="text-gray-600 text-xl">
          <Menu />
        </button>
      </div>

      {/* Mobile Menu (Full-Screen Overlay) */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-end z-50"
          onClick={() => setMenuOpen(false)} // Close when clicking outside the menu
        >
          <div 
            className="bg-white w-64 h-full shadow-lg p-5 relative z-50"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
          >
            {/* Close Button */}
            <button onClick={() => setMenuOpen(false)} className="text-gray-600 text-xl mb-5">
              ✖
            </button>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4 text-lg font-medium text-gray-600">
              <Link to="/home" onClick={() => setMenuOpen(false)} className="hover:text-black transition">Home</Link>
              <Link to="/aboutus" onClick={() => setMenuOpen(false)} className="hover:text-black transition">About Us</Link>
              <Link to="/courses" onClick={() => setMenuOpen(false)} className="hover:text-black transition">Courses</Link>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-black transition flex items-center space-x-2">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <button onClick={handleLogoutClick} className="hover:text-black transition flex items-center space-x-2">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-72 md:w-96">
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-center space-x-3 md:space-x-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 md:px-5 md:py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 md:px-5 md:py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

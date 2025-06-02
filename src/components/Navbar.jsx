import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import CodeInsightLogo from "./CodeInsightLogo";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/features/user/userSlice"; // Import clearUser action
import api from "../axios/axios.config";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Get user from Redux store
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = !!user; // True if user exists, false if null

  const pages = [
    { name: "Home", path: "/" },
    { name: "Editor", path: "/editor" },
    { name: "Settings", path: "/settings" },
  ];

  const handleAuthClick = async () => {
    try {
      // Make logout API request
      await api.post("/auth/logout");

      // Clear Redux user state
      dispatch(clearUser());

      // Clear localStorage (if used elsewhere)
      localStorage.removeItem("user");

      // Update UI and redirect
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      // Optionally show an error message to the user
      alert("Logout failed. Please try again.");
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-dark-secondary text-white shadow-md relative">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <CodeInsightLogo className="h-12 w-auto" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          {pages.map((page) => (
            <li key={page.name}>
              <Link
                to={page.path}
                className="hover:text-button-primary transition-colors"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Button Desktop */}
        {isAuthenticated ? (
          <div
            className="hidden md:flex items-center space-x-4 text-dark-tertiary hover:text-red-500 transition-colors rounded-xs cursor-pointer"
            onClick={handleAuthClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out mr-2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
            <span>Sign Out</span>
          </div>
        ) : (
          <>
            <Link
              className="bg-button-primary px-4 py-1 mt-1 hover:scale-105 transition-all duration-300 ease-in-out rounded-4xl text-white cursor-pointer"
              to="/login"
            >
              Login
            </Link>
          </>
        )}

        {/* Hamburger Menu */}
        <button
          className="md:hidden focus:outline-none !bg-transparent"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-secondary px-6 pb-4 space-y-4">
          <ul className="flex flex-col space-y-2">
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  to={page.path}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-button-primary transition-colors"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Button Mobile */}
          {isAuthenticated && (
            <div
              className="flex items-center space-x-4 text-dark-tertiary hover:text-red-500 transition-colors rounded-xs cursor-pointer"
              onClick={handleAuthClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out mr-2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

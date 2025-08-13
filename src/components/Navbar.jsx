
// Corrected file: src/components/Navbar.jsx
// This file is updated to trigger the modal instead of navigating to a login page.

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";
import {
  HiOutlineSearch,
  HiOutlineUserCircle,
  HiOutlineMenuAlt4,
  HiX,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useModal } from "../context/ModalContext"; // NEW: Import the modal hook
import AuthForm from "./AuthForm"; // NEW: Import the form to show in the modal

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const { openModal } = useModal(); // NEW: Get the openModal function
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  const profileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: "easeIn" } },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 shadow-sm backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img className="h-30 w-auto" src={Logo} alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="nav-link-desktop">Products</Link>
            <Link to="/solutions" className="nav-link-desktop">Solutions</Link>
            <Link to="/about" className="nav-link-desktop">About Us</Link>
          </div>

          {/* Right Side: Search, Auth, Cart, and Menu */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Search Bar */}
            <div className="relative flex items-center">
              <input type="text" placeholder="Search..." className="hidden md:block w-40 lg:w-56 pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition-all duration-300" />
              <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hidden md:block" />
              <button className="md:hidden text-gray-600 hover:text-indigo-600">
                <HiOutlineSearch className="h-6 w-6" />
              </button>
            </div>

            {/* Smart Cart Link */}
            <Link
              to={user ? "/cart" : "#"}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  openModal(<Modal>
                    <AuthForm />
                  </Modal>
                  );
                }
              }}
              className="relative text-gray-600 hover:text-indigo-600"
            >
              <HiOutlineShoppingCart className="h-6 w-6" />
              <AnimatePresence>
                {user && cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -top-2 -right-2.5 flex items-center justify-center w-5 h-5 bg-indigo-600 text-white text-xs rounded-full"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  <HiOutlineUserCircle className="h-8 w-8 text-gray-600 hover:text-indigo-600 transition-colors" />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div variants={profileMenuVariants} initial="hidden" animate="visible" exit="exit" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-100 py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">Hi, {user.role === 'admin' ? 'Admin' : 'User'}</div>
                      <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} onClick={() => setIsProfileOpen(false)} className="dropdown-link">Dashboard</Link>
                      <button onClick={handleLogout} className="dropdown-link w-full text-left text-red-500">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // NEW: This is now a button that opens the modal
              <button onClick={() => openModal(<AuthForm />)} className="hidden md:block text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                Register / Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-indigo-600">
                {isMenuOpen ? <HiX className="h-7 w-7" /> : <HiOutlineMenuAlt4 className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit" className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Products</Link>
              <Link to="/solutions" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Solutions</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">About Us</Link>
              {!user && (
                <div className="border-t border-gray-200 pt-4">
                  {/* NEW: This button also opens the modal */}
                  <button onClick={() => { openModal(<AuthForm />); setIsMenuOpen(false); }} className="block w-full text-center text-white font-semibold bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-md">
                    Register / Login
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

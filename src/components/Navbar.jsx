import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { HiOutlineMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const solutionsRef = useRef(null); // Ref to detect clicks outside the dropdown

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleSolutionsMenu = () => {
    setIsSolutionsOpen(!isSolutionsOpen);
  };
  
  // Effect to handle clicks outside the solutions dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target)) {
        setIsSolutionsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [solutionsRef]);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-30 w-auto" src={Logo} alt="Nexxa Logo" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:space-x-6">
            {/* Solutions Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                onClick={toggleSolutionsMenu}
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:outline-none"
              >
                Solutions
                <HiChevronDown 
                  className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isSolutionsOpen ? "rotate-180" : ""}`} 
                />
              </button>
              
              {/* Solutions Dropdown Content */}
              {isSolutionsOpen && (
                <div className="absolute left-0 mt-3 w-max max-w-lg bg-white shadow-lg rounded-md border border-gray-100 p-6 flex space-x-8 transition-opacity duration-200">
                  {/* Column 1 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Platform</h3>
                    <ul className="space-y-1">
                      <li>
                        <Link to="/solution/store-builder" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleSolutionsMenu}>
                          Store Builder
                        </Link>
                      </li>
                      <li>
                        <Link to="/solution/payments" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleSolutionsMenu}>
                          Payments
                        </Link>
                      </li>
                      <li>
                        <Link to="/solution/checkout" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleSolutionsMenu}>
                          Checkout
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Features</h3>
                    <ul className="space-y-1">
                      <li>
                        <Link to="/features/marketing" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleSolutionsMenu}>
                          Marketing Tools
                        </Link>
                      </li>
                      <li>
                        <Link to="/features/analytics" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleSolutionsMenu}>
                          Analytics
                        </Link>
                      </li>
                      <li>
                        <Link to="/features/apps" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleSolutionsMenu}>
                          App Integrations
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Column 3 (You can add images or more text here) */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">For Business</h3>
                    <ul className="space-y-1">
                       <li>
                        <Link to="/business/start-up" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleSolutionsMenu}>
                          For Startups
                        </Link>
                      </li>
                      <li>
                        <Link to="/business/enterprises" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleSolutionsMenu}>
                          For Enterprises
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Other Main Navigation Links */}
            <Link
              to="/products"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              About Us
            </Link>
          </div>

          {/* Desktop User Actions (Login/Signup) */}
          <div className="hidden md:ml-6 md:flex md:space-x-4 items-center">
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiOutlineMenuAlt3 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Solutions accordion for mobile */}
          <div>
            <div 
              className="flex justify-between items-center text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleSolutionsMenu}
            >
              Solutions
              <HiChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${isSolutionsOpen ? "rotate-180" : ""}`} />
            </div>
            {isSolutionsOpen && (
              <div className="px-4 py-2 space-y-1 bg-gray-50">
                <Link to="/solution/store-builder" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleMobileMenu}>
                  Store Builder
                </Link>
                <Link to="/solution/payments" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleMobileMenu}>
                  Payments
                </Link>
                <Link to="/solution/checkout" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleMobileMenu}>
                  Checkout
                </Link>
                <Link to="/features/marketing" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleMobileMenu}>
                  Marketing Tools
                </Link>
                <Link to="/features/analytics" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleMobileMenu}>
                  Analytics
                </Link>
                <Link to="/features/apps" className="block text-sm text-gray-700 hover:text-indigo-600" onClick={toggleMobileMenu}>
                  App Integrations
                </Link>
              </div>
            )}
          </div>
          
          <Link
            to="/products"
            className="block text-gray-900 hover:bg-gray-100 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="block text-gray-900 hover:bg-gray-100 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="block text-gray-900 hover:bg-gray-100 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            About Us
          </Link>
          <Link
            to="/login"
            className="mt-4 block text-gray-700 hover:bg-gray-100 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="mt-1 block w-full text-center bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
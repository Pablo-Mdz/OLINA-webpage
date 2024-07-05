import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const NavLink = ({ to, children, extraClasses = '' }) => (
  <Link
    to={to}
    className={`ml-4 text-plum-500 hover:text-gray-300 no-underline ${extraClasses}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children }) => (
  <Link to={to} className="block text-white hover:text-gray-300">
    {children}
  </Link>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);

  return (
    <nav className="bg-blackToPink-500 font-pop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 text-plum-500 font-bold tracking-tight no-underline"
            >
              My Site
            </Link>
            <div className="hidden sm:ml-6 sm:flex">
              <NavLink to="/gallery">Gallery</NavLink>
              <NavLink to="/topics">Topics</NavLink>
              <NavLink to="/word">Dictionary</NavLink>
              <NavLink to="/contact-me">Contact</NavLink>
              <NavLink to="/about">About Me</NavLink>
              {!isLoggedIn && (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/signup">Sign Up</NavLink>
                </>
              )}
              {isLoggedIn && (
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavLink to="/gallery">Gallery</MobileNavLink>
          <MobileNavLink to="/topics">Topics</MobileNavLink>
          <MobileNavLink to="/dictionary">Dictionary</MobileNavLink>
          <MobileNavLink to="/contact-me">Contact</MobileNavLink>
          <MobileNavLink to="/about">About Me</MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

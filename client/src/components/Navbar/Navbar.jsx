import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { SearchContext } from '../../context/search.context';
import OlinaLogo from './OlinaLogo';
import { TbSearch } from 'react-icons/tb';

const NavLink = ({ to, children, extraClasses = '', onClick }) => (
  <Link
    to={to}
    className={`ml-4 text-plum-500 hover:text-blackToPink-200 no-underline ${extraClasses}`}
    onClick={onClick}
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
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };
  // TODO: add  <nav className="bg-blackToPink-500 font-pop rounded-b-3xl">
  return (
    <div className="bg-plum-400">
      <nav className="bg-blackToPink-500 font-pop rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8s ">
          <div className="flex justify-between h-24 w-full">
            <div className="flex justify-around sm:px-40 items-center w-full">
              <div className="hidden sm:flex w-full items-center">
                <Link
                  to="/"
                  className="flex-shrink-0 text-plum-500 font-bold tracking-tight no-underline"
                >
                  <OlinaLogo />
                </Link>
                {/* <NavLink to="/gallery">Gallery</NavLink> */}
                <NavLink to="/posts">Posts</NavLink>
                {/* <NavLink to="/word">Dictionary</NavLink> */}
                <NavLink to="/about">About Me</NavLink>
                <NavLink to="/contact-me">Contact</NavLink>
                {!isLoggedIn && (
                  <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                  </>
                )}
                {isLoggedIn && (
                  <NavLink to="/" onClick={handleLogout}>
                    Logout
                  </NavLink>
                )}
              </div>

              {location.pathname === '/posts' && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbSearch className="text-plum-400" />
                  </div>
                  <input
                    placeholder="Search by keywords..."
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 pl-10 pr-3 text-plum-400 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
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
            {/* <MobileNavLink to="/gallery">Gallery</MobileNavLink> */}
            <MobileNavLink to="/posts">Posts</MobileNavLink>
            {/* <MobileNavLink to="/dictionary">Dictionary</MobileNavLink> */}
            <MobileNavLink to="/contact-me">Contact</MobileNavLink>
            <MobileNavLink to="/about">About Me</MobileNavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

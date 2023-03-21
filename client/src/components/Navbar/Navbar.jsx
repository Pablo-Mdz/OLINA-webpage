// import React from 'react';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 text-white font-bold tracking-tight"
            >
              My Site
            </Link>
            <div className="hidden sm:ml-6 sm:flex">
              <Link
                to="/gallery"
                className="ml-4 text-white hover:text-gray-300"
              >
                Gallery
              </Link>
              <Link
                to="/dictionary"
                className="ml-4 text-white hover:text-gray-300"
              >
                Dictionary
              </Link>
              <Link
                to="/contact"
                className="ml-4 text-white hover:text-gray-300"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="ml-4 text-white hover:text-gray-300"
              >
                About Me
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/*
                Icon when menu is closed.

                Heroicon name: outline/menu

                Menu open: "hidden", Menu closed: "block"
              */}
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
              {/*
                Icon when menu is open.

                Heroicon name: outline/x

                Menu open: "block", Menu closed: "hidden"
              */}
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
      {/*
        Mobile menu, toggle classNamees based on menu state.

        Open: "block", closed: "hidden"
      */}
      <div
    className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link
          to="/gallery"
          className="block text-white hover:text-gray-300"
        >
          Gallery
        </Link>
        <Link
          to="/dictionary"
          className="block text-white hover:text-gray-300"
        >
          Dictionary
        </Link>
        <Link
          to="/contact"
          className="block text-white hover:text-gray-300"
        >
          Contact
        </Link>
        <Link
          to="/about"
          className="block text-white hover:text-gray-300"
        >
          About Me
        </Link>
      </div>
    </div>
  </nav>
);
};

export default Navbar;  
  
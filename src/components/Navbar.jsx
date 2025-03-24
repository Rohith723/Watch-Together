import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; // Importing menu icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo on Left */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.png" // Change this to your actual logo path
            alt="Logo"
            className="h-10 w-10 hover:scale-110 transition-transform duration-300"
          />
          <span className="text-2xl font-bold hover:text-gray-400 transition-colors duration-300">
            WatchTogether
          </span>
        </Link>

        {/* Dropdown Menu on Right */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <FiMenu size={28} className="hover:text-gray-400 transition-colors duration-300" />
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md overflow-hidden">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/watch"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Watch Room
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

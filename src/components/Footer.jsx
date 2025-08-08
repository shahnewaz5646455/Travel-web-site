import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

export default function Footer() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/community", label: "Community" },
    { to: "/packages", label: "Trips" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://i.postimg.cc/ry9ScPS4/6c28868dbe04c7b8edf789f717f92d3d.jpg"
              alt="Wayfind Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
            />
            <h1 className="text-2xl font-bold tracking-tight">Wayfind</h1>
          </div>
          <p className="text-sm text-gray-300 max-w-xs">
            Discover the world with unforgettable adventures tailored just for you.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">
            Explore
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            {navLinks.map((link) => (
              <li key={link.to} className="flex items-center gap-2">
                <FaGlobe className="text-green-400 text-base" />
                <Link
                  to={link.to}
                  className="hover:text-green-400 transition duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-400 text-base" />
              <span>123 Adventure Lane, Travel City</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-400 text-base" />
              <a
                href="mailto:support@wayfind.com"
                className="hover:text-green-400 transition duration-200"
              >
                support@wayfind.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="sm:ml-auto">
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">
            Connect
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition duration-200"
            >
              <FaFacebookF className="text-lg" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition duration-200"
            >
              <FaTwitter className="text-lg" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition duration-200"
            >
              <FaInstagram className="text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Wayfind. All rights reserved.</p>
      </div>
    </footer>
  );
}
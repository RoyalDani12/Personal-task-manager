import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 items-start">

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <Link to="/login" className="hover:text-blue-500 transition">Login</Link>
          <Link to="/register" className="hover:text-blue-500 transition">Register</Link>
          <Link to="/tasks" className="hover:text-blue-500 transition">Tasks</Link>
          <Link to="/profile" className="hover:text-blue-500 transition">Profile</Link>
        </div>

        {/* Hire the developer */}
        <div className="flex flex-col gap-4 items-start">
          <h3 className="font-bold text-lg">Hire the Developer</h3>
          <p>If you like my work, let's collaborate!</p>
          <a
            href="mailto:daniray@example.com"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Hire Me
          </a>
        </div>

        {/* Social icons */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg mb-2">Follow Me</h3>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href="https://t.me/yourtelegram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FontAwesomeIcon icon={faTelegram} size="2x" />
            </a>
            <a
              href="https://github.com/RoyalDani12"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              href="https://instagram.com/yourinstagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>

      </div>

      <hr className="border-gray-300 dark:border-gray-700" />

      <div className="max-w-6xl mx-auto px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} DaniRoyal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
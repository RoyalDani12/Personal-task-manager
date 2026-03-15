import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {

  return (

    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

        {/* Brand Section */}

        <div className="space-y-4">

          <h2 className="text-2xl font-bold text-white">
            DaniRoyal
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            A modern task management platform built with scalable backend and
            clean UI. Designed for productivity, performance and real world
            applications.
          </p>

        </div>


        {/* Quick Links */}

        <div>

          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm">

            <Link to="/login" className="hover:text-indigo-400 transition">
              Login
            </Link>

            <Link to="/register" className="hover:text-indigo-400 transition">
              Register
            </Link>

            <Link to="/tasks" className="hover:text-indigo-400 transition">
              Tasks
            </Link>

            <Link to="/profile" className="hover:text-indigo-400 transition">
              Profile
            </Link>

          </div>

        </div>


        {/* Hire + Social */}

        <div className="space-y-6">

          <div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Work With Me
            </h3>

            <p className="text-sm text-slate-400 mb-4">
              If you like my work, let's build something amazing together.
            </p>

            <a
              href="mailto:daniray@example.com"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-6 py-2 rounded-lg text-white text-sm font-medium"
            >
              Hire Me
            </a>

          </div>


          {/* Social Icons */}

          <div>

            <h3 className="text-lg font-semibold text-white mb-3">
              Follow Me
            </h3>

            <div className="flex gap-4">

              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-indigo-600 transition"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>

              <a
                href="https://t.me/yourtelegram"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-indigo-600 transition"
              >
                <FontAwesomeIcon icon={faTelegram} />
              </a>

              <a
                href="https://github.com/RoyalDani12"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-indigo-600 transition"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>

              <a
                href="https://instagram.com/yourinstagram"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-pink-500 transition"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom */}

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm text-slate-500">

          © {new Date().getFullYear()} DaniRoyal. Built with React & Node.js.

        </div>

      </div>

    </footer>

  )

}

export default Footer
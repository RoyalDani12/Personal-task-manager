import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white font-black px-1.5 py-0.5 rounded-sm text-sm">BY</div>
            <h2 className="text-xl font-black text-black">DaniRoyal<span className="text-gray-600">.</span></h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 max-w-xs">
            High-performance personal task management engine. Engineered for efficiency.
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-black text-black mb-6 text-xl">Platform</h3>
          <nav className="flex flex-col gap-4 text-sm font-semibold">
            {['Login', 'Register', 'Tasks', 'Profile'].map(link => (
              <Link key={link} to={`/${link.toLowerCase()}`} className="hover:text-gray-600 transition-colors">{link}</Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-5 space-y-8">
          <div>
            <h3 className="text-xl font-black text-black mb-6">Collaboration</h3>
            <a
              href="mailto:daniray@example.com"
              className="inline-flex items-center gap-2 bg-black px-8 py-3 rounded-md text-white text-xs font-black hover:bg-gray-800 transition-all"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Hire Me
            </a>
          </div>
          <div className="flex gap-3">
            {[faLinkedin, faTelegram, faGithub, faInstagram].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-lg text-black hover:text-white hover:bg-black transition-all"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 bg-gray-50 py-6 px-8 text-center text-[11px] font-mono text-gray-700">
        <p>&copy; {new Date().getFullYear()} DaniRoyal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
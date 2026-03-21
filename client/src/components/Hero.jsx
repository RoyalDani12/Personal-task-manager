import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-950 min-h-screen flex items-center transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Organize Your Tasks <br /> And Boost Productivity
          </h1>

          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            Manage your daily tasks, track your progress, and stay productive
            with our simple and powerful task management system.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg">
              Get Started
            </button>

            <button className="border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Glow background */}
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
          {/* Image */}
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="task management"
            className="w-full relative z-10"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
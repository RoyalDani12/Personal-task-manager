import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTasks,
  faClock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const slides = [
  {
    img: "https://images.pexels.com/photos/7163362/pexels-photo-7163362.jpeg",
    title: "Organize Your Tasks",
    description: "Manage your daily tasks efficiently and stay productive.",
    icon: faTasks,
  },
  {
    img: "https://images.pexels.com/photos/7668396/pexels-photo-7668396.jpeg",
    title: "Track Your Progress",
    description: "Monitor completed tasks and improve your workflow.",
    icon: faCheckCircle,
  },
  {
    img: "https://images.pexels.com/photos/35719571/pexels-photo-35719571.jpeg",
    title: "Save Your Time",
    description: "Plan smarter and achieve more in less time.",
    icon: faClock,
  },
];

const Hero = () => {
  const [progress, setProgress] = useState(0);

  const handleSlideChange = () => {
    setProgress(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-[80vh] md:min-h-[75vh] flex items-center bg-slate-950">
      <Swiper
        slidesPerView={1}
        loop
        modules={[Autoplay]}
        autoplay={{ delay: 7000 }}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="grid md:grid-cols-2 gap-8 items-center px-6 md:px-16 py-10">

              {/* LEFT CONTENT */}
              <div className="text-white animation-float"> 
                <div className="mb-4 text-indigo-400 text-3xl">
                  <FontAwesomeIcon icon={slide.icon} />
                </div>

                <h1 className="text-3xl md:text-6xl font-extrabold leading-tight mb-4">
                  {slide.title}
                </h1>

                <p className="text-slate-300 text-sm md:text-lg mb-6 max-w-lg">
                  {slide.description}
                </p>

                <div className="flex gap-4 flex-wrap">
                  <Link
                    to="/register"
                    className="bg-indigo-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all"
                  >
                    Get Started
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>

                  <button className="border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"> <Link to={'/login'}>View Tasks</Link>
                    
                  </button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-8 text-sm text-slate-400">
                  <div>
                    <p className="text-white font-bold text-lg">1K+</p>
                    Tasks
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">500+</p>
                    Users
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">99%</p>
                    Efficiency
                  </div>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative w-full h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={slide.img}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition duration-700"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700">
                  <div
                    className="h-1 bg-indigo-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
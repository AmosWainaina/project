'use client';

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Sparkles from "@/components/ui/sparkles";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const images = [
    "/images/hm1.jpg",
    "/images/hm2.jpg",
    "/images/hm3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showJoinForm, setShowJoinForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const contents = [
    (
      <Sparkles className="inline-block">
        <h1 className="py-46 text-4xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
          Pioneering Growth, Crafting Investment Excellence in Africa
        </h1>
      </Sparkles>
    ),
    (
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="py-38 text-5xl sm:text-3xl md:text-4xl lg:text-8xl font-semibold text-orange-600 mb-4"
      >
        Your Gateway to Africa's Golden Future
      </motion.h2>
    ),
    (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="py-42 text-base font-extrabold sm:text-lg md:text-xl lg:text-4xl text-gray-100 mb-6 leading-relaxed"
      >
        At <span className="text-orange-600 font-semibold">Bullione</span>, we don't just invest—we transform potential into prosperity.
        Like the enduring value of bullion, we refine opportunities into tangible wealth.
        With <span className="text-orange-600 font-semibold">cutting-edge AI</span>, 
        <span className="text-orange-600 font-semibold">unwavering integrity</span>, and a deep understanding of Africa's dynamic markets,
        we empower you to unlock the continent's vast economic potential.
      </motion.p>
    ),
  ];

  return (
    <section id="hero" className="relative bg-black overflow-hidden h-[90vh] lg:h-[100vh]">
      {/* Responsive Background Image */}
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex]}
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <div className="w-full px-4">
          {contents[currentIndex]}
          <button
            className="bg-orange-600 text-white px-8 py-4 sm:px-12 sm:py-6 md:px-16 md:py-8 rounded-full font-semibold text-base sm:text-xl md:text-2xl flex items-center mx-auto hover:bg-orange-400 transition-colors duration-300 mt-8"
            onClick={() => setShowJoinForm(true)}
          >
            Join Our Circle
            <ChevronRight className="ml-2 w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Join Form Modal */}
      {showJoinForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl mb-4">Join Our Mailing List</h2>
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-2 mb-4 border rounded" 
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Subscribe
            </button>
            <button 
              className="ml-4 text-red-500"
              onClick={() => setShowJoinForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

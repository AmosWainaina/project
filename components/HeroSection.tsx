"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Sparkles from "@/components/ui/sparkles";
import Image from "next/image";
import emailjs from "emailjs-com";

const HeroSection: React.FC = () => {
  // Wrap images in useMemo to ensure a stable reference
  const images = useMemo(
    () => ["/images/hm1.jpg", "/images/hm2.jpg", "/images/hm3.jpg"],
    []
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showJoinForm, setShowJoinForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  // Define dynamic hero content
  const contents = useMemo(
    () => [
      (
        <Sparkles className="inline-block" key="content1">
          <h1 className="py-46 text-4xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
            Pioneering Growth, Crafting Investment Excellence in Africa
          </h1>
        </Sparkles>
      ),
      (
        <motion.h2
          key="content2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="py-38 text-5xl sm:text-3xl md:text-4xl lg:text-8xl font-semibold text-orange-600 mb-4"
        >
          Your Gateway to Africa&apos;s Golden Future
        </motion.h2>
      ),
      (
        <motion.p
          key="content3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="py-42 text-base font-extrabold sm:text-lg md:text-xl lg:text-4xl text-gray-100 mb-6 leading-relaxed"
        >
          At <span className="text-orange-600 font-semibold">Bullione</span>, we don&apos;t just invest—we transform potential into prosperity.
          Like the enduring value of bullion, we refine opportunities into tangible wealth.
          With <span className="text-orange-600 font-semibold">cutting-edge AI</span>,{" "}
          <span className="text-orange-600 font-semibold">unwavering integrity</span>, and a deep understanding of Africa&apos;s dynamic markets,
          we empower you to unlock the continent&apos;s vast economic potential.
        </motion.p>
      ),
    ],
    []
  );

  // Handle the form submission and send email with EmailJS
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const result = await emailjs.send(
        "service_wua4zu9",   // Replace with your EmailJS service ID
        "template_ddvlyum",  // Replace with your EmailJS template ID
        { email },           // Send the email data
        "LL_UeXslgwKLM98Py"       // Replace with your EmailJS user ID
      );

      console.log('Email sent successfully:', result);
      alert('Thank you for subscribing!');
      setEmail(""); // Clear the email input
      setShowJoinForm(false); // Close the modal
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <section id="hero" className="relative bg-black overflow-hidden h-[90vh] lg:h-[100vh]">
      {/* Optimized Background Image */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex]}
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
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
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="joinFormTitle"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 id="joinFormTitle" className="text-xl mb-4">Join Our Mailing List</h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Subscribe
                </button>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => setShowJoinForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

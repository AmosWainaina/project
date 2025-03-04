'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  resume: File | null;
  linkedIn: string;
  comments: string;
}

const BookACall: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    linkedIn: '',
    comments: '',
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, resume: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Insert your submission logic here
    alert("Thank you! We'll contact you when a suitable opportunity arises.");
  };

  // Framer Motion variants for smooth animations
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-[#333333] flex flex-col items-center justify-center p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold text-orange-500 mb-4 text-center">
        Book a Call with Our Experts
      </motion.h1>
      <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-8 text-center">
        Speak with our experts and get personalized advice on your investment opportunities.
      </motion.p>
      <motion.div variants={itemVariants} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg mb-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-orange-500 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 text-orange-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-orange-500 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 text-orange-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-orange-500 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 text-orange-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-orange-500 font-semibold mb-2">
              Pick a Date
            </label>
            <input
          type="date"
          placeholder="Select Date"
          className="w-full p-3 mb-4 border rounded-lg"
          min={new Date().toISOString().split('T')[0]}
        />
          </div>
          <div>
            <label htmlFor="linkedIn" className="block text-orange-500 font-semibold mb-2">
              LinkedIn Profile (Optional)
            </label>
            <input
              type="url"
              id="linkedIn"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-orange-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="comments" className="block text-orange-500 font-semibold mb-2">
              Additional Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-orange-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition duration-300"
          >
            Submit
          </button>
        </form>
      </motion.div>
      {/* Back Button */}
      <motion.button
        variants={itemVariants}
        onClick={() => router.back()}
        className="w-full max-w-lg py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition duration-300 mb-8"
      >
        Back
      </motion.button>
      <Footer />
    </motion.div>
  );
};

export default BookACall;

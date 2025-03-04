'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';

const CareersPage: React.FC = () => {
    interface FormData {
        fullName: string;
        email: string;
        phone: string;
        linkedIn: string;
        comments: string;
        resume: File | null;
      }
      
      const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        comments: '',
        resume: null,
      });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, resume: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! We will get in touch when a suitable opportunity arises.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-orange-600">
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-center">Careers at Bullione</h1>
        <p className="text-lg mb-8 text-center">Join Our Talent Pool</p>
        <p className="text-gray-300 mb-8 text-center">
          At Bullione, we are always on the lookout for exceptional talent to join our team. While we
          currently do not have any open positions, we welcome you to express your interest by joining
          our waiting list. Once an opportunity arises that matches your skills and experience, we will
          reach out to you.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block mb-2">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Upload CV/Resume</label>
            <input 
              type="file" 
              name="resume" 
              onChange={handleFileChange} 
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">LinkedIn Profile (Optional)</label>
            <input 
              type="url" 
              name="linkedIn" 
              value={formData.linkedIn} 
              onChange={handleChange} 
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Additional Comments</label>
            <textarea 
              name="comments" 
              value={formData.comments} 
              onChange={handleChange} 
              rows={4}
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CareersPage;

'use client';

import React, { useState, useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Footer from '@/components/Footer';

declare global {
  interface Window {
    emailjs: any;
  }
}

const CareersPage: React.FC = () => {
  interface FormData {
    fullName: string;
    email: string;
    phone: string;
    linkedIn: string;
    comments: string;
  }

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    comments: '',
  });
  const [isSending, setIsSending] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/email.min.js';
    script.onload = () => {
      if (window.emailjs) {
        console.log('EmailJS loaded successfully');
        window.emailjs.init('dohXkU4ulaG9D_Sue'); 
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    if (form.current && window.emailjs) {
      window.emailjs.sendForm('service_5aztpv8', 'template_careers', form.current)
        .then((result: any) => {
          alert('Application sent successfully! ✅');
          form.current?.reset();
          setFormData({ fullName: '', email: '', phone: '', linkedIn: '', comments: '' });
        })
        .catch((error: any) => {
          alert('Failed to send application. ❌');
          console.error('EmailJS Error:', error);
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-orange-600">
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-center">Careers at Bullione</h1>
        <p className="text-lg mb-8 text-center">Join Our Talent Pool</p>
        <p className="text-gray-300 mb-8 text-center">
          We’re always looking for exceptional talent. Submit your details, and we’ll reach out when an opportunity arises.
        </p>

        <form ref={form} onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <input type="hidden" name="subject" value="New Career Application" />
          <div className="mb-4">
            <label className="block mb-2">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400" />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400" />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <PhoneInput
              country={'ke'}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phone',
                required: true,
              }}
              containerClass="w-full"
              inputClass="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400"
              buttonClass="bg-gray-700 border-orange-500"
              dropdownClass="bg-gray-800 text-orange-600"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              required
              pattern="https?://(www\.)?linkedin\.com/.*"
              placeholder="https://www.linkedin.com/in/your-profile"
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Additional Comments</label>
            <textarea name="comments" value={formData.comments} onChange={handleChange} rows={4}
              className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400" />
          </div>

          <button type="submit" disabled={isSending}
            className="w-full py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition duration-300">
            {isSending ? 'Sending...' : 'Submit Application'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CareersPage;

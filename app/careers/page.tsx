"use client";

import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

// Extend global window for EmailJS
declare global {
  interface Window {
    emailjs: any;
  }
}

const CareersPage: React.FC = () => {
  // Define form data type
  interface FormData {
    fullName: string;
    email: string;
    phone: string;
    linkedIn: string;
    comments: string;
  }

  // State for form data and sending status
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    comments: "",
  });
  const [isSending, setIsSending] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  // Load EmailJS script and initialize
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.emailjs.com/dist/email.min.js";
    script.onload = () => {
      if (window.emailjs) {
        console.log("EmailJS loaded successfully");
        window.emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
      }
    };
    document.body.appendChild(script);
  }, []);
  

  // Handle text and textarea changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle phone input change
  const handlePhoneChange = (value: string): void => {
    setFormData({ ...formData, phone: value });
  };

  // Handle form submission via EmailJS
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsSending(true);

    if (form.current && window.emailjs) {
      window.emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID!,
        form.current
      )
        .then((result: any) => {
          alert("Application sent successfully! ✅");
          form.current?.reset();
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            linkedIn: "",
            comments: "",
          });
        })
        .catch((error: any) => {
          alert("Failed to send application. ❌");
          console.error("EmailJS Error:", error);
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  return (

    <>
      <Head>
        <title>Careers at Bullione | Join Our Team</title>
        <meta
          name="description"
          content="Join Bullione's talent pool. Apply for exciting career opportunities and be a part of our dynamic team driving Africa's investment potential."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-900 text-orange-600">
        <div className="container mx-auto p-6 flex-grow">
          <h1 className="text-4xl font-bold mb-6 text-center">Careers at Bullione</h1>
          <p className="text-lg mb-8 text-center">Join Our Talent Pool</p>
          <p className="text-gray-300 mb-8 text-center">
            We’re always looking for exceptional talent. Submit your details, and we’ll reach out when an opportunity arises.
          </p>

          <form
            ref={form}
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <input type="hidden" name="subject" value="New Career Application" />
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-orange-500" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-orange-500" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-orange-500">Phone Number</label>
              <PhoneInput
                country={"ke"}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputProps={{ name: "phone", required: true }}
                containerClass="w-full"
                inputClass="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400"
                buttonClass="bg-gray-700 border-orange-500"
                dropdownClass="bg-gray-800 text-orange-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-orange-500" htmlFor="linkedIn">
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedIn"
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
              <label className="block mb-2 font-semibold text-orange-500" htmlFor="comments">
                Additional Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={4}
                value={formData.comments}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-orange-600 border border-orange-500 focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition duration-300"
            >
              {isSending ? "Sending..." : "Submit Application"}
            </button>
            <div className="p-6">
            <button
              onClick={() => router.back()}
              className="bg-orange-600 text-white mb-4 px-4 py-3 rounded mr-4 font-bold hover:bg-orange-500"
            >
              Go Back
            </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
  
};


export default CareersPage;

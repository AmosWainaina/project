'use client';

import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

// Declare emailjs on the window object
declare global {
  interface Window {
    emailjs: any;
  }
}

const FooterSection = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Load EmailJS from CDN
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

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    if (form.current && window.emailjs) {
      window.emailjs.sendForm(
        'service_5aztpv8',
        'template_tuovoht',
        form.current
      )
        .then((result: any) => {
          alert('Message sent successfully! ✅');
          form.current?.reset();
        })
        .catch((error: any) => {
          alert('Failed to send message. ❌');
          console.error('EmailJS Error:', error);
        })
        .finally(() => {
          setIsSending(false);
        });
    } else {
      alert('EmailJS is not loaded properly. ❌');
      setIsSending(false);
    }
  };

  return (
    <footer id="contact" className="bg-orange-600/75 text-white py-10">
      <div className="w-full px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" legacyBehavior>
            <a>
              <img src="/images/logo.png" alt="Bullione Logo" className="h-32 mb-2" />
            </a>
          </Link>
          <p className="text-3xl mb-4">
            <span className="font-bold">Bullione</span> Pioneering Growth, Crafting Investment Excellence in Africa, your Gateway to Africa's Golden Future
          </p>
        </div>

        <div className="md:px-28">
          <h3 className="text-4xl p-5 font-bold mb-4">Links :</h3>
          <ul className="text-3xl">
            <li>
              <Link href="/" legacyBehavior>
                <a className="hover:text-yellow-300">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/#about" legacyBehavior>
                <a className="hover:text-yellow-300">About us</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg w-full">
          <h3 className="text-4xl font-bold mb-4 text-yellow-600">Contact Us</h3>
          <form ref={form} onSubmit={sendEmail} className="mt-6">
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              className="w-full p-3 mb-4 border rounded-lg text-black bg-white"
              required
            />
            <input
              type="email"
              name="to_email"
              placeholder="Recipient's Email"
              className="w-full p-3 mb-4 border rounded-lg text-black bg-white"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 mb-4 border rounded-lg text-black bg-white"
              required
            ></textarea>
            <button
              type="submit"
              className={`bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <span className="text-xl font-bold">Bullione  © {new Date().getFullYear()}. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default FooterSection;

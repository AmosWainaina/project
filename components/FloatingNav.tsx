'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`bg-white shadow-lg p-4 rounded-full flex justify-between items-center mx-4 my-4 transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0 translate-y-[-10px]'}`}>
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Link href="/" legacyBehavior>
          <a>
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              width={150} 
              height={50} 
              className="h-auto w-auto"
            />
          </a>
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="flex items-center md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        {['Home', 'About', 'Services', 'Careers', 'Blog'].map((item) => (
          <li key={item}>
            <Link href={item === 'About' ? '#who-we-are' : item === 'Services' ? '#our-services' : item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} legacyBehavior>
              <a className={`hover:text-yellow-500 transition ${pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'text-yellow-500' : ''}`}>
                {item}
              </a>
            </Link>
          </li>
        ))}
        <div className="flex hover:text-yellow-500 transition">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </ul>

      {/* Mobile Menu (Slide-In) */}
      <div className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg p-6 transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:hidden`}>
        <button className="absolute top-5 right-5 text-gray-700" onClick={() => setMobileOpen(false)}>
          ✖
        </button>
        <ul className="flex flex-col space-y-6 mt-10 text-gray-700 font-medium">
          {['Home', 'About', 'Services', 'Careers', 'Blog', 'Contact'].map((item) => (
            <li key={item} onClick={() => setMobileOpen(false)}>
              <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} legacyBehavior>
                <a className="text-lg hover:text-yellow-500 transition">{item}</a>
              </Link>
            </li>
          ))}
          <div className="flex flex-col space-y-4 mt-6">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </ul>
      </div>

      {/* CTA Button */}
      <div className="hidden md:flex">
        <Link href="/book-a-call" legacyBehavior>
          <a className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-full text-lg hover:bg-yellow-400 transition-transform hover:scale-105">
            <Phone className="icon" />
            Book a Call
          </a>
        </Link>
      </div>
    </nav>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, User } from 'lucide-react';
import { type Metadata } from 'next'
import {  SignInButton, SignedIn,  SignedOut, UserButton } from '@clerk/nextjs'


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
    <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
      <div className="nav-container">
        {/* Desktop Layout: visible on screens 1120px and above */}
        <div className="desktop-nav hidden items-center justify-between px-8 py-4">
          <div className="logo">
            <Link href="/" legacyBehavior>
              <a>
                <Image 
                  src="/images/logo.png" 
                  alt="Logo" 
                  width={340} 
                  height={100} 
                  style={{ height: '100px', width: '340px' }}
                />
              </a>
            </Link>
          </div>
          <ul className="nav-items flex gap-12 list-none m-0 p-0 text-4xl">
            <li>
              <Link href="/" legacyBehavior>
                <a className="text-white hover:text-orange-500 transition-colors">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/#about" legacyBehavior>
                <a className="text-white hover:text-orange-500 transition-colors">About</a>
              </Link>
            </li>
            <li>
              <Link href="/#services" legacyBehavior>
                <a className="text-white hover:text-orange-500 transition-colors">Services</a>
              </Link>
            </li>
            <li>
              <Link href="/careers" legacyBehavior>
                <a className="text-white hover:text-orange-500 transition-colors">Careers</a>
              </Link>
            </li>
            <li>
              <Link href="/blog" legacyBehavior>
                <a className="text-white hover:text-orange-500 transition-colors">Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/#contact" legacyBehavior>
                <a className="text-white hover:text-orange-500 transition-colors">Contact</a>
              </Link>
            </li>
          </ul>
          <div className="action-buttons flex gap-6">
            <Link href="/book-a-call" legacyBehavior>
              <a className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-full text-2xl hover:bg-yellow-400 transition-transform hover:scale-105">
                <Phone className="icon" />
                Book a Call
              </a>
            </Link>
            <div className='flex' text-bold="true">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
          </div>
        </div>

        {/* Mobile Layout: visible on screens below 1120px */}
        <div className="mobile-nav flex items-center justify-between px-4 py-3">
          {/* Left: Logo */}
          <div className="mobile-logo">
            <Link href="/" legacyBehavior>
              <a>
                <Image 
                  src="/images/logo.png" 
                  alt="Logo" 
                  width={300} 
                  height={165} 
                  style={{ height: '56px', width: '180px' }}
                />
              </a>
            </Link>
          </div>
          {/* Right: Buttons */}
          <div className="mobile-actions flex items-center gap-2">
            <Link href="/book-a-call" legacyBehavior>
              <a className="flex items-center gap-1  text-black px-4 py-2 rounded text-xl hover:bg-yellow-400 transition-transform hover:scale-105">
                <Phone className="icon" />
                Book a Call
              </a>
            </Link>
            <div className='flex' text-bold="true">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="hamburger-button bg-orange-500 text-black px-4 py-2 rounded text-2xl hover:bg-yellow-400 transition-transform hover:scale-105"
            >
              ☰
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-menu bg-gray-800 px-4 py-6">
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/" legacyBehavior>
                  <a onClick={() => setMobileOpen(false)} className="text-3xl text-white hover:text-orange-500 transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#about" legacyBehavior>
                  <a onClick={() => setMobileOpen(false)} className="text-3xl text-white hover:text-orange-500 transition-colors">About</a>
                </Link>
              </li>
              <li>
                <Link href="/#services" legacyBehavior>
                  <a onClick={() => setMobileOpen(false)} className="text-3xl text-white hover:text-orange-500 transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/careers" legacyBehavior>
                  <a onClick={() => setMobileOpen(false)} className="text-3xl text-white hover:text-orange-500 transition-colors">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/blog" legacyBehavior>
                  <a onClick={() => setMobileOpen(false)} className="text-3xl text-white hover:text-orange-500 transition-colors">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/#contact" legacyBehavior>
                  <a onClick={() => setMobileOpen(false)} className="text-3xl text-white hover:text-orange-500 transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <style jsx>{`
        nav.navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #333333;
          transition: transform 0.3s ease;
          z-index: 1000;
        }
        nav.navbar.hidden {
          transform: translateY(-100%);
        }
        nav.navbar.visible {
          transform: translateY(0);
        }
        .nav-container {
          display: flex;
          flex-direction: column;
        }
        /* Responsive Breakpoint at 1120px */
        @media (min-width: 1120px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
        @media (max-width: 1119px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}

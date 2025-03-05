'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, User } from 'lucide-react';
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
    <nav className={`bg-white shadow-lg p-4 rounded-full flex justify-between items-center mx-8 my-4 ${visible ? 'visible' : 'hidden'}`}>
      <div className="flex items-center space-x-2">
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
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li><Link href="/" className="hover:text-yellow-500 transition">Home</Link></li>
        <li><Link href="/#about" className="hover:text-yellow-500 transition">About</Link></li>
        <li><Link href="/#services" className="hover:text-yellow-500 transition">Services</Link></li>
        <li><Link href="/careers" className="hover:text-yellow-500 transition">Careers</Link></li>
        <li><Link href="/blog" className="hover:text-yellow-500 transition">Blog</Link></li>
        <li><Link href="/#contact" className="hover:text-yellow-500 transition">Contact</Link></li>
        <div className='flex hover:text-yellow-500 transition'>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </ul>
      <div className="action-buttons flex gap-6">
        <Link href="/book-a-call" legacyBehavior>
          <a className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-full text-2xl hover:bg-yellow-400 transition-transform hover:scale-105">
            <Phone className="icon" />
            Book a Call
          </a>
        </Link>
        
      </div>
    </nav>
  );
}

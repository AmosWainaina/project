"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

// Define your menu items
const menuItems = ["Home", "About", "Services", "Careers", "Blog"];

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  // Helper: Determine link for each menu item
  const getLink = (item: string): string => {
    if (item === "Home") return "/";
    if (item === "About") return "#about";
    if (item === "Services") return "#services";
    return `/${item.toLowerCase()}`;
  };

  // Helper: Check if link is active
  const isActiveLink = (link: string): boolean => pathname.startsWith(link);

  return (
    <div
      className={`bg-white shadow-lg p-4 rounded-full flex justify-between items-center mx-4 my-4 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 translate-y-[-10px]"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src="/images/logo.png"
              alt="Bullione Logo"
              width={150}
              height={50}
              className="h-auto w-auto"
              priority
            />
          </a>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-700 focus:outline-none"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        {menuItems.map((item) => {
          const link = getLink(item);
          return (
            <li key={item}>
              <Link href={link} legacyBehavior>
                <a
                  className={`hover:text-yellow-500 transition ${
                    isActiveLink(link) ? "text-yellow-500" : ""
                  }`}
                >
                  {item}
                </a>
              </Link>
            </li>
          );
        })}
        <li key="auth">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </li>
      </ul>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Slide-In */}
      <div
        className={`fixed top-0 right-0 z-50 w-64 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-hidden={!mobileOpen}
      >
        <button
          className="absolute top-5 right-5 text-gray-700"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          ✖
        </button>
        <ul className="flex flex-col space-y-6 mt-10 text-gray-700 font-medium">
          {menuItems.map((item) => {
            const link = getLink(item);
            return (
              <li key={item}>
                <Link href={link} legacyBehavior>
                  <a
                    className="text-lg hover:text-yellow-500 transition py-2 block"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item}
                  </a>
                </Link>
              </li>
            );
          })}
          <li key="auth-mobile">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </div>

      {/* CTA Button (Desktop) */}
      <div className="hidden md:flex">
        <Link href="/book-a-call" legacyBehavior>
          <a className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-full text-lg hover:bg-yellow-400 transition-transform hover:scale-105">
            <Phone className="icon" />
            Book a Call
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

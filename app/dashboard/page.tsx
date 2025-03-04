"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null; // Prevent rendering until redirect happens
  }

  return (
    <div className="min-h-screen pb-16 flex flex-col bg-[#302e2e] text-[#cf9338]">
      <FloatingNav />
      <div className="flex-grow container pb-14 mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mt-34 text-4xl sm:text-4xl md:text-6xl font-bold mb-6">
            Welcome, {user?.firstName}! 👋
          </h1>
          <h2 className="text-4xl sm:text-4xl md:text-6xl font-bold mb-6">
            Bullione – Your Gateway to Smart Investments in Africa
          </h2>
          <p className="text-2xl sm:text-3xl mb-6">
            🚧 Exciting Changes Ahead! 🚧
          </p>
          <p className="text-lg sm:text-xl mb-6">
            We're building something amazing! Our Client Portal is currently under construction to bring you a seamless, secure, and enhanced investment experience.
          </p>
          <p className="text-lg sm:text-xl mb-6">
            Stay tuned as we refine every detail to serve you better.
          </p>
          <p className="text-lg sm:text-xl">
            For any inquiries, reach us via{' '}
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

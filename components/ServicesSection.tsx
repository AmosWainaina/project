'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CardProps {
  title: string;
  content: React.ReactNode;
  fullContent: React.ReactNode;
}

const serviceIcons: { [key: string]: string } = {
  "EPC & Infrastructure Solutions": "🏗️",
  "Direct Investments & Foreign Direct Investments": "📈",
  "Precious Metals Investments": "💰",
  "Government & Private Sector Projects": "🏛️",
  "Mergers & Acquisitions": "🤝",
  "Real Estate Investment Advisory": "🏢",
  "Offshore Fiduciary Services": "🌐",
  "Healthcare and Pharmaceutical Solutions": "⚕️", 
  "Market Intelligence, Franchising and Licensing": "📊", 
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  const router = useRouter();

  const handleReadMore = () => {
    // Redirect to details page with the title as a query parameter.
    router.push(`/card-details?title=${encodeURIComponent(title)}`);
  };

  const icon = serviceIcons[title] || '';

  return (
    <div
      className="card bg-black/5 backdrop-blur-lg rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          {icon && <span className="text-4xl">{icon}</span>}
          <h2 className="text-2xl font-bold text-orange-600">{title}</h2>
        </div>
        <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {content}
        </div>
      </div>
      <button
        onClick={handleReadMore}
        className="mt-4 bg-orange-600 text-black px-4 py-2 rounded font-bold hover:bg-orange-600 transition-colors"
      >
        Read More
      </button>
    </div>
  );
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 relative bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl text-orange-600 font-bold text-center mb-12">
          Our Services
        </h2>
        <div className="text-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="EPC & Infrastructure Solutions"
            content={
              <p>
                Build the Foundations of Africa’s Future.
                <br />
                From Roads to Renewable Energy – A Full Turnkey Approach.
              </p>
            }
            fullContent={<>Full content for EPC & Infrastructure Solutions.</>}
          />
          <Card
            title="Direct Investments & Foreign Direct Investments"
            content={<p>Unlock Africa’s Most Lucrative Investment Opportunities with Bullione.</p>}
            fullContent={<>Full content for Direct Investments & Foreign Direct Investments.</>}
          />
          <Card
            title="Precious Metals Investments"
            content={<p>Unlock Africa’s Wealth with Bullione.</p>}
            fullContent={<>Full content for Precious Metals Investments.</>}
          />
          <Card
            title="Government & Private Sector Projects"
            content={<p>Drive Impact, Reap Rewards.</p>}
            fullContent={<>Full content for Government & Private Sector Projects.</>}
          />
          <Card
            title="Mergers & Acquisitions"
            content={<p>Empowering Your African Business Ventures.</p>}
            fullContent={<>Full content for Mergers & Acquisitions.</>}
          />
          <Card
            title="Real Estate Investment Advisory"
            content={<p>Get a Piece of Africa’s Thriving Real Estate Market!</p>}
            fullContent={<>Full content for Real Estate Investment Advisory.</>}
          />
          <Card
            title="Offshore Fiduciary Services"
            content={<p>Secure Your Wealth, Globally and Discreetly.</p>}
            fullContent={<>Full content for Offshore Fiduciary Services.</>}
          />
          <Card
            title="Healthcare and Pharmaceutical Solutions"
            content={<p>Your Gateway to Thriving Healthcare Investments in Africa.</p>}
            fullContent={<>Full content for Healthcare and Pharmaceutical Solutions.</>}
          />
          <Card
            title="Market Intelligence, Franchising and Licensing"
            content={<p>From Insightsto Infrastructure-Powering Your Future</p>}
            fullContent={<>Market Intelligence, Franchising and Licensing</>}
          />
        </div>
      </div>
      <style jsx>{`
        /* Responsive adjustments for card padding on small screens */
        @media (max-width: 640px) {
          .card {
            padding: 16px !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { FaSearch, FaBuilding, FaTruck, FaShieldAlt, FaHandshake } from "react-icons/fa";


interface CardDetails {
  title: string;
  fullContent: React.ReactNode;
  images: string[];
}

const BulletCard: React.FC<{ icon: React.ReactNode; text: React.ReactNode }> = ({ icon, text }) => {
  return (
    <div className="border border-yellow-500 p-4 flex flex-col items-center justify-center">
      <div className="mb-2">{icon}</div>
      <p className="text-center text-sm text-gray-300">{text}</p>
    </div>
  );
};


const IconMagnify = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m2.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconGroup = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 110-8 4 4 0 010 8z" />
  </svg>
);

const IconChecklist = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconCurrency = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8" />
  </svg>
);

const IconPencil = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const IconCart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293a1 1 0 00-.207.707V19a1 1 0 001 1h1a1 1 0 001-1v-2"
    />
  </svg>
);

const IconBuilding = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M9 3v18M15 3v18" />
  </svg>
);

const IconWrench = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317a4.5 4.5 0 016.364 6.364L12 17.364l-4.689-4.689a4.5 4.5 0 010-6.364z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h6" />
  </svg>
);

const IconBarChart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4v11H3zM10 4h4v17h-4zM17 14h4v7h-4z" />
  </svg>
);

const IconGear = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317a4.5 4.5 0 006.364 6.364l1.33 1.33a2 2 0 11-2.828 2.828l-1.33-1.33a4.5 4.5 0 01-6.364-6.364z" />
  </svg>
);

const IconShield = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2l7 4v6c0 5.52-4.48 10-10 10S2 17.52 2 12V6l10-4z"
    />
  </svg>
);

const IconRocket = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-32 w-32 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l13-2-2 13-6 6-5-4z" />
  </svg>
);


const cardDetailsMapping: { [key: string]: CardDetails } = {
  // 1. EPC & Infrastructure Solutions (already has icons inline)
  "EPC & Infrastructure Solutions": {
    title: "EPC & Infrastructure Solutions",
    images: ["/images/epc1.jpg", "/images/epc2.jpg", "/images/epc3.jpg"],
    fullContent: (
      <>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          At Bullione, we provide a full turnkey solution for investors, contractors, and project developers, ensuring seamless execution of high-value infrastructure projects across West Africa, East Africa, Southern Africa, Central Africa, and North Africa.
        </p>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          We specialize in transportation, energy, water, telecommunications, and urban development, bridging the gap between global investors, contractors, and African project owners for sustainable and profitable investments.
        </p>
        <p className="font-bold text-5xl text-orange-600 my-4">Our Full Turnkey Approach</p>
        <div className="grid grid-cols-2 gap-4">
          <BulletCard
            icon={IconMagnify}
            text={
              <span className="text-3xl">
                Market Research & Feasibility – Identify high-potential projects and conduct in-depth studies.
              </span>
            }
          />
          <BulletCard
            icon={IconGroup}
            text={
              <span className="text-2xl">
                Investor & Developer Matching – Connect investors with vetted project owners.
              </span>
            }
          />
          <BulletCard
            icon={IconChecklist}
            text={
              <span className="text-2xl">
                Due Diligence & Structuring – Assess legal, financial, and technical viability.
              </span>
            }
          />
          <BulletCard
            icon={IconCurrency}
            text={
              <span className="text-2xl">
                Project Financing & Capital Raising – Facilitate funding through diverse solutions.
              </span>
            }
          />
          <BulletCard
            icon={IconPencil}
            text={
              <span className="text-2xl">
                Design & Engineering – Manage design, permitting, and technical planning.
              </span>
            }
          />
          <BulletCard
            icon={IconCart}
            text={
              <span className="text-2xl">
                Procurement & Contracting – Source quality materials and secure contractors.
              </span>
            }
          />
          <BulletCard
            icon={IconBuilding}
            text={
              <span className="text-2xl">
                Construction & Implementation – Oversee execution with quality and compliance.
              </span>
            }
          />
          <BulletCard
            icon={IconWrench}
            text={
              <span className="text-2xl">
                Operations & Maintenance – Provide post-construction management.
              </span>
            }
          />
          <BulletCard
            icon={IconBarChart}
            text={
              <span className="text-2xl">
                Monitoring & Impact Assessment – Measure success and ensure ESG compliance.
              </span>
            }
          />
        </div>

        <p className="font-bold text-5xl text-orange-600 my-4">Why Bullione?</p>
        <ul className="pl-5 space-y-2 text-3xl text-gray-300 border-l-4 border-orange-500 pl-4">
          <li> End-to-End Solutions – We handle everything from ideation to management.</li>
          <li> Pan-African Reach – Extensive networks across Africa’s key hubs.</li>
          <li> Strategic Partnerships – Access to top-tier investors and developers.</li>
          <li> Sustainable &amp; Profitable – Focus on high-impact, profitable infrastructure.</li>
        </ul>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          Transforming Africa’s Infrastructure – One Project at a Time.
        </p>
      </>
    ),
  },

  // 2. Direct Investments & Foreign Direct Investments
  "Direct Investments & Foreign Direct Investments": {
    title: "Direct Investments & Foreign Direct Investments",
    images: ["/images/direct1.jpg", "/images/direct2.jpg", "/images/direct3.jpg"],
    fullContent: (
      <>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          At Bullione, we help high-net-worth individuals and businesses access Africa’s most promising investment opportunities.
        </p>
        <p className="font-bold text-5xl text-orange-600 my-4">Our Approach</p>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          We combine deep market insights, AI-driven analytics, and strategic partnerships to identify and unlock high-growth opportunities across various sectors.
        </p>
        <p className="font-bold text-5xl text-orange-600 my-4">Our Roadmap to Your Investment Success</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <BulletCard
            icon={IconMagnify}
            text={
              <span className="text-2xl">
                Market Research & Feasibility – Identify high-potential projects and conduct in-depth studies.
              </span>
            }
          />
          <BulletCard
            icon={IconGroup}
            text={
              <span className="text-2xl">
                Investor & Developer Matching – Connect investors with vetted project owners.
              </span>
            }
          />
          <BulletCard
            icon={IconChecklist}
            text={
              <span className="text-2xl">
                Due Diligence & Structuring – Assess legal, financial, and technical viability.
              </span>
            }
          />
          <BulletCard
            icon={IconCurrency}
            text={
              <span className="text-2xl">
                Project Financing & Capital Raising – Facilitate funding through diverse solutions.
              </span>
            }
          
          />
          <BulletCard
            icon={IconPencil}
            text={
              <span className="text-2xl">
                Design & Engineering – Manage design, permitting, and technical planning.
              </span>
            }
          />
          <BulletCard
            icon={IconCart}
            text={
              <span className="text-2xl">
                Procurement & Contracting – Source quality materials and secure contractors.
              </span>
            }
          />
          <BulletCard
            icon={IconBuilding}
            text={
              <span className="text-2xl">
                Construction & Implementation – Oversee execution with quality and compliance.
              </span>
            }
          />
          <BulletCard
            icon={IconWrench}
            text={
              <span className="text-2xl">
                Operations & Maintenance – Provide post-construction management.
              </span>
            }
          />
          <BulletCard
            icon={IconBarChart}
            text={
              <span className="text-2xl">
                Monitoring & Impact Assessment – Measure success and ensure ESG compliance.
              </span>
            }
          />
        </div>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          Whether you&apos;re an individual investor or organization, Bullione is your trusted partner in unlocking Africa’s investment potential.
        </p>
      </>
    ),
  },

  // 3. Precious Metals Investments
  "Precious Metals Investments": {
    title: "Precious Metals Investments",
    images: ["/images/precious1.jpg", "/images/precious2.jpg", "/images/precious3.jpg"],
    fullContent: (
      <>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          At Bullione, we help foreign investors mint their share of Africa’s vast precious metals—from gold and diamonds to copper and beyond.
        </p>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          We eliminate risks from complex procedures and rogue agents by handling sourcing, export, and delivery along with value-added services such as insurance and regulatory navigation.
        </p>
        <p className="font-bold text-5xl text-orange-600 my-4">Our Approach</p>
        <div className="grid grid-cols-2 gap-4">
          <BulletCard
            icon={IconMagnify}
            text={
              <span className="text-2xl">
                Sourcing & Due Diligence – Identify authentic, high-quality precious metals.
              </span>
            }
          />
          <BulletCard
            icon={IconShield}
            text={
              <span className="text-2xl">
                Seamless Transactions – Negotiate and secure assets with compliance.
              </span>
            }
          />
          <BulletCard
            icon={IconGear}
            text={
              <span className="text-2xl">
                Risk Mitigation & Security – Vet suppliers and provide insurance options.
              </span>
            }
          />
          <BulletCard
            icon={IconBarChart}
            text={
              <span className="text-2xl">
                Value Addition & Delivery – Ensure secure transport and added services.
              </span>
            }
          />
          <BulletCard
            icon={IconRocket}
            text={
              <span className="text-2xl">
                Ongoing Support – Advisory services, market insights, and investment structuring.
              </span>
            }
          />
        </div>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          With Bullione, you own a share of Africa’s thriving mineral wealth with certainty.
        </p>
      </>
    ),
  },

  // 4. Government & Private Sector Projects
  "Government & Private Sector Projects": {
    title: "Government & Private Sector Projects",
    images: ["/images/gov1.jpg", "/images/gov2.jpg", "/images/gov3.jpg"],
    fullContent: (
      <>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          At Bullione, we help clients access both government and non-government projects for financing and execution of impactful initiatives that drive economic transformation.
        </p>
        <p className="font-bold text-5xl text-orange-600 my-4">Our Approach</p>
        <div className="grid grid-cols-2 gap-4">
          <BulletCard
            icon={IconMagnify}
            text={
              <span className="text-2xl">
                Strategic Market Insights – Research to identify high-potential opportunities.
              </span>
            }
          />
          <BulletCard
            icon={IconShield}
            text={
              <span className="text-2xl">
                Regulatory & Compliance Support – Navigate legal frameworks for approvals.
              </span>
            }
          />
          <BulletCard
            icon={IconGear}
            text={
              <span className="text-2xl">
                Financing Facilitation – Connect investors with funding sources.
              </span>
            }
          />
          <BulletCard
            icon={IconRocket}
            text={
              <span className="text-2xl">
                Partnerships & Networking – Leverage relationships with key stakeholders.
              </span>
            }
          />
          <BulletCard
            icon={IconBarChart}
            text={
              <span className="text-2xl">
                Bid & Tender Support – Guide through the tender process.
              </span>
            }
          />
          <BulletCard
            icon={IconGear}
            text={
              <span className="text-2xl">
                Project Execution & Monitoring – Coordinate for effective implementation.
              </span>
            }
          />
        </div>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          Bullione empowers investors to navigate Africa’s dynamic landscape, securing transformative investments.
        </p>
      </>
    ),
  },

  // 5. Mergers & Acquisitions
  "Mergers & Acquisitions": {
    title: "Mergers & Acquisitions",
    images: ["/images/ma1.jpg", "/images/ma2.jpg", "/images/ma3.jpg"],
    fullContent: (
      <>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          We specialize in assisting foreign businesses and individuals to acquire and merge with leading African enterprises. Our expertise facilitates seamless expansions, restructuring, and high-value acquisitions.
        </p>
        <p className="font-bold text-5xl text-orange-600 my-4">Our Approach</p>
        <div className="grid grid-cols-2 gap-4">
          <BulletCard
            icon={IconMagnify}
            text={
              <span className="text-2xl">
                In-depth Market Research – Evaluate trends, conditions, and regulatory environments.
              </span>
            }
          />
          <BulletCard
            icon={IconGear}
            text={
              <span className="text-2xl">
                Strategic Target Identification – Pinpoint prospects aligned with your goals.
              </span>
            }
          />
          <BulletCard
            icon={IconShield}
            text={
              <span className="text-2xl">
                Thorough Due Diligence – Assess financials, legal standings, and operational metrics.
              </span>
            }
          />
          <BulletCard
            icon={IconBarChart}
            text={
              <span className="text-2xl">
                Customized Deal Structuring – Craft bespoke deals to maximize value while mitigating risks.
              </span>
            }
          />
          <BulletCard
            icon={IconRocket}
            text={
              <span className="text-2xl">
                Expert Negotiation – Guide through every stage of the negotiation process.
              </span>
            }
          />
          <BulletCard
            icon={IconGear}
            text={
              <span className="text-2xl">
                Post-Acquisition Integration – Provide robust support for integration and restructuring.
              </span>
            }
          />
        </div>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          By combining deep insights with a global perspective, we create a seamless pathway for your expansion into Africa.
        </p>
      </>
    ),
  },

  // 6. Real Estate Investment Advisory
  "Real Estate Investment Advisory": {
    title: "Real Estate Investment Advisory",
    images: ["/images/realestate1.jpg", "/images/realestate2.jpg", "/images/realestate3.jpg"],
    fullContent: (
      <>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          At Bullione, we help investors navigate Africa’s real estate landscape with expert guidance on property investments, asset management, and value appreciation.
        </p>
        <p className="font-bold text-5xl text-orange-600 my-4">Our Approach:</p>
        <div className="grid grid-cols-2 gap-4">
          <BulletCard
            icon={IconMagnify}
            text={
              <span className="text-2xl">
                Residential & Vacation Homes – Invest in luxury residences or serene getaways.
              </span>
            }
          />
          <BulletCard
            icon={IconShield}
            text={
              <span className="text-2xl">
                Commercial & Rental Properties – Maximize returns with strategically located assets.
              </span>
            }
          />
          <BulletCard
            icon={IconGear}
            text={
              <span className="text-2xl">
                Market Insights – Data-driven analysis and legal support for secure investments.
              </span>
            }
          />
          <BulletCard
            icon={IconBarChart}
            text={
              <span className="text-2xl">
                End-to-End Management – Enhance and manage your property portfolio.
              </span>
            }
          />
          <BulletCard
            icon={IconRocket}
            text={
              <span className="text-2xl">
                Government & Private Sector Access – Unlock exclusive opportunities.
              </span>
            }
          />
        </div>
      </>
    ),
  },

  // 7. Offshore Fiduciary Services
  "Offshore Fiduciary Services": {
    title: "Offshore Fiduciary Services",
    images: ["/images/offshore1.jpg", "/images/offshore2.jpg", "/images/offshore3.jpg"],
    fullContent: (
      <>
        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
          At Bullione Offshore, we specialize in discreet, compliant, and strategic fiduciary solutions for high-net-worth individuals, family offices, and global businesses.
        </p>
        <p className="font-bold text-5xl text-orange-600 my-4">Our Approach:</p>
        <div className="grid grid-cols-2 gap-4">
          <BulletCard
            icon={IconGear}
            text={
              <span className="text-2xl">
                Tailored Solutions – Craft bespoke offshore structures for wealth preservation.
              </span>
            }
          />
          <BulletCard
            icon={IconShield}
            text={
              <span className="text-2xl">
                Regulatory Compliance – Adhere to global financial standards.
              </span>
            }
          />
          <BulletCard
            icon={IconMagnify}
            text={
              <span className="text-2xl">
                Confidentiality & Security – Safeguard your investments.
              </span>
            }
          />
          <BulletCard
            icon={IconBarChart}
            text={
              <span className="text-2xl">
                Seamless Cross-Border Investments – Expand your portfolio with confidence.
              </span>
            }
          />
          <BulletCard
            icon={IconRocket}
            text={
              <span className="text-2xl">
                Integrated AI-Driven Insights – Enhance decision-making with advanced tech.
              </span>
            }
          />
        </div>
      </>
    ),
  },
  // 8.  Healthcare and Pharmaceutical Solutions
  
"Healthcare and Pharmaceutical Solutions": {
  title: "Healthcare and Pharmaceutical Solutions",
  images: ["/images/Healthcare1.jpg", "/images/Healthcare2.jpg"],
  fullContent: (
    <>
      <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
        At Bullione, we empower foreign investors and businesses to capitalize on Africa’s rapidly 
        growing healthcare and pharmaceutical sector. Our end-to-end solutions ensure seamless 
        market entry, regulatory compliance, and efficient operations for sustainable success.
      </p>
      <p className="font-bold text-5xl text-orange-600 my-4">Our Solutions Include:</p>
      <div className="grid grid-cols-2 gap-4">

        <BulletCard 
          icon={IconMagnify}
          text={
            <span className="text-2xl">
              <strong>Market-Driven Data Insights</strong> – Leverage in-depth analytics to make informed 
              investment decisions.
            </span>
          }
        />

        <BulletCard 
          icon={IconBuilding} 
          text={
            <span className="text-2xl">
              <strong>Business Setup & Expansion</strong> – Establish and scale operations with ease.
            </span>
          }
        />

        <BulletCard 
          icon={IconChecklist}
          text={
            <span className="text-2xl">
              <strong>Turnkey Supply Chain Solutions</strong> – From procurement to distribution, 
              we streamline the entire supply chain.
            </span>
          }
        />

        <BulletCard 
          icon={IconRocket}
          text={
            <span className="text-2xl">
              <strong>Regulatory & Compliance Support</strong> – Navigate licensing, approvals, 
              and legal frameworks.
            </span>
          }
        />

        <BulletCard 
          icon={IconGroup} 
          text={
            <span className="text-2xl">
              <strong>Strategic Partnerships & Tenders</strong> – Connect with key industry players 
              and access high-value opportunities.
            </span>
          }
        />

      </div>
      
        <p className="font-bold text-5xl text-orange-600 my-4">Our Approach:</p>
        <div>
        <BulletCard  
          text={<span className="text-2xl">
            <strong>Tailored Investment Strategies</strong> – We Provide customized investment plans
            aligned with your goals and risk appetite.
          </span>} icon={undefined}        />

             <BulletCard  
          text={<span className="text-2xl">
            <strong>End-to-End Support</strong> – From market entry to full-scale operations,
            We guide you every step of the way.
          </span>} icon={undefined}        />

             <BulletCard  
          text={<span className="text-2xl">
            <strong>AI-Driven Market Analysis</strong> – We Leverage cutting-edge technologyto identify
            the most lucrative opportunities.
          </span>} icon={undefined}        />

             <BulletCard  
          text={<span className="text-2xl">
            <strong>Local Expertise & Global Networks</strong> – Our deep understanding of African markets
            coupled with strong international partnerships, ensures your success.
          </span>} icon={undefined}        />

             <BulletCard  
          text={<span className="text-2xl">
            <strong>Sustainability & Impact-Driven Solutions</strong> – We focus on investments that create long-term
            value while driving positive change in healthcare access and quality.
          </span>} icon={undefined}        />
        </div>

        <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
        At Bullione, we combine deep market expertise with innovative investment strategies to help
        you unlock the full potential of Africa’s healthcare and pharmaceutical sector.
      </p>

      <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
      <strong>Partner with us and invest with confidence</strong>
      </p>
    </>
  ),
 },
 // 9.  Market Intelligence.
 "Market Intelligence, Franchising and Licensing": {
  title: "Market Intelligence, Franchising and Licensing",
  images: ["/images/Market1", "/images/Market2.jpg"],
  fullContent: (
    <>
      <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
        From Insights to Infrastructure – Powering Your Future.
      </p>
      <p className="text-xl text-gray-200 my-4">
        At Bullione, we provide investors with Market Intelligence, Franchising & Licensing, and ICT &
        Data Center Development solutions to unlock Africa’s vast investment potential.
      </p>

      <p className="font-bold text-5xl text-orange-600 my-4">Market Intelligence</p>
      <BulletCard 
        text={<span className="text-2xl">
          Our AI-driven Market Intelligence service offers real-time insights, risk assessments, and
          strategic guidance on investment opportunities across Africa. By combining cutting-edge data
          analytics with on-the-ground research, we empower investors to make informed, profitable, and
          risk-mitigated decisions.
        </span>} icon={undefined}      />

      <p className="font-bold text-5xl text-orange-600 my-4">Franchising & Licensing</p>
      <BulletCard 
        text={<span className="text-2xl">
          We assist foreign investors and businesses in developing and implementing franchise and
          licensing models tailored to Africa’s diverse economic landscapes. Our expertise ensures that
          your expansion strategy aligns with local consumer behavior, regulatory frameworks, and
          market dynamics, setting you up for long-term success.
        </span>} icon={undefined}      />

      <p className="font-bold text-5xl text-orange-600 my-4">ICT & Data Center Development</p>
      <BulletCard 
        text={<span className="text-2xl">
          By 2040, Africa’s population is projected to surpass China’s, driving an unprecedented demand
          for digital infrastructure. Bullione helps investors and institutions tap into this high-growth
          market by providing end-to-end services for seamless market entry, project development, and
          operational success in ICT and data center investments.
        </span>} icon={undefined}      />
        <p className="font-bold text-5xl text-orange-600 my-4">Our Approach</p>
      <BulletCard text={<span className="text-2xl"><strong>Deep Market Research</strong> – AI-powered insights and local expertise to identify opportunities.</span>} icon={undefined} />
      <BulletCard text={<span className="text-2xl"><strong>Tailored Investment Strategies</strong> – Custom roadmaps ensuring alignment with market dynamics.</span>} icon={undefined} />
      <BulletCard text={<span className="text-2xl"><strong>Regulatory Compliance & Risk Management</strong> – Smooth investment journey navigation.</span>} icon={undefined} />
      <BulletCard text={<span className="text-2xl"><strong>End-to-End Support</strong> – From research to execution & operational success.</span>} icon={undefined} />
      <BulletCard text={<span className="text-2xl"><strong>Impact-Driven Investments</strong> – Economic value & sustainable development.</span>} icon={undefined} />

      <p className="font-bold text-5xl text-orange-600 my-4">Why Choose Bullione?</p>
      <BulletCard text={<span className="text-2xl"><strong>End-to-End Solutions</strong> – From research to project implementation.</span>} icon={undefined} />
      <BulletCard text={<span className="text-2xl"><strong>AI-Powered Insights</strong> – Smart, data-driven strategies.</span>} icon={undefined} />
      <BulletCard text={<span className="text-2xl"><strong>Local Expertise & Global Reach</strong> – Connecting international investors with Africa’s opportunities.</span>} icon={undefined} />
      <BulletCard text={<span className="text-2xl"><strong>Regulatory & Compliance Support</strong> – Ensuring risk-free operations.</span>} icon={undefined} />

      <p className="text-3xl text-gray-300 my-4 border-l-4 border-orange-500 pl-4">
        Partner with Bullione to turn insights into impact and vision into value in Africa’s booming 
        investment landscape.
      </p>
      
    </>
  ),
},
 
   
};

const AfricanImageSlider: React.FC<{ images: string[]; title: string }> = ({
  images,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-[45vh] sm:h-[60vh] lg:h-[80vh]">
      <img
        src={images[currentIndex]}
        alt={title}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 text-center px-4">
          {title}
        </h1>
      </div>
    </div>
  );
};

const CardDetailsContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const details = cardDetailsMapping[title];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#333333", color: "#FFA500" }}>
      {details && (
        <AfricanImageSlider images={details.images} title={details.title} />
      )}
      <div className="flex-grow p-6">
        {details ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6">{details.fullContent}</div>
            <button onClick={() => router.back()} className="bg-yellow-600 text-black px-4 py-2 rounded mr-4 font-bold">
              Go Back
            </button>
            <button onClick={() => (window.location.href = "/#contact")} className="bg-yellow-600 text-black px-4 py-2 rounded font-bold">
              Contact Us
            </button>
          </motion.div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Card Details Not Found</h1>
            <button onClick={() => router.back()} className="bg-yellow-600 text-black px-4 py-2 rounded font-bold">
              Go Back
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

// Wrap with Suspense to avoid build error
const CardDetailsPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading card details...</div>}>
      <CardDetailsContent />
    </Suspense>
  );
};


export default CardDetailsPage;

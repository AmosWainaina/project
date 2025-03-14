"use client";

import React from "react";
import Head from "next/head";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define a Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
}

// Testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Tremblay J.",
    title: "Private Investor (USA)",
    quote:
      "Bullione transformed my African gold investments into a seamless, high-yield portfolio. Their expertise in sourcing secure opportunities and their unwavering end-to-end support instilled absolute confidence. A must-partner for investors prioritizing both growth and reliability.",
  },
  {
    id: 2,
    name: "Sarah L.",
    title: "CEO – Of a Global Trading Firm (UK)",
    quote:
      "Africa’s investment landscape demands precision—Bullione delivered. Their unrivaled market insights, local partnerships, and ability to secure premium copper and diamond deals not only met but surpassed our strategic goals. A trusted ally for high-stakes ventures.",
  },
  {
    id: 3,
    name: "Ahmed K.",
    title: "Venture Capitalist (UAE)",
    quote:
      "Bullione’s private equity team unlocked Africa’s most innovative fintech and agribusiness ventures for us. Their rigorous due diligence, risk mitigation strategies, and hands-on guidance turned complex markets into profitable, low-friction opportunities.",
  },
  {
    id: 4,
    name: "Elena R.",
    title: "Project Developer (Germany)",
    quote:
      "Bullione bridged the gap between vision and execution. Their access to lucrative government-backed infrastructure projects, coupled with streamlined financing solutions, empowered us to deliver a $50M development ahead of schedule. Expertise that delivers results.",
  },
  {
    id: 5,
    name: "David O.",
    title: "Wealth Manager (Canada)",
    quote:
      "Bullione’s AI-powered market intelligence redefined how we approach African investments. Their bespoke strategies pinpointed high-growth opportunities with optimal returns and minimized risk—proof that innovation and profitability go hand in hand.",
  },
  {
    id: 6,
    name: "Pierre D.",
    title: "Institutional Investor (France)",
    quote:
      "Bullione’s structured investment solutions gave us a clear path to high returns in Africa’s natural resource sector. Their transparent process and due diligence set them apart from other firms we’ve worked with.",
  },
  {
    id: 7,
    name: "Natasha B.",
    title: "Angel Investor (Australia)",
    quote:
      "Investing in African startups felt risky at first, but Bullione’s expertise in private equity made all the difference. They connected us with innovative e-commerce and healthtech startups that are already showing impressive growth.",
  },
  {
    id: 8,
    name: "Rajesh P.",
    title: "Mining & Commodities Trader (India)",
    quote:
      "We’ve worked with many firms in the commodities sector, but Bullione stands out with their ability to secure legitimate and high-value gold and diamond deals. Their professionalism and efficiency make them our preferred partner.",
  },
  {
    id: 9,
    name: "William T.",
    title: "CEO – Renewable Energy Firm (USA)",
    quote:
      "Bullione helped us enter the African market by securing key government contracts for our renewable energy projects. Their strategic insights and network have been instrumental in our expansion.",
  },
  {
    id: 10,
    name: "Fatima S.",
    title: "Executive Director – Impact Investment Fund (South Africa)",
    quote:
      "Bullione aligns perfectly with our mission of driving economic transformation in Africa. Their focus on high-impact startups in fintech, agribusiness, and eco-solutions ensures that our investments not only generate returns but also create real change.",
  },
  {
    id: 11,
    name: "Carlos M.",
    title: "Infrastructure Consultant (Spain)",
    quote:
      "Accessing government projects in Africa can be challenging, but Bullione simplified the process for us. Thanks to their connections and guidance, we successfully secured funding and executed a large-scale infrastructure development.",
  },
  {
    id: 12,
    name: "Emily C.",
    title: "CFO – Global Fintech Firm (Singapore)",
    quote:
      "Bullione’s AI-driven investment solutions provided us with unmatched data insights and risk assessments, helping us make informed decisions in Africa’s fintech space. Their team is truly ahead of the curve.",
  },
  {
    id: 13,
    name: "Mohammed R.",
    title: "High-Net-Worth Investor (Qatar)",
    quote:
      "What impressed me most about Bullione was their ability to tailor investment opportunities specifically to my financial goals. They don’t just find investments—they find the right investments.",
  },
  {
    id: 14,
    name: "Thomas L.",
    title: "CEO – Private Equity Firm (Switzerland)",
    quote:
      "Bullione’s private equity division introduced us to some of the most promising startups in Africa. Their deep market understanding and meticulous due diligence process gave us confidence in every deal.",
  },
  {
    id: 15,
    name: "Vanessa J.",
    title: "Director – International Development Firm (Netherlands)",
    quote:
      "Partnering with Bullione has been a game-changer for our projects in Africa. Their expertise in navigating government tenders and securing proper on-ground partners helped us launch impactful initiatives with long-term success.",
  },
];

const TestimonialsSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <>
      <Head>
        <title>Testimonials | Bullione</title>
        <meta
          name="description"
          content="Discover what our clients have to say about partnering with Bullione."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section
        id="testimonials"
        className="py-24 bg-orange-600/70 to-transparent text-white"
      >
        <div className="container mx-auto px-8">
          <h2 className="text-6xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`p-8 border border-orange-100/20 rounded-lg ${
                  index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
                }`}
              >
                <div>
                  <p className="text-2xl italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <h3 className="text-4xl font-semibold text-orange-600">
                    {testimonial.name}
                  </h3>
                  <p className="text-3xl text-gray-100">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSlider;

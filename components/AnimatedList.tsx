"use client";

import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const AnimatedList = () => {
  const listItems = [
    "End-to-End Solutions – We handle everything from ideation to management.",
    "Pan-African Reach – Extensive networks across Africa’s key hubs.",
    "Strategic Partnerships – Access to top-tier investors and developers.",
    "Sustainable & Profitable – Focus on high-impact, profitable infrastructure."
  ];

  return (
    <ul className="pl-8 space-y-4 text-3xl text-gray-300 border-l-4 border-none pl-4">
      {listItems.map((item, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, color: "#FFA500" }}
          className="cursor-pointer"
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
};

export default AnimatedList;

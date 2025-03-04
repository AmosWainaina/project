"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface SparklesProps {
  children: React.ReactNode;
  className?: string;
}

const Sparkles: React.FC<SparklesProps> = ({ children, className = "" }) => {
  const [sparkles, setSparkles] = useState<any[]>([]);

  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

  const generateSparkle = useCallback(() => {
    return {
      id: `sparkle-${Date.now()}-${random(0, 1000000)}`,
      createdAt: Date.now(),
      color: `hsl(${random(20, 30)}, ${random(80, 100)}%, 50%)`,
      size: random(10, 20),
      style: {
        top: random(0, 100) + '%',
        left: random(0, 100) + '%',
        zIndex: 2
      }
    };
  }, []);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      const now = Date.now();
      const sparkle = generateSparkle();
      setSparkles(prevSparkles => {
        const newSparkles = [...prevSparkles, sparkle]
          .filter(sp => now - sp.createdAt < 750);
        return newSparkles;
      });
    }, 250);

    return () => clearInterval(sparkleInterval);
  }, [generateSparkle]);

  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.span
            key={sparkle.id}
            className="absolute inline-block"
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ scale: 1, rotate: 180, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.75 }}
            style={sparkle.style}
          >
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                fill={sparkle.color}
              />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
      {children}
    </span>
  );
};

export default Sparkles;

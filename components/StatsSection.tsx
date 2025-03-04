'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { TrendingUp, Users, Award } from "lucide-react";

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  title: string;
  icon: React.ElementType;
  suffix?: string;
}

const AnimatedCounter = ({
  value,
  duration = 1.5,
  title,
  icon: Icon,
  suffix = "+",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      // Extract numeric part from the value (e.g. "23M" becomes 23)
      const end = parseInt(value.toString().replace(/[^0-9]/g, ""));
      // Adjust increment time (you can tweak duration as needed)
      const incrementTime = (duration * 1000) / (end || 1);

      const counter = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(counter);
      }, incrementTime);

      return () => clearInterval(counter);
    }
  }, [value, duration, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative p-8 bg-black text-orange-500 rounded-2xl shadow-lg hover:shadow-orange-500/50 transition-shadow duration-300 flex flex-col items-center text-center group border border-orange-400"
    >
      <div className="absolute -top-6 bg-orange-500 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-black" />
      </div>
      <h3 className="mt-8 text-4xl font-bold mb-2">
        {typeof value === "number"
          ? `${count}${suffix}`
          : `${count}${value.toString().replace(/[0-9]/g, "")}${suffix}`}
      </h3>
      <p className="text-orange-500 text-lg">{title}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-orange-500 mb-4">
            The Bullione Promise: Africa's ROI, Perfected
          </h2>
          <p className="text-orange-500 text-2xl max-w-2xl mx-auto">
            Our track record speaks for itself. We've consistently delivered exceptional results for our clients across Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Updated values: using 15 for Years of Excellence */}
          <AnimatedCounter value={15} title="Years of Combined Excellence" icon={Award} suffix="+" />
          <AnimatedCounter value="23M" title="Value Created (USD)" icon={TrendingUp} suffix="+" />
          <AnimatedCounter value={94} title="Client Retention Rate (%)" icon={Users} suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

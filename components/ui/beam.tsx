"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export const TracingBeam = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        pathLength: 1,
        transition: { duration: 1.5, ease: "easeInOut" }
      });
    }
  }, [isInView, controls]);

  return (
    <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
      <svg
        ref={ref}
        className="w-full h-full absolute top-0 left-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 C25,30 75,70 100,50"
          stroke="hsl(20, 100%, 50%)"
          strokeWidth="0.2"
          strokeDasharray="0 1"
          fill="none"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={controls}
        />
      </svg>
    </div>
  );
};
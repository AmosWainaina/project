"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TracingBeam } from "@/components/ui/beam";
import { Target, Rocket, Shield } from "lucide-react";

interface VisionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay?: number;
}

const VisionCard: React.FC<VisionCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-black/5 backdrop-blur-lg rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-orange-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold text-orange-600">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const WhoWeAreSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-24 relative overflow-hidden bg-gray-900">
      <div className="opacity-40">
        <TracingBeam />
      </div>

      <div id="about" className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl text-orange-600 font-bold mb-8">Who We Are</h2>
          <p className="text-4xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Bullione is built on the spirit of refined excellence, mirroring the purity of
            bullion in its investment approach. The company positions itself as a
            Growth Enabler—empowering companies, individuals, and investors to
            navigate Africa's dynamic and diverse economic landscape.
          </p>
          <p className="text-3xl text-gray-600 dark:text-gray-300 leading-relaxed">
            We also leverage cutting‐edge artificial intelligence to deliver modern,
            efficient, and highly tailored solutions, underpinned by a commitment to
            innovation, trustworthiness, and ethical business practices.
          </p>
        </motion.div>

        <div className="text-2xl grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <VisionCard
            icon={Target}
            title="Our Vision"
            description="To unlock the vast economic potential of Africa."
            delay={0.2}
          />
          <VisionCard
            icon={Rocket}
            title="Our Mission"
            description="We are dedicated to providing innovative and scalable investment solutions that facilitate seamless entry into the African market."
            delay={0.4}
          />
          <VisionCard
            icon={Shield}
            title="Our Commitment"
            description="Our commitment is to redefining investment solutions, Bullione provides a comprehensive suite of services designed to meet the unique needs of its clients, ensuring they successfully capitalize on the myriad opportunities that the African market presents."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;

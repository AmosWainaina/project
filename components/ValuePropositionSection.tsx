'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  TrendingUp, 
  Diamond, 
  Users, 
  Leaf, 
  Building2,
  LucideIcon,
  Brain,
  Globe2,
  Target,
  Shield,
  BarChart3
} from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
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
      className="bg-black/5 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 hover:bg-black/10 transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-orange-600 mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${className}`}
    >
      <h2 className="text-3xl font-bold mb-8 text-orange-600">{title}</h2>
      {children}
    </motion.div>
  );
};

const ValuePropositionSection = () => {
  return (
    <section className="py-24 relative bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6 text-orange-600">Value Proposition</h1>
        </motion.div>

        <Section title="Why Africa? The Continent Redefining Global Growth">
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
            Africa is no longer the future—it's the <span className="font-bold">now</span>. A land of unparalleled
            opportunity, it's where the world's most ambitious investors are turning
            their attention. Here's why:
          </p>

          <div className="text-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={TrendingUp}
              title="Economic Powerhouse"
              description="Home to 6 of the world's 10 fastest-growing economies, Africa is a beacon of high returns and rapid development."
              delay={0.1}
            />
            <FeatureCard
              icon={Diamond}
              title="Resource Riches"
              description="30% of the planet's mineral reserves—gold, diamonds, cobalt, and more—lie beneath Africa's soil."
              delay={0.2}
            />
            <FeatureCard
              icon={Users}
              title="Youthful Energy"
              description="With 70% of the population under 30, Africa's consumer market is exploding with demand for tech, real estate, and infrastructure."
              delay={0.3}
            />
            <FeatureCard
              icon={Leaf}
              title="Green Revolution"
              description="From solar farms to sustainable agriculture, Africa is leading the charge in ESG-friendly investments."
              delay={0.4}
            />
            <FeatureCard
              icon={Building2}
              title="Infrastructure Boom"
              description="$100B+ investments in roads, ports, and smart cities are reshaping the continent's economic landscape."
              delay={0.5}
            />
          </div>
        </Section>

        <Section title="Why Bullione? Your Trusted Partner in African Mastery">
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
            We don't just facilitate investments—we engineer success.
          </p>

          <div className="text-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={Brain}
              title="AI-Powered Precision"
              description="Leverage data-driven insights to identify high-yield opportunities before they hit the mainstream."
              delay={0.1}
            />
            <FeatureCard
              icon={Globe2}
              title="Local Expertise, Global Vision"
              description="Our on-the-ground networks and global partnerships ensure seamless execution and unmatched access."
              delay={0.2}
            />
            <FeatureCard
              icon={Target}
              title="Tailored Strategies"
              description="Your goals are unique, and so are our solutions—crafted to maximize returns while minimizing risk."
              delay={0.3}
            />
            <FeatureCard
              icon={Shield}
              title="Ethical Investing"
              description="We believe in profit with purpose, aligning your portfolio with sustainable, community-driven projects."
              delay={0.4}
            />
            <FeatureCard
              icon={BarChart3}
              title="Proven Track Record"
              description="With $23M+ in assets deployed and a 94% client retention rate, we deliver results that speak for themselves."
              delay={0.5}
            />
          </div>
        </Section>
      </div>
    </section>
  );
};

export default ValuePropositionSection;

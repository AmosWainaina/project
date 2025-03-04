import StatsSection from "@/components/StatsSection";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"
import FloatingNav from "@/components/FloatingNav"


export default function Home() {
  return (
    <main>
      <FloatingNav />
      <HeroSection />
      <WhoWeAreSection />
      <ValuePropositionSection />
      <ServicesSection />
      <StatsSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
import Head from "next/head";
import StatsSection from "@/components/StatsSection";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bullione | Your Gateway to Africa's Golden Future</title>
        <meta
          name="description"
          content="Bullione offers smart investment opportunities across Africa. Discover our services, insights, and testimonials to guide your investment journey."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>
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
    </>
  );
}

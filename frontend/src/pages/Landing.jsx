import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Statistics from "@/components/landing/Statistics";
import Testimonials from "@/components/landing/Testimonials";
import CTABand from "@/components/landing/CTABand";

export default function Landing() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <CTABand />
    </MainLayout>
  );
}

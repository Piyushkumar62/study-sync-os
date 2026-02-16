import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { InsightsSection } from "@/components/landing/InsightsSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA, FooterSection } from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <InsightsSection />
        <SocialProofSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;

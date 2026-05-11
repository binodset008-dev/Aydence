import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PageWrapper from '../components/PageWrapper';

// Lazy load below-the-fold components
const ProblemSection = dynamic(() => import('../components/ProblemSection'), { ssr: true });
const WhatYouWillTrain = dynamic(() => import('../components/WhatYouWillTrain'), { ssr: true });
const HowItWorks = dynamic(() => import('../components/HowItWorks'), { ssr: true });
const WhoIsThisFor = dynamic(() => import('../components/WhoIsThisFor'), { ssr: true });
const PricingSection = dynamic(() => import('../components/PricingSection'), { ssr: true });
const CtaSection = dynamic(() => import('../components/CtaSection'), { ssr: true });
const IntensiveSupport = dynamic(() => import('../components/IntensiveSupport'), { ssr: true });
const Footer = dynamic(() => import('../components/Footer'), { ssr: true });
const WhatsAppButton = dynamic(() => import('../components/WhatsAppButton'));

export default function AdvancedGermanHome() {
  return (
    <PageWrapper>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <WhatYouWillTrain />
      <HowItWorks />
      <WhoIsThisFor />
      <PricingSection />
      <CtaSection />
      <IntensiveSupport />
      <Footer />
      <WhatsAppButton />
    </PageWrapper>
  );
}

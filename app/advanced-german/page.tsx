import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import WhatYouWillTrain from '../components/WhatYouWillTrain';
import HowItWorks from '../components/HowItWorks';
import WhoIsThisFor from '../components/WhoIsThisFor';
import PricingSection from '../components/PricingSection';
import CtaSection from '../components/CtaSection';
import IntensiveSupport from '../components/IntensiveSupport';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';
import WhatsAppButton from '../components/WhatsAppButton';

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

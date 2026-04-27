import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import AboutDrShoba from './components/AboutDrShoba';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';
import WhatsAppButton from './components/WhatsAppButton';

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <HomeHero />
      <AboutDrShoba />
      <Footer />
      <WhatsAppButton />
    </PageWrapper>
  );
}

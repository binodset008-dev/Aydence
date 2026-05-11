'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal, fadeUp } from '../components/AnimationHelpers';

export default function ContactPage() {
  return (
    <PageWrapper>
      <Navbar />
      
      <main className="pt-[160px] pb-32 bg-white min-h-screen">
        <div className="centered-content max-w-4xl mx-auto">
          
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="display-lg text-[--c-navy] mb-6">
                Get in Touch
              </h1>
              <p className="text-[20px] text-gray-600 leading-[1.8] max-w-2xl mx-auto">
                Whether you have questions about our programmes or need personalized career advice for your transition to Germany, we are here to help.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal custom={1} variants={fadeUp}>
            <div className="bg-[#f8f9fc] rounded-[2.5rem] p-10 md:p-16 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-12 md:gap-20">
              
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-[--c-navy] mb-2">Direct Contact</h2>
                  <p className="text-gray-500 text-lg">Send us an email and we&apos;ll get back to you shortly.</p>
                </div>
                
                <a 
                  href="mailto:Info@aydence.de" 
                  className="inline-flex items-center gap-4 text-2xl font-semibold text-[#1a2e6b] hover:text-[#4a6abf] transition-colors"
                >
                  <span className="w-12 h-12 bg-white flex items-center justify-center rounded-xl shadow-sm text-xl border border-gray-100">
                    📧
                  </span>
                  Info@aydence.de
                </a>
                
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    Dr. rer. nat. Shoba Kapoor
                    <br />
                    Königsallee 10B
                    <br />
                    37081 Göttingen, Germany
                  </p>
                </div>
              </div>

              <div className="md:w-5/12 w-full flex flex-col gap-6">
                <Link 
                  href="mailto:Info@aydence.de" 
                  className="w-full btn-primary py-5 text-lg text-center shadow-lg hover:shadow-xl transition-all"
                >
                  Send us an Email
                  <svg className="ml-2 w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <span className="text-3xl mb-3 block">🗓️</span>
                  <p className="font-bold text-[--c-navy] mb-1">Schedule a Call</p>
                  <p className="text-sm text-gray-500 mb-4">Discuss your goals directly with our expert.</p>
                  <Link href="/booking" className="text-[#4a6abf] font-semibold text-sm hover:underline">
                    Request Strategy Call &rarr;
                  </Link>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </main>

      <Footer />
    </PageWrapper>
  );
}

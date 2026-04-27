"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';

export default function ThankYouPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <PageWrapper>
      <Navbar />
      <main className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <div
            ref={containerRef}
            className="bg-white p-12 md:p-16 rounded-[var(--radius-card)] border border-slate-100 shadow-xl shadow-black/5"
          >
            <div className="w-16 h-16 bg-[var(--c-accent-secondary)]/10 text-[var(--c-accent-secondary)] rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--c-text)] mb-6">Thank You for Booking!</h1>
            <p className="text-xl text-[var(--c-muted)] mb-10 leading-relaxed font-light">
              We're excited to help you express yourself clearly, naturally, and effectively in real conversations.
            </p>
            
            <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl border border-slate-100 mb-10 text-left">
              <h2 className="font-bold text-[var(--c-text)] mb-4 text-lg">
                What's next?
              </h2>
              <ul className="space-y-4 text-[var(--c-muted)] text-base">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--c-accent-secondary)] font-bold">1.</span>
                  <span>Check your email for confirmation and calendar invites. (Check spam if needed).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--c-accent-secondary)] font-bold">2.</span>
                  <span>Join our <a href="https://chat.whatsapp.com/YOUR_GROUP_LINK_HERE" className="text-[var(--c-accent-primary)] font-medium hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp community</a> for daily tips.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--c-accent-secondary)] font-bold">3.</span>
                  <span>Get ready for your first 8-week group session!</span>
                </li>
              </ul>
            </div>

            <Link
              href="/advanced-german"
              className="inline-block px-10 py-4 border-2 border-[var(--c-text)] text-[var(--c-text)] font-bold rounded-xl hover:bg-[var(--bg-dark)] hover:text-white transition-all duration-300"
            >
              Return to Course
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}

"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';

export default function ThankYouIntensivePage() {
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
            <div className="w-16 h-16 bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)] rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--c-text)] mb-6">Booking Confirmed!</h1>
            <p className="text-xl text-[var(--c-muted)] mb-10 leading-relaxed font-light">
              We look forward to working with you 1:1. Get ready for highly focused, personalized sessions.
            </p>
            
            <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl border border-slate-100 mb-10 text-left">
              <h2 className="font-bold text-[var(--c-text)] mb-4 text-lg">
                What's next?
              </h2>
              <ul className="space-y-4 text-[var(--c-muted)] text-base">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--c-accent-primary)] font-bold">1.</span>
                  <span>Check your email for the calendar invitation and Zoom link.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--c-accent-primary)] font-bold">2.</span>
                  <span>If requested, reply to the email with any specific topics you'd like to prioritize.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--c-accent-primary)] font-bold">3.</span>
                  <span>Log in a few minutes early to your scheduled session.</span>
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

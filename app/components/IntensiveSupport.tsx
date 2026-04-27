"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function IntensiveSupport() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && sectionRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="intensive" ref={sectionRef} className="py-20 bg-[var(--bg-primary)]">
      <div className="centered-content">
        <div 
          ref={cardRef} 
          className="max-w-4xl mx-auto p-10 md:p-14 bg-white rounded-[var(--radius-card)] border border-[var(--c-accent-secondary)]/20 shadow-md flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--c-text)] mb-4">Need More Intensive Support?</h2>
            <p className="text-[var(--c-muted)] mb-6 leading-relaxed font-light text-lg">
              For focused, individual training, you can book a 3-session intensive. We'll work specifically on your personal communication goals.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-4xl font-black text-[var(--c-text)]">€180</span>
              <span className="text-[var(--c-subtle)] font-medium bg-[var(--bg-secondary)] px-3 py-1 rounded-full text-sm">for 3 sessions</span>
              <span className="text-[var(--c-subtle)] font-medium bg-[var(--bg-secondary)] px-3 py-1 rounded-full text-sm">1:1 personalized</span>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-full md:w-auto">
            <Link
              href="https://calendly.com/dr-shoba-kapoor/30min?back=1&month=2026-04"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full md:w-auto px-8 py-4 bg-[var(--bg-dark)] text-white text-center font-bold rounded-xl hover:bg-black transition-all duration-300"
            >
              Book 1:1 intensive
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

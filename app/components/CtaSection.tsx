"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && sectionRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="centered-content">
        <div className="max-w-4xl mx-auto bg-[var(--bg-dark)] rounded-[var(--radius-card)] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Abstract Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--c-accent-secondary)]/20 rounded-full blur-[80px]" />
          
          <div ref={contentRef} className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Ready to Transform Your German?
            </h2>
            <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto font-light">
              Spots are limited to keep sessions focused and effective.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="https://calendly.com/dr-shoba-kapoor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-[var(--c-accent-primary)] text-white font-bold rounded-xl shadow-xl hover:bg-orange-700 transition-all duration-300"
              >
                Book your spot
              </Link>
              <Link
                href="https://calendly.com/dr-shoba-kapoor/30min?back=1&month=2026-04"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 border-2 border-white/30 hover:border-white hover:bg-white hover:text-black text-white font-bold rounded-xl transition-all duration-300"
              >
                Book 1:1 intensive
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

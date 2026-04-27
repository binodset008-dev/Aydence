"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function AboutDrShoba() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && imageRef.current) {
      // Animate text content
      gsap.fromTo(
        contentRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // Animate image
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0, x: -30 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="centered-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          
          {/* Image Column */}
          <div ref={imageRef} className="relative w-full max-w-md mx-auto lg:mx-0 aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
            <Image 
              src="/shoba-kapoor-headshot.png" 
              alt="Dr. Shoba Kapoor" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Column */}
          <div ref={contentRef} className="text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--c-text)]">
              About Dr. Shoba Kapoor
            </h2>
            <div className="w-20 h-1 bg-[var(--c-accent-primary)] mb-8 rounded-full mx-auto lg:mx-0"></div>
            <p className="text-xl md:text-2xl text-[var(--c-muted)] leading-relaxed font-light">
              Dr. Shoba Kapoor guides researchers, professionals and students from worldwide to build thriving careers in Germany — with clarity, confidence, and a concrete plan as a career coach.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

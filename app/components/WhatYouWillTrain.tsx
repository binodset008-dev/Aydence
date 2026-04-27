"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trainingPoints = [
  {
    title: "Clear and natural speaking",
    description: "Learn to handle complex situations without hesitation or mental translation.",
  },
  {
    title: "Precision in Expression",
    description: "Express opinions and arguments with the nuance expected at C1+ level.",
  },
  {
    title: "Pronunciation & Flow",
    description: "Master sentence melody and flow to sound more natural and professional.",
  },
  {
    title: "Real-life Communication",
    description: "Focus on actual conversations, not textbook scenarios or academic theory.",
  },
  {
    title: "Social & Professional Confidence",
    description: "Feel comfortable in both formal meetings and informal social settings.",
  }
];

export default function WhatYouWillTrain() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current && sectionRef.current) {
      const cards = cardsRef.current.children;
      
      gsap.fromTo(
        cards,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="training" ref={sectionRef} className="py-24 bg-white">
      <div className="centered-content">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--c-text)] mb-6">What You'll Master</h2>
            <div className="w-24 h-1 bg-[var(--c-accent-secondary)] mx-auto rounded-full"></div>
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPoints.map((point, index) => (
              <div
                key={point.title}
                className="group p-8 bg-[var(--bg-primary)] rounded-[var(--radius-card)] border-t-4 border-[var(--c-accent-secondary)] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold text-[var(--c-text)] mb-3">{point.title}</h3>
                <p className="text-[var(--c-muted)] leading-relaxed font-light">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function HomeHero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (textRef.current) {
      const elements = textRef.current.children;
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-black text-white">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-black/10"></div> {/* Very light tint to ensure video quality is visible */}
      </div>

      <div className="centered-content relative z-10 w-full">
        <div ref={textRef} className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Build a Thriving Career in Germany
          </h1>
          <p className="text-xl md:text-2xl text-zinc-50 mb-10 max-w-2xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Expert career strategy and professionalism coaching with Dr. Shoba Kapoor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#about" className="px-8 py-4 bg-[var(--c-accent-primary)] hover:bg-orange-700 text-white font-bold rounded-[var(--radius-pill)] transition-all flex items-center justify-center shadow-xl">
              Learn More
            </Link>
            <Link href="/advanced-german" className="px-8 py-4 bg-black/40 backdrop-blur-md border-2 border-white hover:bg-white hover:text-black text-white font-bold rounded-[var(--radius-pill)] transition-all flex items-center justify-center shadow-xl">
              Advanced German (C1+)
            </Link>
          </div>
        </div>
      </div>

      {/* Audio Toggle Button */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all text-white shadow-lg"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        )}
      </button>
    </section>
  );
}

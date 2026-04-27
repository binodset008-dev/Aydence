'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollReveal, fadeLeft, fadeRight } from './AnimationHelpers';

export default function AboutDoctor() {
  return (
    <section className="py-24 bg-[--bg-secondary] relative overflow-hidden" id="about-doctor">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="centered-content relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
          
          {/* Left: Image */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex justify-center lg:justify-end relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-400/20 blur-[80px] rounded-full pointer-events-none"></div>
            <ScrollReveal variants={fadeLeft}>
              <div className="relative aspect-[4/5] w-[280px] sm:w-[320px] rounded-[32px] overflow-hidden shadow-xl shadow-purple-900/10 group border border-slate-200 relative z-10">
                <Image
                  src="/shoba-kapoor-headshot.png"
                  alt="Dr. Shoba Kapoor"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Bio Content */}
          <div className="lg:col-span-8 lg:pl-10 order-1 lg:order-2">
            <ScrollReveal variants={fadeRight}>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                <span className="text-xs font-semibold tracking-widest uppercase text-purple-600">Expert Faculty</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variants={fadeRight} custom={1} className="mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                About Dr. Shoba Kapoor
              </h2>
            </ScrollReveal>

            <ScrollReveal variants={fadeRight} custom={2} className="mb-12">
              <div className="flex flex-col gap-8">
                <p className="text-slate-700 text-xl md:text-2xl leading-relaxed font-light">
                  Dr. rer. nat. Shoba Kapoor holds a doctorate from a leading German research institute 
                  and has personally guided hundreds of professionals through successful transitions.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  Based in Göttingen — Germany&apos;s university city — she provides insider knowledge 
                  no guidebook can offer. Her approach combines academic rigor with deep empathy for 
                  the challenges of international relocation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variants={fadeRight} custom={3}>
              <Link 
                href="mailto:Info@aydence.de" 
                className="glass border border-slate-300 text-slate-900 hover:bg-slate-100 hover:border-slate-400 px-10 py-4 rounded-full inline-flex items-center group transition-all"
              >
                Send a Message
                <svg 
                  className="ml-3 transition-transform group-hover:translate-x-1 text-cyan-600" 
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </Link>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

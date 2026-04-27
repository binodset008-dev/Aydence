'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerReveal, fadeUp, fadeLeft } from './AnimationHelpers';
import { MouseEvent } from 'react';

interface Reason {
  icon: string;
  title: string;
  desc: string;
}

const reasons: Reason[] = [
  { icon: '🏛️', title: 'World-Class Research', desc: 'Access Max Planck, Fraunhofer and top-tier universities.' },
  { icon: '💼', title: 'Strong Job Market', desc: 'High demand for skilled professionals in tech, healthcare and academia.' },
  { icon: '🎓', title: 'Subsidized Education', desc: 'Free public university tuition — even for international students.' },
  { icon: '🌍', title: 'EU Citizenship Path', desc: 'Clear PR and citizenship pathways to live across all of Europe.' },
];

export default function WhyGermany() {
  return (
    <>
      {/* ── Why Germany Section ───────────────────────────────── */}
      <section className="section-pad bg-[--bg-secondary]" id="about">
        <div className="centered-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">

            <div>
              <ScrollReveal variants={fadeLeft}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-cyan-700">Why Germany?</span>
                </div>
              </ScrollReveal>
              <ScrollReveal variants={fadeLeft} custom={1} className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                  Unmatched opportunity awaits you.
                </h2>
              </ScrollReveal>
              <ScrollReveal variants={fadeLeft} custom={2} className="mb-12">
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  Germany offers a rare combination of world-class research, economic stability, and
                  an open path to permanent residency — but navigating the system alone is overwhelming.
                </p>
              </ScrollReveal>
            </div>

            {/* Right: 2×2 reasons */}
            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -8, boxShadow: '0 32px 80px rgba(0,0,0,0.06)' }}
                  className="glass bg-white/70 border border-slate-200 p-10 flex flex-col gap-8 rounded-3xl"
                >
                  <motion.div
                    className="text-4xl"
                    whileHover={{ rotate: [-5, 5, 0], transition: { duration: 0.35 } }}
                  >
                    {r.icon}
                  </motion.div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-slate-900 text-xl">{r.title}</h3>
                    <p className="text-[17px] font-light text-slate-600 leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>
    </>
  );
}

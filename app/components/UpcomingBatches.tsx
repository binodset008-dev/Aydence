'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from './AnimationHelpers';
import Link from 'next/link';

const batches = [
  {
    level: "A1 New",
    title: "Absolute Beginners",
    date: "1 June",
    schedule: "Mo-We-Fr | 5:00 - 6:00 PM IST",
    status: "Upcoming",
    color: "bg-blue-500",
    description: "Perfect for starting your German journey from scratch."
  },
  {
    level: "A1 Repetition",
    title: "Transitioning to A2",
    date: "11 May",
    schedule: "Mo-Fr | 7:30 - 8:30 PM IST",
    status: "Live",
    color: "bg-emerald-500",
    description: "Currently in repetition week. Moves to A2 on 18th May and finishes B1 by year-end."
  },
  {
    level: "B2 / C1",
    title: "Professional German",
    date: "TBD",
    schedule: "Timing in discussion",
    status: "Enrolling",
    color: "bg-purple-500",
    description: "Speaking German professionally. Exclusive small batch (3/4 students)."
  },
  {
    level: "Literature",
    title: "German Literature",
    date: "Weekend",
    schedule: "Timing TBD",
    status: "Planning",
    color: "bg-amber-500",
    description: "Explore the depths of German literature during the weekends."
  }
];

export default function UpcomingBatches() {
  return (
    <section className="section-pad bg-slate-50/50" id="batches">
      <div className="centered-content">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Live & Upcoming Batches</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {batches.map((batch, i) => (
            <ScrollReveal key={batch.level} custom={i}>
              <div className="glass h-full p-8 rounded-3xl border border-slate-200 bg-white/70 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="flex justify-between items-start mb-6">
                  <span className={`${batch.color} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm`}>
                    {batch.status}
                  </span>
                  <span className="text-slate-400 font-bold text-sm">{batch.date}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{batch.level}</h3>
                <p className="text-sm font-semibold text-orange-600 mb-4 uppercase tracking-wider">{batch.title}</p>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 min-h-[60px]">
                  {batch.description}
                </p>
                
                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-2">Schedule</p>
                  <p className="text-slate-900 font-medium text-sm">{batch.schedule}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal custom={4}>
          <div className="mt-16 text-center">
            <Link 
              href="/booking" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Secure Your Spot
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

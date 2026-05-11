'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollReveal, fadeUp } from './AnimationHelpers';

export default function FreeCallSection() {
  const benefits = [
    { icon: '📊', text: 'Compare university options.' },
    { icon: '💶', text: 'Estimate total costs.' },
    { icon: '🛡️', text: 'Clarify visa paths.' },
  ];

  return (
    <section className="section-pad" id="free-call-promo">
      <div className="centered-content">
        <ScrollReveal>
          <div 
            className="relative overflow-hidden rounded-[40px] p-8 md:p-16 lg:p-20 shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)',
              border: '1px solid rgba(26,46,107,0.05)'
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[--c-navy-light]/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[--c-navy-light]/10 rounded-full blur-2xl -ml-24 -mb-24" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0px rgba(234, 179, 8, 0.4)", 
                      "0 0 0 10px rgba(234, 179, 8, 0)",
                      "0 0 0 0px rgba(234, 179, 8, 0)"
                    ] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 text-white text-[13px] font-bold tracking-[0.1em] uppercase mb-8 shadow-lg shadow-amber-500/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Limited Time Opportunity
                </motion.div>

                <h2 className="display-lg text-[--c-navy] mb-6 leading-tight">
                  FREE CALL <br />
                  <span className="text-[--c-navy-mid]">CONSULTATION</span>
                </h2>

                <p className="text-[19px] leading-relaxed text-[--c-muted] mb-10 max-w-md italic">
                  &quot;Navigate Your Future in Europe. Chart Your Path to an Empowering Education.&quot;
                </p>

                <ul className="flex flex-col gap-5 mb-12">
                  {benefits.map((benefit, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * idx }}
                      className="flex items-center gap-4 text-[18px] text-[--c-navy] font-medium"
                    >
                      <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl">
                        {benefit.icon}
                      </span>
                      {benefit.text}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-col gap-6">
                  <p className="text-[--c-navy] font-bold text-lg">
                    Clear Your Confusion. <span className="text-[--c-navy-mid]">Get Personalized Guidance.</span>
                  </p>
                  
                  <Link 
                    href="/booking" 
                    className="btn-primary self-start text-[16px] px-10 py-5 shadow-lg hover:shadow-xl transition-all"
                  >
                    BOOK A CALL
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Functional Graphic / Image placeholder logic */}
              <div className="hidden lg:block relative h-full min-h-[400px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-[500px] max-h-[400px]">
                    {/* Recreating the "Consultation Illustration" with CSS/SVG style */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 shadow-inner flex items-center justify-center overflow-hidden">
                       <div className="p-8 text-center text-[--c-navy]">
                          <div className="text-6xl mb-6">🌍</div>
                          <h3 className="text-2xl font-bold mb-4">Your Path to Germany</h3>
                          <p className="text-sm opacity-60 leading-relaxed uppercase tracking-widest">Aydence Expert Consultation</p>
                       </div>
                    </div>
                    {/* Floating icons animation */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }} 
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl"
                    >
                      🎓
                    </motion.div>
                    <motion.div 
                      animate={{ y: [0, 10, 0] }} 
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                      className="absolute -bottom-8 right-12 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl"
                    >
                      💼
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

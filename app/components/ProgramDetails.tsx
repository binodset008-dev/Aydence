'use client';
import { motion } from 'framer-motion';

export default function ProgramDetails() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-[--bg-primary] relative overflow-hidden text-slate-900">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="centered-content max-w-6xl mx-auto px-4 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* What You Will Train */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass p-8 rounded-[32px] group hover:-translate-y-2 transition-transform duration-500 border border-slate-200 hover:border-cyan-500/30 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 bg-white/70"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">What You Will Train</h3>
            <ul className="space-y-4">
              {[
                "Clear and natural speaking in complex situations",
                "Expressing opinions and arguments with precision",
                "Pronunciation and sentence flow",
                "Real-life communication (not textbook German)",
                "Confidence in professional and social settings"
              ].map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start">
                  <span className="text-cyan-500 mr-3 font-bold text-xl mt-[-2px]">•</span>
                  <span className="text-slate-600 leading-relaxed font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* How It Works */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass p-8 rounded-[32px] group hover:-translate-y-2 transition-transform duration-500 border border-slate-200 hover:border-emerald-500/30 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 bg-white/70 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] pointer-events-none"></div>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6 relative z-10">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4 relative z-10">How It Works</h3>
            <ul className="space-y-4 relative z-10">
              {[
                "1:1 intensive training",
                "90-minute sessions, structured and focused",
                "Real materials (texts, discussions, scenarios)",
                "Active speaking in every session",
                "Direct and structured feedback"
              ].map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start">
                  <span className="text-emerald-500 mr-3 font-bold text-xl mt-[-2px]">✓</span>
                  <span className="text-slate-600 leading-relaxed font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-200 relative z-10">
              <p className="text-xs text-slate-500 italic">
                * Selected sessions may include performance-based speaking exercises.
              </p>
            </div>
          </motion.div>

          {/* Who This Is For */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="p-8 rounded-[32px] group hover:-translate-y-2 transition-transform duration-500 shadow-xl border border-purple-100 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-6 relative z-10">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-purple-200 pb-4 relative z-10">Who This Is For</h3>
            <ul className="space-y-4 relative z-10">
              {[
                "B2 or C1 level",
                "Understand German but struggle speaking",
                "Want to sound more natural and confident",
                "Living in or preparing for Germany"
              ].map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start">
                  <span className="text-purple-500 mr-3 font-bold text-xl mt-[-2px]">→</span>
                  <span className="text-slate-700 leading-relaxed font-light">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

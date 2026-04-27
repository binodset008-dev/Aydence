'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';

export default function ConfirmationPage() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="pt-32 pb-20 min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Registration Confirmed!</h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              You have successfully registered for your session. A confirmation email with all the details and next steps has been sent to your inbox.
            </p>
            
            <div className="space-y-4">
              <Link
                href="/"
                className="block w-full py-4 bg-[#1a2e6b] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Back to Home
              </Link>
              <p className="text-sm text-slate-400">
                Problems? Contact us at <span className="font-semibold">support@aydence.com</span>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';

function ConfirmationContent() {
  const params = useSearchParams();
  const bookingId = params.get('bookingId') || '';
  const course = params.get('course') || '';
  const date = params.get('date') || '';
  const time = params.get('time') || '';
  const email = params.get('email') || '';

  // Build Google Calendar link
  const calendarLink = (() => {
    if (!date || !time) return '';
    const [start, end] = time.split('-');
    const dateClean = date.replace(/-/g, '');
    const startClean = (start || '').trim().replace(':', '') + '00';
    const endClean = (end || '').trim().replace(':', '') + '00';
    return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(course + ' - Aydence')}&dates=${dateClean}T${startClean}/${dateClean}T${endClean}&ctz=Asia/Kolkata&details=${encodeURIComponent('Booking ID: ' + bookingId)}`;
  })();

  const displayDate = date ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
    >
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Booking Confirmed!</h1>
      <p className="text-lg text-slate-600 mb-6 leading-relaxed">
        Check your email at <strong>{email}</strong> for full details.
      </p>

      {bookingId && (
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3 border border-slate-100">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Booking ID</span>
            <span className="font-bold text-slate-900 font-mono">{bookingId}</span>
          </div>
          {course && (
            <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
              <span className="text-slate-500">Course</span>
              <span className="font-semibold text-slate-900">{course}</span>
            </div>
          )}
          {displayDate && (
            <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
              <span className="text-slate-500">Date</span>
              <span className="font-semibold text-slate-900">{displayDate}</span>
            </div>
          )}
          {time && (
            <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
              <span className="text-slate-500">Time</span>
              <span className="font-semibold text-slate-900">{time} IST</span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {calendarLink && (
          <a href={calendarLink} target="_blank" rel="noopener noreferrer"
            className="block w-full py-4 bg-white text-blue-600 font-bold rounded-2xl border-2 border-blue-600 text-center hover:bg-blue-50 transition-all duration-300">
            📅 Add to Google Calendar
          </a>
        )}
        <Link href="/booking"
          className="block w-full py-4 bg-[#1a2e6b] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
          Book Another Course
        </Link>
        <Link href="/"
          className="block w-full py-3 text-slate-500 font-medium text-center hover:text-slate-700 transition-colors text-sm">
          ← Back to Home
        </Link>
      </div>
    </motion.div>
  );
}

export default function ConfirmationPage() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="pt-32 pb-20 min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
            <ConfirmationContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}

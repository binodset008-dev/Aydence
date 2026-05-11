"use client";

import React, { useState } from 'react';
import BookingCalendar from '../components/BookingCalendar';
import CheckoutForm from '../components/CheckoutForm';

export default function BookingTestPage() {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-black uppercase tracking-widest border-b-4 border-black inline-block pb-2 mb-4">
            Booking System Preview
          </h1>
          <p className="text-gray-500 uppercase tracking-widest font-bold">
            Test Page for Calendar and Checkout
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 text-black border-l-8 border-black pl-4">
            1. Calendar Component
          </h2>
          <div className="bg-white border-4 border-black p-4 lg:p-8">
            <BookingCalendar 
              selectedTimeSlot={selectedTime}
              onSelectTimeSlot={setSelectedTime} 
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 text-black border-l-8 border-black pl-4">
            2. Checkout Component
          </h2>
          <div className="bg-gray-50 p-4 lg:p-8 border-t-4 border-black">
            <CheckoutForm selectedTimeSlot={selectedTime || undefined} />
          </div>
        </section>
      </div>
    </div>
  );
}

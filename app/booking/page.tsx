"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface CourseData {
  slug: string;
  name: string;
  description: string;
  startDate: string;
  daysOfWeek: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
  spotsLeft: number;
}

interface SlotAvailability {
  date: string;
  total: number;
  booked: number;
  remaining: number;
  isFull: boolean;
}

export default function BookingPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [availability, setAvailability] = useState<SlotAvailability[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState<{ message: string; existingBooking: { bookingId: string; date: string } } | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // Fetch courses on mount
  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        setCourses(data.courses || []);
        if (data.courses?.length > 0) setSelectedCourse(data.courses[0].slug);
      })
      .catch(console.error);
  }, []);

  // Fetch availability when course or month changes
  const fetchAvailability = useCallback(async () => {
    if (!selectedCourse) return;
    setLoadingAvailability(true);
    const monthStr = `${calendarMonth.year}-${String(calendarMonth.month + 1).padStart(2, "0")}`;
    try {
      const res = await fetch(`/api/availability?course=${selectedCourse}&month=${monthStr}`);
      const data = await res.json();
      setAvailability(data.availability || []);
    } catch { setAvailability([]); }
    setLoadingAvailability(false);
  }, [selectedCourse, calendarMonth]);

  useEffect(() => { fetchAvailability(); }, [fetchAvailability]);

  // Reset date when course changes
  useEffect(() => { setSelectedDate(""); }, [selectedCourse]);

  const currentCourse = courses.find((c) => c.slug === selectedCourse);
  const courseDays = currentCourse ? currentCourse.daysOfWeek.split(",").map(Number) : [];
  const selectedSlotInfo = availability.find((a) => a.date === selectedDate);

  // Calendar helpers
  const daysInMonth = new Date(calendarMonth.year, calendarMonth.month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(calendarMonth.year, calendarMonth.month, 1).getDay() + 6) % 7; // Mon=0
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const prevMonth = () => {
    setCalendarMonth((p) => p.month === 0 ? { year: p.year - 1, month: 11 } : { year: p.year, month: p.month - 1 });
  };
  const nextMonth = () => {
    setCalendarMonth((p) => p.month === 11 ? { year: p.year + 1, month: 0 } : { year: p.year, month: p.month + 1 });
  };

  const isDayAvailable = (day: number) => {
    const dateStr = `${calendarMonth.year}-${String(calendarMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return availability.some((a) => a.date === dateStr && !a.isFull);
  };
  const isDayFull = (day: number) => {
    const dateStr = `${calendarMonth.year}-${String(calendarMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return availability.some((a) => a.date === dateStr && a.isFull);
  };
  const isDayCourseDay = (day: number) => {
    const d = new Date(calendarMonth.year, calendarMonth.month, day);
    return courseDays.includes(d.getDay());
  };

  // Client-side validation
  const validate = () => {
    const e: Record<string, string> = {};
    if (!selectedCourse) e.course = "Please select a course.";
    if (!selectedDate) e.date = "Please select a date.";
    if (!name || name.trim().length < 2) e.name = "Full name is required (min 2 characters).";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (forceDuplicate = false) => {
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError("");
    setDuplicateWarning(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: selectedCourse, date: selectedDate, name: name.trim(), email: email.trim(), phone: phone.trim() || undefined, notes: notes.trim() || undefined, forceDuplicate }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.isDuplicate && !forceDuplicate) {
          setDuplicateWarning({ message: data.message, existingBooking: data.existingBooking });
          setIsSubmitting(false);
          return;
        }
        setSubmitError(data.message || "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      // Success — redirect to confirmation
      const params = new URLSearchParams({
        bookingId: data.booking.bookingId,
        course: data.booking.courseName,
        date: data.booking.date,
        time: data.booking.timeSlot,
        email: data.booking.customerEmail,
      });
      router.push(`/confirmation?${params.toString()}`);
    } catch {
      setSubmitError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  const formatTime = (start: string, end: string) => {
    const fmt = (t: string) => { const [h, m] = t.split(":").map(Number); return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`; };
    return `${fmt(start)} - ${fmt(end)} IST`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center font-sans">
      <div className="w-full max-w-[600px] bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
        <h1 className="text-[20px] font-medium text-gray-900 mb-8">Book Your German Language Course</h1>

        {/* Section 1: Course Selection */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-[16px] font-medium text-gray-900">Select a course</h2>
            <p className="text-[14px] text-gray-500">Choose your level and batch below</p>
          </div>
          <div className="space-y-3">
            {courses.map((c) => (
              <label key={c.slug} className={`block border rounded-lg p-4 cursor-pointer transition-colors ${selectedCourse === c.slug ? "border-blue-600 bg-blue-50/30" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <input type="radio" name="course" className="w-4 h-4 text-blue-600" checked={selectedCourse === c.slug} onChange={() => setSelectedCourse(c.slug)} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap justify-between items-start mb-1 gap-2">
                      <span className="font-medium text-gray-900">{c.name}</span>
                      <div className="flex gap-2 text-[12px]">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.capacity} spots</span>
                        <span className={`px-2 py-0.5 rounded-full ${c.spotsLeft > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {c.spotsLeft > 0 ? `${c.spotsLeft} left` : "Full"}
                        </span>
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-500">Starting {c.startDate} | {formatTime(c.startTime, c.endTime)}</p>
                  </div>
                </div>
              </label>
            ))}

            {/* Disabled courses / Coming Soon */}
            {[
              { name: "B2/C1 Speaking German Professionally", sub: "Batch of 3/4 (2 paying) | Timing in discussion" },
              { name: "German Literature (Weekend)", sub: "Timing TBD" }
            ].map((c) => (
              <div key={c.name} className="block border border-gray-200 rounded-lg p-4 opacity-50 bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1"><input type="radio" name="course" disabled className="w-4 h-4" /></div>
                  <div><span className="font-medium text-gray-900">{c.name}</span><p className="text-[14px] text-gray-500">{c.sub}</p></div>
                </div>
              </div>
            ))}
          </div>
          {errors.course && <p className="text-red-500 text-[13px] mt-2">{errors.course}</p>}
        </section>

        {/* Section 2: Calendar */}
        <section className="mb-10">
          <h2 className="text-[16px] font-medium text-gray-900 mb-4">Select a date</h2>
          <div className="border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="font-medium text-gray-900">{monthNames[calendarMonth.month]} {calendarMonth.year}</span>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            {loadingAvailability && <div className="text-center text-sm text-gray-400 mb-4">Loading availability...</div>}
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-center text-[13px] font-medium text-gray-500">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-[14px]">
              {/* Empty cells for offset */}
              {Array.from({ length: firstDayOfWeek }, (_, i) => <div key={`empty-${i}`} className="py-2" />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const dateStr = `${calendarMonth.year}-${String(calendarMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isCourseDay = isDayCourseDay(day);
                const isAvail = isDayAvailable(day);
                const isFull = isDayFull(day);
                const isSelected = selectedDate === dateStr;
                const isDisabled = !isCourseDay || (!isAvail && !isFull);

                return (
                  <button
                    key={day}
                    onClick={() => !isDisabled && !isFull && setSelectedDate(dateStr)}
                    disabled={isDisabled || isFull}
                    className={`py-2 rounded-lg transition-all min-h-[44px] flex flex-col items-center justify-center text-[13px]
                      ${isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
                      ${isFull ? "text-red-300 cursor-not-allowed" : ""}
                      ${!isDisabled && !isFull && !isSelected ? "text-gray-900 hover:bg-gray-100 cursor-pointer" : ""}
                      ${isSelected ? "border-2 border-blue-600 font-medium bg-blue-50/30" : "border-2 border-transparent"}
                    `}
                  >
                    <span>{day}</span>
                    {isFull && <span className="text-[9px] text-red-400 leading-none">Full</span>}
                    {isAvail && !isSelected && <span className="w-1 h-1 bg-green-400 rounded-full mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
          {errors.date && <p className="text-red-500 text-[13px] mt-2">{errors.date}</p>}
        </section>

        {/* Section 3: Time Slot */}
        {currentCourse && selectedDate && (
          <section className="mb-10">
            <h2 className="text-[16px] font-medium text-gray-900 mb-4">Time slot</h2>
            <div className={`py-3 px-4 rounded-lg border text-center transition-colors min-h-[44px] border-blue-600 bg-blue-50/30 text-blue-800 font-bold`}>
              {formatTime(currentCourse.startTime, currentCourse.endTime)}
            </div>
            {selectedSlotInfo && (
              <p className="text-[13px] text-gray-500 mt-2">
                {selectedSlotInfo.remaining} {selectedSlotInfo.remaining === 1 ? "spot" : "spots"} available
              </p>
            )}
          </section>
        )}

        {/* Section 4: Customer Details */}
        <section className="mb-10">
          <h2 className="text-[16px] font-medium text-gray-900 mb-4">Your details</h2>
          <div className="space-y-4">
            <div>
              <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)}
                className={`w-full border rounded-lg px-3 py-3 text-[14px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-colors ${errors.name ? "border-red-400" : "border-gray-200"}`} />
              {errors.name && <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>}
            </div>
            <div>
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-lg px-3 py-3 text-[14px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-colors ${errors.email ? "border-red-400" : "border-gray-200"}`} />
              {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
            </div>
            <div>
              <input type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-[14px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-colors" />
            </div>
            <div>
              <textarea placeholder="Any questions or notes?" value={notes} onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-[14px] text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-colors min-h-[80px] resize-y" />
            </div>
          </div>
        </section>

        {/* Errors / Warnings */}
        {submitError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-[14px]">{submitError}</div>
        )}
        {duplicateWarning && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-[14px]">
            <p className="mb-2">{duplicateWarning.message}</p>
            <div className="flex gap-2">
              <button onClick={() => handleSubmit(true)} className="bg-yellow-600 text-white px-3 py-1 rounded text-[13px] font-medium hover:bg-yellow-700">Proceed Anyway</button>
              <button onClick={() => setDuplicateWarning(null)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-[13px] font-medium hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        )}

        {/* Section 5: Actions */}
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <button onClick={() => router.back()} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 py-3 px-4 rounded-lg font-medium transition-colors text-[14px] min-h-[44px]">
            Cancel
          </button>
          <button
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 py-3 px-4 rounded-lg font-medium transition-colors text-[14px] min-h-[44px] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Processing...</>
            ) : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

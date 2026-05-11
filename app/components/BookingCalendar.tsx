"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

interface BookingCalendarProps {
  selectedTimeSlot?: Date | null;
  onSelectTimeSlot?: (date: Date) => void;
}

export default function BookingCalendar({ selectedTimeSlot, onSelectTimeSlot }: BookingCalendarProps = {}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [userTimezone, setUserTimezone] = useState('');
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const nextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 50 : -50,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0
      };
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6 px-2">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevMonth} 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </motion.button>
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextMonth} 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </motion.button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-sm text-gray-500 uppercase py-2">
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2 gap-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

        days.push(
          <motion.div
            key={day.toString()}
            whileHover={isCurrentMonth ? { scale: 1.1 } : {}}
            whileTap={isCurrentMonth ? { scale: 0.95 } : {}}
            onClick={() => isCurrentMonth && setSelectedDate(cloneDay)}
            className={`
              relative flex justify-center items-center h-12 w-12 mx-auto rounded-full cursor-pointer text-sm transition-colors
              ${!isCurrentMonth ? 'text-gray-300 pointer-events-none' : 'text-gray-700 hover:bg-gray-100'}
              ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-md' : ''}
            `}
          >
            {formattedDate}
          </motion.div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    let availableSlotsIST = [
      '10:00', '11:00', '14:00', '16:00'
    ];

    // Specific logic for May 11th and May 12th
    if (selectedDate.getMonth() === 4 && (selectedDate.getDate() === 11 || selectedDate.getDate() === 12)) {
      availableSlotsIST = [
        '09:00', '10:00', '11:00', '12:00', '13:00', 
        '14:00', '15:00', '16:00', '17:00', '18:00', 
        '19:00', '20:00'
      ];
    }

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-8 md:mt-0 md:ml-8 flex-1 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h3>
        <p className="text-xs text-gray-500 mb-6 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Times shown in {userTimezone || 'Loading...'}
        </p>
        
        <div className="space-y-3">
          {availableSlotsIST.map((time, idx) => {
            const dateStr = format(selectedDate, 'yyyy-MM-dd');
            const istDateStr = `${dateStr}T${time}:00+05:30`;
            const dateObj = new Date(istDateStr);
            
            const localTimeStr = userTimezone 
              ? formatInTimeZone(dateObj, userTimezone, 'h:mm a')
              : format(dateObj, 'h:mm a');

            const isTimeSelected = selectedTimeSlot?.getTime() === dateObj.getTime();

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTimeSlot && onSelectTimeSlot(dateObj)}
                className={`w-full block text-center py-3 px-4 rounded-xl border font-medium transition-all
                  ${isTimeSelected 
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md' 
                    : 'border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-sm bg-white'
                  }
                `}
              >
                {localTimeStr}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 font-sans">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:pr-4">
          {renderHeader()}
          {renderDays()}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentDate ? currentDate.toString() : "empty"}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {renderCells()}
            </motion.div>
          </AnimatePresence>
        </div>
        {renderTimeSlots()}
      </div>
    </div>
  );
}

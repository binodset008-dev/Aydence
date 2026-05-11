/**
 * Slot availability management.
 * Queries the database for booking counts and checks capacity.
 */

import { prisma } from './db';

export interface SlotAvailability {
  date: string;
  total: number;
  booked: number;
  remaining: number;
  isFull: boolean;
}

/**
 * Get slot availability for a specific course and date.
 */
export async function getSlotAvailability(
  courseId: string,
  date: string,
  capacity: number
): Promise<SlotAvailability> {
  const booked = await prisma.booking.count({
    where: {
      courseId,
      bookingDate: date,
      status: { not: 'cancelled' },
    },
  });

  return {
    date,
    total: capacity,
    booked,
    remaining: Math.max(0, capacity - booked),
    isFull: booked >= capacity,
  };
}

/**
 * Get availability for multiple dates at once (for calendar view).
 */
export async function getBulkAvailability(
  courseId: string,
  dates: string[],
  capacity: number
): Promise<SlotAvailability[]> {
  // Get all non-cancelled bookings for these dates in one query
  const bookings = await prisma.booking.groupBy({
    by: ['bookingDate'],
    where: {
      courseId,
      bookingDate: { in: dates },
      status: { not: 'cancelled' },
    },
    _count: { id: true },
  });

  // Build a map of date -> count
  const countMap = new Map<string, number>();
  for (const b of bookings) {
    countMap.set(b.bookingDate, b._count.id);
  }

  return dates.map((date) => {
    const booked = countMap.get(date) || 0;
    return {
      date,
      total: capacity,
      booked,
      remaining: Math.max(0, capacity - booked),
      isFull: booked >= capacity,
    };
  });
}

/**
 * Check if a slot is available for booking.
 */
export async function isSlotAvailable(
  courseId: string,
  date: string,
  capacity: number
): Promise<boolean> {
  const availability = await getSlotAvailability(courseId, date, capacity);
  return !availability.isFull;
}

/**
 * Check if a customer already has a booking for the same course.
 * Returns the existing booking if found.
 */
export async function checkDuplicateBooking(
  email: string,
  courseId: string
) {
  return prisma.booking.findFirst({
    where: {
      customerEmail: email.toLowerCase(),
      courseId,
      status: { not: 'cancelled' },
    },
    orderBy: { createdAt: 'desc' },
  });
}

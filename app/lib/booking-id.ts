/**
 * Booking ID generator.
 * Format: BOOK-YYYYMMDD-NNN (e.g., BOOK-20260505-001)
 */

import { prisma } from './db';

/**
 * Generate a unique booking ID for a given date.
 * Counts existing bookings for that date and increments.
 */
export async function generateBookingId(dateStr: string): Promise<string> {
  const dateClean = dateStr.replace(/-/g, '');

  // Count existing bookings for this date (including cancelled, for sequential integrity)
  const count = await prisma.booking.count({
    where: {
      bookingId: {
        startsWith: `BOOK-${dateClean}-`,
      },
    },
  });

  const sequence = String(count + 1).padStart(3, '0');
  return `BOOK-${dateClean}-${sequence}`;
}

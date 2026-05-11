/**
 * Structured logging for booking transactions.
 * Logs to the BookingLog database table.
 */

import { prisma } from './db';

type LogAction =
  | 'booking_created'
  | 'booking_failed'
  | 'booking_cancelled'
  | 'email_customer_sent'
  | 'email_customer_failed'
  | 'email_admin_sent'
  | 'email_admin_failed'
  | 'calendar_synced'
  | 'calendar_failed'
  | 'rate_limited'
  | 'validation_error';

/**
 * Log a booking-related event to the database.
 */
export async function log(
  action: LogAction,
  bookingId: string | null,
  details: Record<string, unknown>
): Promise<void> {
  try {
    await prisma.bookingLog.create({
      data: {
        action,
        bookingId,
        details: JSON.stringify(details),
      },
    });
  } catch (err) {
    // Never let logging failures crash the application
    console.error('[Logger] Failed to write log:', err);
  }
}

export async function logBookingCreated(
  bookingId: string,
  details: { customerEmail: string; courseSlug: string; date: string }
) {
  await log('booking_created', bookingId, details);
  console.log(`[Booking] Created: ${bookingId} for ${details.customerEmail}`);
}

export async function logBookingFailed(
  reason: string,
  details: Record<string, unknown>
) {
  await log('booking_failed', null, { reason, ...details });
  console.warn(`[Booking] Failed: ${reason}`);
}

export async function logEmailSent(
  bookingId: string,
  recipient: string,
  type: 'customer' | 'admin'
) {
  const action = type === 'customer' ? 'email_customer_sent' : 'email_admin_sent';
  await log(action, bookingId, { recipient });
  console.log(`[Email] Sent ${type} email to ${recipient}`);
}

export async function logEmailFailed(
  bookingId: string,
  recipient: string,
  type: 'customer' | 'admin',
  error: string
) {
  const action = type === 'customer' ? 'email_customer_failed' : 'email_admin_failed';
  await log(action, bookingId, { recipient, error });
  console.error(`[Email] Failed to send ${type} email to ${recipient}: ${error}`);
}

export async function logCalendarSynced(bookingId: string, eventId: string) {
  await log('calendar_synced', bookingId, { eventId });
  console.log(`[Calendar] Synced: ${bookingId} -> ${eventId}`);
}

export async function logCalendarFailed(bookingId: string, error: string) {
  await log('calendar_failed', bookingId, { error });
  console.error(`[Calendar] Sync failed for ${bookingId}: ${error}`);
}

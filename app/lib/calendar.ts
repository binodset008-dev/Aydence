/**
 * Google Calendar API integration.
 * Creates events on the admin's calendar when bookings are confirmed.
 *
 * Setup Required:
 * 1. Create a Google Cloud project at https://console.cloud.google.com
 * 2. Enable the Google Calendar API
 * 3. Create a Service Account and download the JSON key file
 * 4. Share your calendar (tech@aydence.de) with the Service Account email
 * 5. Set GOOGLE_CALENDAR_CREDENTIALS env var to the base64-encoded JSON key
 * 6. Set GOOGLE_CALENDAR_ID env var to the calendar ID (usually tech@aydence.de)
 *
 * The system works without Calendar — bookings and emails function independently.
 */

interface CalendarEventParams {
  title: string;
  date: string;       // "YYYY-MM-DD"
  startTime: string;  // "HH:mm" IST
  endTime: string;    // "HH:mm" IST
  description: string;
  attendeeEmail?: string;
}

/**
 * Check if Google Calendar credentials are configured.
 */
export function isCalendarConfigured(): boolean {
  return !!(process.env.GOOGLE_CALENDAR_CREDENTIALS && process.env.GOOGLE_CALENDAR_ID);
}

/**
 * Create a Google Calendar event.
 * Returns the event ID on success, null on failure.
 */
export async function createCalendarEvent(params: CalendarEventParams): Promise<string | null> {
  if (!isCalendarConfigured()) {
    console.log('[Calendar] Not configured — skipping event creation.');
    return null;
  }

  try {
    // Dynamic import to avoid loading googleapis when not needed
    const { google } = await import('googleapis');

    // Decode the base64-encoded service account credentials
    const credentialsJson = Buffer.from(
      process.env.GOOGLE_CALENDAR_CREDENTIALS!,
      'base64'
    ).toString('utf-8');
    const credentials = JSON.parse(credentialsJson);

    // Authenticate with Service Account
    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/calendar']
    );

    const calendar = google.calendar({ version: 'v3', auth });

    // Build IST datetime strings in ISO format
    const startDateTime = `${params.date}T${params.startTime}:00+05:30`;
    const endDateTime = `${params.date}T${params.endTime}:00+05:30`;

    const event: Record<string, unknown> = {
      summary: params.title,
      description: params.description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Asia/Kolkata',
      },
    };

    // Optionally invite the attendee
    if (params.attendeeEmail) {
      event.attendees = [{ email: params.attendeeEmail }];
    }

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: event,
      sendUpdates: params.attendeeEmail ? 'all' : 'none',
    });

    return response.data.id || null;
  } catch (err) {
    console.error('[Calendar] Failed to create event:', err);
    return null;
  }
}

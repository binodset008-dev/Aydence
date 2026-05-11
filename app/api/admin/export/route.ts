/**
 * GET /api/admin/export — Export bookings as CSV download.
 * Requires: Authorization: Bearer <ADMIN_PASSWORD>
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    include: { course: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });

  // Build CSV
  const headers = [
    'Booking ID',
    'Course',
    'Customer Name',
    'Email',
    'Phone',
    'Date',
    'Time Slot',
    'Status',
    'Notes',
    'Calendar Event ID',
    'Created At',
  ];

  const rows = bookings.map((b) => [
    b.bookingId,
    b.course.name,
    b.customerName,
    b.customerEmail,
    b.customerPhone || '',
    b.bookingDate,
    b.timeSlot,
    b.status,
    (b.notes || '').replace(/"/g, '""'), // Escape quotes
    b.calendarEventId || '',
    b.createdAt.toISOString(),
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="aydence-bookings-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}

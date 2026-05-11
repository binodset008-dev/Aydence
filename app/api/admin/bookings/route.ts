/**
 * Admin Booking Management API
 * GET    /api/admin/bookings — List all bookings
 * PATCH  /api/admin/bookings — Update booking status (cancel)
 * DELETE /api/admin/bookings — Delete a booking
 *
 * All endpoints require: Authorization: Bearer <ADMIN_PASSWORD>
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

function checkAdminAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return authHeader === `Bearer ${adminPassword}`;
}

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseFilter = searchParams.get('course');
  const statusFilter = searchParams.get('status');

  const where: Record<string, unknown> = {};
  if (courseFilter) {
    where.course = { slug: courseFilter };
  }
  if (statusFilter) {
    where.status = statusFilter;
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: { course: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ bookings });
}

export async function PATCH(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { bookingId, status } = body;

  if (!bookingId || !status) {
    return NextResponse.json(
      { message: 'bookingId and status are required' },
      { status: 400 }
    );
  }

  if (!['confirmed', 'pending', 'cancelled'].includes(status)) {
    return NextResponse.json(
      { message: 'Invalid status. Must be: confirmed, pending, or cancelled' },
      { status: 400 }
    );
  }

  const booking = await prisma.booking.findUnique({ where: { bookingId } });
  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  const updated = await prisma.booking.update({
    where: { bookingId },
    data: { status },
  });

  return NextResponse.json({ success: true, booking: updated });
}

export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json({ message: 'bookingId is required' }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { bookingId } });
  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  await prisma.booking.delete({ where: { bookingId } });

  return NextResponse.json({ success: true, message: `Booking ${bookingId} deleted.` });
}

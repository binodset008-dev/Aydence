/**
 * GET /api/courses — Get all active courses with enrollment counts.
 */

import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function GET() {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: {
          bookings: {
            where: { status: { not: 'cancelled' } },
          },
        },
      },
    },
    orderBy: { startDate: 'asc' },
  });

  const result = courses.map((course) => ({
    slug: course.slug,
    name: course.name,
    description: course.description,
    startDate: course.startDate,
    daysOfWeek: course.daysOfWeek,
    startTime: course.startTime,
    endTime: course.endTime,
    capacity: course.capacity,
    enrolled: course._count.bookings,
    spotsLeft: course.capacity - course._count.bookings,
    isActive: course.isActive,
  }));

  return NextResponse.json({ courses: result });
}

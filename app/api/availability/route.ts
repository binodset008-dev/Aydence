/**
 * GET /api/availability — Get available slots for a course and month.
 * Query params:
 *   - course: course slug (e.g., "a1-new")
 *   - month: "YYYY-MM" (e.g., "2026-06")
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { parseDaysOfWeek, getAvailableDatesForMonth } from '../../lib/courses';
import { getBulkAvailability } from '../../lib/availability';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseSlug = searchParams.get('course');
  const monthStr = searchParams.get('month'); // "YYYY-MM"

  if (!courseSlug || !monthStr) {
    return NextResponse.json(
      { message: 'Missing required params: course, month' },
      { status: 400 }
    );
  }

  // Parse month
  const [yearStr, monthNumStr] = monthStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthNumStr, 10) - 1; // Convert to 0-indexed

  if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
    return NextResponse.json(
      { message: 'Invalid month format. Use YYYY-MM.' },
      { status: 400 }
    );
  }

  // Fetch course
  const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
  if (!course) {
    return NextResponse.json(
      { message: 'Course not found.' },
      { status: 404 }
    );
  }

  // Get valid dates
  const daysOfWeek = parseDaysOfWeek(course.daysOfWeek);
  const availableDates = getAvailableDatesForMonth(year, month, course.startDate, daysOfWeek);

  // Get booking counts for all dates in one query
  const availability = await getBulkAvailability(course.id, availableDates, course.capacity);

  return NextResponse.json({
    course: {
      slug: course.slug,
      name: course.name,
      startTime: course.startTime,
      endTime: course.endTime,
      capacity: course.capacity,
    },
    availability,
  });
}

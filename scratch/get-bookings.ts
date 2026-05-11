import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const bookings = await prisma.booking.findMany({
    include: {
      course: {
        select: { name: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  if (bookings.length === 0) {
    console.log("No bookings found in the database yet.");
  } else {
    bookings.forEach(b => {
      console.log(`- Booking ID: ${b.bookingId}`);
      console.log(`  Name: ${b.customerName}`);
      console.log(`  Email: ${b.customerEmail}`);
      console.log(`  Course: ${b.course.name}`);
      console.log(`  Date/Time: ${b.bookingDate} | ${b.timeSlot}`);
      console.log(`  Status: ${b.status}`);
      console.log('---');
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

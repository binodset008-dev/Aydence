import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Upsert A1 New Batch
  const a1New = await prisma.course.upsert({
    where: { slug: 'a1-new' },
    update: {
      description: 'Complete beginner German course starting from scratch. Focused on foundational grammar and immediate conversational utility.',
      startDate: '2026-06-01',
      daysOfWeek: '1,3,5', // Monday, Wednesday, Friday
      startTime: '17:00',
      endTime: '18:00',
    },
    create: {
      slug: 'a1-new',
      name: 'A1 New Batch',
      description: 'Complete beginner German course starting from scratch. Focused on foundational grammar and immediate conversational utility.',
      startDate: '2026-06-01',
      daysOfWeek: '1,3,5', // Monday, Wednesday, Friday
      startTime: '17:00',
      endTime: '18:00',
      capacity: 4,
      isActive: true,
    },
  });

  // Upsert A1 Repetition
  const a1Rep = await prisma.course.upsert({
    where: { slug: 'a1-rep' },
    update: {
      description: 'Repetition week starting 11th May. This batch goes into A2 from 18th May and will finish B1 by the end of the year.',
      startDate: '2026-05-11',
      daysOfWeek: '1,2,3,4,5', // Monday through Friday
      startTime: '19:30',
      endTime: '20:30',
    },
    create: {
      slug: 'a1-rep',
      name: 'A1 Repetition',
      description: 'Repetition week starting 11th May. This batch goes into A2 from 18th May and will finish B1 by the end of the year.',
      startDate: '2026-05-11',
      daysOfWeek: '1,2,3,4,5', // Monday through Friday
      startTime: '19:30',
      endTime: '20:30',
      capacity: 8,
      isActive: true,
    },
  });

  console.log('✅ Seeded courses:', { a1New: a1New.name, a1Rep: a1Rep.name });
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

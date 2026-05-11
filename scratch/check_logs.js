const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const logs = await prisma.bookingLog.findMany({
    where: { 
      OR: [
        { action: { contains: 'failed' } },
        { details: { contains: 'error' } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 20
  });
  console.log('--- LATEST FAILURE LOGS ---');
  console.dir(logs, { depth: null });
  
  const emails = await prisma.bookingLog.findMany({
    where: { action: { contains: 'email' } },
    orderBy: { createdAt: 'desc' },
    take: 20
  });
  console.log('--- LATEST EMAIL LOGS ---');
  console.dir(emails, { depth: null });
}

main().catch(console.error).finally(() => prisma.$disconnect());

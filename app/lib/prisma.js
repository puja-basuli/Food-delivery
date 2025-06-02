import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.DATABASE_URL === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to prevent multiple instances (hot reload issue)
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
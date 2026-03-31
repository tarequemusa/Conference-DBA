// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     datasourceUrl: process.env.DATABASE_URL,
//   });
// };

// const globalForPrisma = global;
// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";

/**
 * 🚀 NEXT.JS SINGLETON PATTERN
 * This prevents multiple instances of Prisma Client in development,
 * ensuring your app always talks to the same database file/instance.
 */

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

const globalForPrisma = globalThis;

// Check if prisma exists on globalThis, otherwise create it
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// In development, save the instance to globalThis to reuse it during HMR (Hot Module Replacement)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

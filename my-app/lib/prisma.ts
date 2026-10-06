// lib/prisma.ts
import { PrismaClient } from "@/app/generated/prisma/client"; // match your generator output
import { PrismaPg } from "@prisma/adapter-pg";


// globalThis survives hot reloads (module files get re-run, globalThis doesn't).
// We use it as a safe place to store one shared PrismaClient.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Prisma 7 connects through a driver adapter (here: node-postgres)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

// If a client already exists on globalThis → reuse it.
// Otherwise → create a new one. This is the "singleton" part.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// In dev, save the client on globalThis so the next hot reload finds it.
// In production there's no hot reload, so the module runs once anyway.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma__: PrismaClient
}

const prisma = globalThis.__prisma__ ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.__prisma__ = prisma

export { prisma }

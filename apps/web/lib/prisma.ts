import { PrismaClient } from '@prisma/client'
import path from 'path'
import * as dotenv from 'dotenv'

// Ensure we load from the absolute path to avoid issues with directory names
const envPath = path.join(process.cwd(), '.env.local')
dotenv.config({ path: envPath })

const globalForPrisma = global as unknown as { prisma: PrismaClient }

if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not found in environment, falling back to local file")
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL || "file:./dev.db"
            }
        },
        log: ['query', 'error', 'warn'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

function getDatabaseUrl() {
  if (process.env.VERCEL) {
    const tmpDbPath = '/tmp/custom.db'
    if (!fs.existsSync(tmpDbPath)) {
      try {
        const seedDbPath = path.join(process.cwd(), 'db', 'custom.db')
        if (fs.existsSync(seedDbPath)) {
          fs.copyFileSync(seedDbPath, tmpDbPath)
        }
      } catch (e) {
        console.error('Failed to copy seed db to /tmp:', e)
      }
    }
    return `file:${tmpDbPath}`
  }
  return process.env.DATABASE_URL || 'file:./db/custom.db'
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
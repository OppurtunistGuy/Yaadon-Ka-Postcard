import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

function getDatabaseUrl() {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }
  if (process.env.VERCEL) {
    const tmpDbPath = '/tmp/custom.db'
    if (!fs.existsSync(tmpDbPath)) {
      try {
        const possibleSeedPaths = [
          path.join(process.cwd(), 'db', 'custom.db'),
          path.join(process.cwd(), 'prisma', 'db', 'custom.db'),
          path.join(process.cwd(), 'prisma', 'dev.db'),
        ]
        for (const seedPath of possibleSeedPaths) {
          if (fs.existsSync(seedPath)) {
            fs.copyFileSync(seedPath, tmpDbPath)
            break
          }
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
  initialized: boolean | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Ensure tables exist asynchronously with nullable surpriseId and full schema fields
if (!globalForPrisma.initialized) {
  globalForPrisma.initialized = true
  db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Postcard" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "token" TEXT NOT NULL,
      "senderKey" TEXT,
      "receiverName" TEXT NOT NULL,
      "city" TEXT NOT NULL,
      "relationship" TEXT NOT NULL,
      "senderName" TEXT NOT NULL,
      "senderGender" TEXT DEFAULT 'male',
      "vibe" TEXT NOT NULL,
      "surpriseId" TEXT,
      "message" TEXT NOT NULL,
      "themeId" TEXT,
      "musicUrl" TEXT,
      "musicPlatform" TEXT,
      "musicTitle" TEXT,
      "openedAt" DATETIME,
      "revealedAt" DATETIME,
      "claimedAt" DATETIME,
      "reaction" TEXT,
      "rating" INTEGER,
      "comment" TEXT,
      "publicName" TEXT,
      "isPublic" BOOLEAN DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `).then(() => {
    return db.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Postcard_token_key" ON "Postcard"("token");
    `)
  }).catch((e) => {
    console.warn("DB init table check warning:", e)
  })
}
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import path from "path";

// Explicitly load .env from the root directory to avoid system overrides
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const dbUrl = process.env.MONGODB_URL || process.env.DATABASE_URL;

// Ensure MONGODB_URL is correct and not overridden by system env
if (dbUrl && dbUrl.startsWith("postgresql://")) {
  console.warn("CRITICAL WARNING: The database URL is currently set to a PostgreSQL string. This project uses MongoDB. Please check your system environment variables (Control Panel > System > Environment Variables) and remove any global DATABASE_URL.");
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

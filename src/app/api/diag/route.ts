import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const diagInfo = {
    status: "unknown",
    database: "checking",
    env: {
      hasMongodbUrl: !!process.env.MONGODB_URL,
      mongodbUrlStarts: process.env.MONGODB_URL?.substring(0, 15) + "...",
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      dbUrlStarts: process.env.DATABASE_URL?.substring(0, 15) + "...",
      nodeEnv: process.env.NODE_ENV,
    },
    error: null as string | null,
  };

  try {
    // Attempt a simple query
    await prisma.$connect();
    const userCount = await prisma.user.count();
    diagInfo.status = "healthy";
    diagInfo.database = `connected (User count: ${userCount})`;
  } catch (err: unknown) {
    diagInfo.status = "error";
    diagInfo.database = "connection failed";
    diagInfo.error = err instanceof Error ? err.message : "Unknown database error";
    console.error("Diagnostic error:", err);
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(diagInfo);
}
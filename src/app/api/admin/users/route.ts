import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })
    return Response.json(users)
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return Response.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

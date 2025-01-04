import { NextResponse } from "next/server";
// import { prisma } from "@app/utils/db"; // Убедись, что этот путь к Prisma корректный
import { prisma } from "../../utils/db.ts";
export async function GET() {
  try {
    // Пример: берём первый сайт из базы для теста
    const site = await prisma.site.findFirst({
      select: { id: true },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    return NextResponse.json({ siteId: site.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch siteId" },
      { status: 500 }
    );
  }
}

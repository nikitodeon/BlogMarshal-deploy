import { NextResponse } from "next/server";
// import { prisma } from "@app/utils/db"; // Убедись, что этот путь к Prisma корректный
import { prisma } from "../../utils/db";
export async function GET(request: Request) {
  try {
    // Пример: берём первый сайт из базы для теста
    // const site = await prisma.site.findFirst({
    //   select: { id: true },
    // });
    const url = new URL(request.url);
    const siteId = url.searchParams.get("siteId");

    if (!siteId) {
      return NextResponse.json(
        { error: "siteId is required" },
        { status: 400 }
      );
    }

    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
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

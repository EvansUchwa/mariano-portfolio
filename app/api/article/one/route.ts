import { NextResponse, NextRequest } from "next/server";
import prima from "@/lib/prisma";
import { genericErrorEnum } from "@/types/errors";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  const id = searchParams.get("id");
  if (!id) throw genericErrorEnum.missingRequiredField;

  const result = await prima.articles.findUnique({
    where: { id },
    include: {
      banner: true,
      autor: true,
    },
  });
  if (result) {
    const copyViewers = [...result.views];
    if (!copyViewers.includes(ip)) {
      copyViewers.push(ip);
    }
    await prima.articles.update({
      where: { id },
      data: { views: copyViewers },
    });
  }
  return NextResponse.json(result);
};

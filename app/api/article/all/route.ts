import { NextResponse, NextRequest } from "next/server";
import prima from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const except = searchParams.get("except");
  const limit = searchParams.get("limit");

  const reqParams: Prisma.ArticlesFindManyArgs = {
    where: {},
    include: {
      banner: true,
      autor: true,
    },
  };

  if (except) {
    reqParams.where = {
      NOT: {
        id: except,
      },
    };
  }
  if (limit) {
    reqParams.take = parseInt(limit);
  }
  const result = await prima.articles.findMany(reqParams);

  return NextResponse.json(result);
};

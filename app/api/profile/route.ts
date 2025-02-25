import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await prisma.user.findFirst({
    include: {
      banner: true,
    },
  });
  const works = await prisma.projects.findMany({
    where: { autorId: user!.id },
  });
  return NextResponse.json({ user, works });
};

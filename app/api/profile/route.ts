import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await prisma.users.findFirst({
    include: {
      banner: true,
    },
  });
  const works = await prisma.projects.findMany({
    where: { autorId: user!.id },
    include: {
      banner: true,
      technologies: true,
    },
  });

  const skills = await prisma.skills.findMany({});
  return NextResponse.json({ user, works, skills });
};

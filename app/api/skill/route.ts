import prisma from "@/lib/prisma";
import { skillSuccessEnum } from "@/types/success";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, icon } = body;

  try {
    const addSkill = await prisma.skills.create({
      data: {
        name,
        icon,
      },
    });
    return NextResponse.json({ message: skillSuccessEnum.added });
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 400,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const skills = await prisma.skills.findMany({});
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { name, icon, skillId } = body;

  try {
    const addSkill = await prisma.skills.update({
      where: { id: skillId },
      data: {
        name,
        icon,
      },
    });
    return NextResponse.json({ message: skillSuccessEnum.updated });
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skillId = searchParams.get("skillId");

  try {
    if (!skillId) throw "Error occur";
    const removeSkill = await prisma.skills.delete({
      where: { id: skillId },
    });
    return NextResponse.json({ message: skillSuccessEnum.deleted });
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 400,
      }
    );
  }
}

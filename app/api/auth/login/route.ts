import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    var token = jwt.sign(
      { email: user.email, id: user.id },
      "Mariano portfolio"
    );
    return NextResponse.json({ user, token });
  }

  return NextResponse.json(
    { message: "Invalid email or password" },
    { status: 400 }
  );
}

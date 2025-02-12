import prisma from "@/lib/prisma";
import { emailErrorEnum, genericErrorEnum } from "@/types/errors";
import { errorResponse } from "@/utils/backend/others";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import jose from "jose";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!findUser) throw emailErrorEnum.emailNotFound;

    const compare = await bcrypt.compare(password, findUser.password);
    if (!compare) throw genericErrorEnum.invalidCredential;

    const privateKey = await jose.importPKCS8(process.env.JWT_SECRET!, "RS256");
    const token = await new jose.SignJWT({
      id: findUser.id,
      role: findUser.role,
    })
      .setProtectedHeader({ alg: "RS256" })
      .sign(privateKey);

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
      sameSite: "strict",
      path: "/",
    });
    const response = NextResponse.json({ user: findUser, token });
    response.headers.append("Set-Cookie", cookie);
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}

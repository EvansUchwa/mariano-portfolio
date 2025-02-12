import { errorResponse } from "@/utils/backend/others";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookie = serialize("token", "", {
      expires: new Date(0),
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    const response = NextResponse.json(true);
    response.headers.append("Set-Cookie", cookie);
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}

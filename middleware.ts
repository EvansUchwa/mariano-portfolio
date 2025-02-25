import { NextResponse } from "next/server";
import { MyApiNextRequest } from "./types/api.d";
import * as jose from "jose";

const publicRoutes = ["/adm-login"];
const protectedRoutes = ["/manage/user", "/manage/works", "manage/articles"];
const apiRoutes = ["/api/user", "/api/article", "/api/work"];

interface JWTPayload {
  id: string;
  role: string;
  [key: string]: unknown;
}

export async function middleware(req: MyApiNextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  if (pathname.startsWith("/api/")) {
    if (apiRoutes.includes(pathname)) {
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const publicKey = await jose.importSPKI(process.env.JWT_PUBLIC!, "RS256");
      const okboom = await jose.jwtVerify(token.value, publicKey);
      const { payload } = okboom;
      const userId = (payload as JWTPayload).id;
      const userRole = (payload as JWTPayload).role;
      // req.userId = userId;
      const response = NextResponse.next();
      response.headers.set("x-user-id", userId);
      response.headers.set("x-user-role", userRole);
      return response;
    }
  } else {
    if (protectedRoutes.includes(pathname)) {
      console.log(pathname);

      if (!token) {
        return NextResponse.redirect(new URL("/adm-login", req.url));
      }
    }
    if (publicRoutes.includes(pathname) && token) {
      return NextResponse.redirect(new URL("/manage/user", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [...publicRoutes, ...protectedRoutes],
};

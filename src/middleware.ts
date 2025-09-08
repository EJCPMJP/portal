@'
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isAdminArea = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";
  const isAuthApi = pathname.startsWith("/api/auth");

  if (!isAdminArea || isLogin || isAuthApi) return;

  const session = req.auth;
  const isAdmin = session && (session.user as any)?.role === "admin";

  if (!isAdmin) {
    const url = new URL("/admin/login", req.nextUrl);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
});

export const config = { matcher: ["/admin/:path*"] };
'@ | Set-Content .\src\middleware.ts -Encoding utf8

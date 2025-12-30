// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/reset");

  const isPublicPage =
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact");

  // 🔐 Неавторизован
  if (!token && !isAuthPage && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔁 Авторизован → нельзя на auth-страницы
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🛑 АДМИНКА
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (!payload.isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

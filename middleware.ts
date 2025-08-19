import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr"];

function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language") || "";
  return locales.find((locale) => acceptLang.includes(locale)) || "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  if (!locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};

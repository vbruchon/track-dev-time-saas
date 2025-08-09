// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const protectedRoutes = ["/dashboard"];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   const sessionCookie = req.cookies.get("better-auth.session_token");

//   if (isProtected && !sessionCookie) {
//     const signInUrl = new URL("/sign-in", req.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isLoggedIn = !!token;
    const { pathname } = request.nextUrl;
    const isLoginPage = pathname === "/admin/login";

    if (!isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (isLoggedIn && isLoginPage) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
    const isLoggedIn = !!request.auth;
    const { pathname } = request.nextUrl;
    const isLoginPage = pathname === "/admin/login";

    if (!isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (isLoggedIn && isLoginPage) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*"],
};

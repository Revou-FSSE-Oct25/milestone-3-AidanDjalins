import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request:NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    // Protection for admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // (!login) ? redirect to login
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        
        // (!admin) ? redirect to home
        if (token.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        
    }
     
    // allow access
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*'
};
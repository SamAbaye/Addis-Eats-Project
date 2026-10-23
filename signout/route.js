import { NextResponse } from "next/server"

export async function GET(request) {
    const response = NextResponse.redirect(new URL('/', request.url));

    response.cookies.set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    });
    return response
}
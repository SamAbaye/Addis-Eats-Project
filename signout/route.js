import {NextResponse} from 'next/server'

export async function GET() {
    const response = await signOut({message: signout});

    response.cookies.delete('session');
    return response
}
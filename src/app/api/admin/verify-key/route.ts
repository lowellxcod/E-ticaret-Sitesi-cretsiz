import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { key } = await req.json();
        const adminKey = process.env.ADMIN_ACCESS_KEY;

        if (key === adminKey) {
            // Set cookie valid for 1 day
            cookies().set('admin_access_token', 'valid', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24,
                path: '/',
            });
            return NextResponse.json({ success: true });
        } else {
            return new NextResponse("Invalid Key", { status: 401 });
        }
    } catch (error) {
        return new NextResponse("Error", { status: 500 });
    }
}

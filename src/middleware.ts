import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Advanced Security Middleware
 * - Security Headers (CSP, HSTS, X-Frame-Options, etc.)
 * - API Rate Limiting (Basic memory-based for edge/node)
 */

// Basic in-memory rate limiter (Note: resets on server restart/hot-reload)
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();

const RATE_LIMIT_THRESHOLD = 60; // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const url = request.nextUrl.pathname;

    // 1. Security Headers
    response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.youtube.com https://pay.paytr.com;");
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // 2. Rate Limiting (Only for API routes)
    if (url.startsWith('/api')) {
        const ip = request.ip || '127.0.0.1';
        const now = Date.now();
        const userLimit = rateLimitMap.get(ip);

        if (!userLimit || (now - userLimit.lastReset) > RATE_LIMIT_WINDOW) {
            rateLimitMap.set(ip, { count: 1, lastReset: now });
        } else {
            userLimit.count += 1;
            if (userLimit.count > RATE_LIMIT_THRESHOLD) {
                return new NextResponse('Too Many Requests', {
                    status: 429,
                    headers: {
                        'Retry-After': '60',
                        'Content-Type': 'text/plain'
                    }
                });
            }
        }
    }

    return response;
}

// Ensure middleware runs for all routes except static assets
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};

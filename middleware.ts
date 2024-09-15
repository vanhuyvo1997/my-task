import { auth } from "@/auth";

export default auth(((req) => {
    const pathname = req.nextUrl.pathname;

    if (!req.auth && (pathname.startsWith('/tasks') || pathname.startsWith('/dashboard'))) {
        const newUrl = new URL('/login', req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    if (req.auth && (pathname === '/' || pathname.startsWith('/register') || pathname.startsWith('/login'))) {
        const redirectTo = req.auth.user?.role === 'ADMIN' ? '/dashboard' : '/tasks';
        const newUrl = new URL(redirectTo, req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    if (req.auth && pathname.startsWith('/tasks') && req.auth.user?.role === 'ADMIN') {
        const newUrl = new URL('/dashboard', req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    if (req.auth && pathname.startsWith('/dashboard') && req.auth.user?.role === 'USER') {
        const newUrl = new URL('/tasks', req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
}));
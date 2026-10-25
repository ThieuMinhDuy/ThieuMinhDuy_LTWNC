import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userRole = (req.auth?.user as { role?: string } | undefined)?.role;

    const isDashboard = nextUrl.pathname.startsWith("/dashboard");
    const isAdmin = nextUrl.pathname.startsWith("/admin");

    // Lớp 1: Middleware chặn sớm
    if (isDashboard || isAdmin) {
        // 1. Chưa đăng nhập mà truy cập trang riêng tư -> chuyển hướng về /login
        if (!isLoggedIn) {
            const loginUrl = new URL("/login", nextUrl);
            loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
            return Response.redirect(loginUrl);
        }

        // 2. Đã đăng nhập nhưng cố truy cập /admin mà vai trò không phải admin -> chuyển hướng về /403
        if (isAdmin && userRole !== "admin") {
            return Response.redirect(new URL("/403", nextUrl));
        }
    }
});

export const config = {
    // Chỉ kích hoạt middleware trên các tuyến đường nhạy cảm cần bảo vệ
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};

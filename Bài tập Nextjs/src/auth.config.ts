import type { NextAuthConfig } from "next-auth";
import type { Role } from "./types/next-auth";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            const isDashboard = pathname.startsWith("/dashboard");
            const isAdmin = pathname.startsWith("/admin");

            if (isDashboard || isAdmin) {
                if (!isLoggedIn) {
                    return false; // Chuyển hướng về trang đăng nhập
                }
                if (isAdmin && (auth?.user as { role?: Role })?.role !== "admin") {
                    return Response.redirect(new URL("/403", nextUrl));
                }
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.role = (user.role as Role) || "user";
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = (token.role as Role) || "user";
            }
            return session;
        },
    },
    providers: [], // Khởi tạo mảng rỗng cho middleware (Edge Runtime)
};

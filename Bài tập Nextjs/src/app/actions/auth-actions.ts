"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { MOCK_USERS } from "@/auth";

/**
 * Server Action xử lý đăng nhập bằng Email/Password
 * - Nếu role là admin: chuyển hướng trực tiếp vào /admin
 * - Nếu role là user: chuyển hướng trực tiếp vào /dashboard
 */
export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const matchedUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
    );

    const targetUrl = matchedUser?.role === "admin" ? "/admin" : "/dashboard";

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: targetUrl,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Email hoặc mật khẩu không chính xác.";
                default:
                    return "Đã xảy ra lỗi đăng nhập. Vui lòng thử lại.";
            }
        }
        throw error;
    }
}

/**
 * Server Action đăng xuất -> chuyển về trang đăng nhập
 */
export async function logout() {
    await signOut({ redirectTo: "/login" });
}

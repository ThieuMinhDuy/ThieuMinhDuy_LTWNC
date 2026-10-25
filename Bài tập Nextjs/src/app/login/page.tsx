import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Trang đăng nhập hệ thống",
};

export default async function LoginPage() {
    const session = await auth();

    // Nếu đã đăng nhập thì tự chuyển vào đúng trang theo vai trò
    if (session?.user) {
        if (session.user.role === "admin") {
            redirect("/admin");
        } else {
            redirect("/dashboard");
        }
    }

    return (
        <div className="container">
            <LoginForm />
        </div>
    );
}

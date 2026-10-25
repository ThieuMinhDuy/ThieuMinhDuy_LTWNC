import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAdminProducts } from "@/app/actions/admin-actions";
import AdminView from "@/components/AdminView";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Trang Quản trị",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminPage() {
    // Lớp 2: Kiểm tra quyền Admin tại Server
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== "admin") {
        redirect("/403");
    }

    const products = await getAdminProducts();

    return (
        <AdminView
            products={products}
            adminName={session.user.name}
            adminEmail={session.user.email}
        />
    );
}

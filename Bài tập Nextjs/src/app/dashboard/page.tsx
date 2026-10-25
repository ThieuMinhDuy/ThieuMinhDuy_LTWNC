import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserView from "@/components/UserView";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Trang Người dùng",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function DashboardPage() {
    // Lớp 2: Kiểm tra phiên tại Server
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return <UserView user={session.user} />;
}

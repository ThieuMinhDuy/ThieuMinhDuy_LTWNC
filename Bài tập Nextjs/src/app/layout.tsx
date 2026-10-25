import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(appUrl),
    title: {
        default: "PTIT Shop - Nền Tảng Thiết Bị Công Nghệ & Phân Quyền RBAC",
        template: "%s | PTIT Shop",
    },
    description: "Cửa hàng thiết bị công nghệ chính hãng chất lượng cao. Hệ thống tích hợp xác thực bảo mật NextAuth v5 và phân quyền RBAC đa lớp.",
    keywords: ["Next.js", "RBAC", "NextAuth", "SEO", "Thiết bị công nghệ", "Laptop ThinkPad", "Bàn phím cơ", "PTIT"],
    authors: [{ name: "Thiều Minh Duy", url: "https://ptit.edu.vn" }],
    creator: "Thiều Minh Duy",
    publisher: "PTIT Shop",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "PTIT Shop - Thiết Bị Công Nghệ Chính Hãng",
        description: "Mua sắm laptop, bàn phím cơ, màn hình đồ hoạ cao cấp với giá ưu đãi tại PTIT Shop.",
        url: appUrl,
        siteName: "PTIT Shop",
        locale: "vi_VN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "PTIT Shop - Thiết Bị Công Nghệ Chính Hãng",
        description: "Khám phá các thiết bị công nghệ đỉnh cao bảo hành chính hãng.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body>
                <Suspense fallback={<div style={{ height: "54px", backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }} />}>
                    <Navbar />
                </Suspense>
                <main>{children}</main>
            </body>
        </html>
    );
}

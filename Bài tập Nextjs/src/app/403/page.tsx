import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "403 - Không có quyền",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ForbiddenPage() {
    return (
        <div className="container" style={{ maxWidth: "420px", margin: "60px auto", textAlign: "center" }}>
            <div
                style={{
                    backgroundColor: "#ffffff",
                    padding: "32px 24px",
                    borderRadius: "8px",
                    border: "1px solid #fecaca",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                }}
            >
                <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#dc2626", marginBottom: "8px" }}>
                    403 - Quyền truy cập bị từ chối
                </h1>
                <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "20px" }}>
                    Tài khoản của bạn là <strong>User</strong>, không có quyền truy cập vào trang Quản trị (Admin).
                </p>

                <Link
                    href="/dashboard"
                    style={{
                        display: "inline-block",
                        padding: "8px 18px",
                        backgroundColor: "#2563eb",
                        color: "#ffffff",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                    }}
                >
                    Quay về trang User
                </Link>
            </div>
        </div>
    );
}

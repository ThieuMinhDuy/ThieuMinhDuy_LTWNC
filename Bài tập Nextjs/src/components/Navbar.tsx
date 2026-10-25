import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/app/actions/auth-actions";

export default async function Navbar() {
    const session = await auth();
    const user = session?.user;
    const isAdmin = user?.role === "admin";

    return (
        <header
            style={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e2e8f0",
                position: "sticky",
                top: 0,
                zIndex: 40,
            }}
        >
            <div
                style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Tiêu đề hệ thống bên trái có link Cửa hàng */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <Link
                        href="/products"
                        style={{
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            color: "#0f172a",
                            textDecoration: "none",
                        }}
                    >
                        PTIT Shop
                    </Link>
                    <Link
                        href="/products"
                        style={{
                            fontSize: "0.85rem",
                            color: "#64748b",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        Sản phẩm
                    </Link>
                </div>

                {/* Thông tin tài khoản và nút Đăng xuất bên phải */}
                <div>
                    {user ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontSize: "0.85rem", color: "#334155" }}>
                                {user.name}
                            </span>
                            <span
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    padding: "2px 8px",
                                    borderRadius: "4px",
                                    backgroundColor: isAdmin ? "#fee2e2" : "#e0f2fe",
                                    color: isAdmin ? "#dc2626" : "#0284c7",
                                }}
                            >
                                {user.role.toUpperCase()}
                            </span>
                            <form action={logout}>
                                <button
                                    type="submit"
                                    style={{
                                        padding: "5px 12px",
                                        backgroundColor: "#f1f5f9",
                                        border: "1px solid #cbd5e1",
                                        borderRadius: "6px",
                                        fontSize: "0.8rem",
                                        color: "#475569",
                                        cursor: "pointer",
                                    }}
                                >
                                    Đăng xuất
                                </button>
                            </form>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            style={{
                                padding: "6px 14px",
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                borderRadius: "6px",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                            }}
                        >
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

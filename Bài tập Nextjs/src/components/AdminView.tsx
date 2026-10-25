"use client";

import { useTransition } from "react";
import { deleteProduct, createProduct } from "@/app/actions/admin-actions";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
}

interface AdminViewProps {
    products: Product[];
    adminName?: string | null;
    adminEmail?: string | null;
}

export default function AdminView({ products, adminName, adminEmail }: AdminViewProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: string, name: string) => {
        if (!confirm(`Xác nhận xóa sản phẩm: "${name}"?`)) {
            return;
        }

        startTransition(async () => {
            const formData = new FormData();
            formData.append("id", id);
            try {
                await deleteProduct(formData);
            } catch (err: unknown) {
                alert(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
            }
        });
    };

    const handleCreate = async (formData: FormData) => {
        try {
            await createProduct(formData);
            const form = document.getElementById("create-form") as HTMLFormElement;
            form?.reset();
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
        }
    };

    return (
        <div className="container" style={{ maxWidth: "800px", margin: "32px auto" }}>
            {/* Header Admin */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    padding: "16px 20px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a" }}>
                        Trang Quản trị (Admin)
                    </h1>
                    <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "2px" }}>
                        Tài khoản: {adminName} ({adminEmail})
                    </p>
                </div>
                <span
                    style={{
                        padding: "3px 8px",
                        borderRadius: "4px",
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                    }}
                >
                    ADMIN
                </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Form thêm sản phẩm */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "20px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                    }}
                >
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a", marginBottom: "12px" }}>
                        + Thêm sản phẩm mới (Server Action)
                    </h3>

                    <form
                        id="create-form"
                        action={handleCreate}
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Tên sản phẩm"
                            style={{
                                flex: 2,
                                minWidth: "180px",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                border: "1px solid #cbd5e1",
                                fontSize: "0.85rem",
                            }}
                        />
                        <input
                            type="number"
                            name="price"
                            required
                            placeholder="Giá (VNĐ)"
                            style={{
                                flex: 1,
                                minWidth: "120px",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                border: "1px solid #cbd5e1",
                                fontSize: "0.85rem",
                            }}
                        />
                        <input
                            type="text"
                            name="category"
                            required
                            placeholder="Danh mục"
                            style={{
                                flex: 1,
                                minWidth: "120px",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                border: "1px solid #cbd5e1",
                                fontSize: "0.85rem",
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#16a34a",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Thêm
                        </button>
                    </form>
                </div>

                {/* Bảng sản phẩm */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                    }}
                >
                    <div style={{ padding: "14px 18px", borderBottom: "1px solid #e2e8f0", fontWeight: 600, color: "#334155" }}>
                        Danh sách sản phẩm ({products.length})
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                                <th style={{ padding: "10px 18px" }}>ID</th>
                                <th style={{ padding: "10px 18px" }}>Tên sản phẩm</th>
                                <th style={{ padding: "10px 18px" }}>Danh mục</th>
                                <th style={{ padding: "10px 18px" }}>Giá</th>
                                <th style={{ padding: "10px 18px", textAlign: "right" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "12px 18px", color: "#94a3b8" }}>{p.id}</td>
                                    <td style={{ padding: "12px 18px", fontWeight: 500, color: "#0f172a" }}>{p.name}</td>
                                    <td style={{ padding: "12px 18px", color: "#64748b" }}>{p.category}</td>
                                    <td style={{ padding: "12px 18px", color: "#16a34a", fontWeight: 600 }}>
                                        {p.price.toLocaleString("vi-VN")} đ
                                    </td>
                                    <td style={{ padding: "12px 18px", textAlign: "right" }}>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(p.id, p.name)}
                                            disabled={isPending}
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: "#fee2e2",
                                                border: "1px solid #fca5a5",
                                                borderRadius: "4px",
                                                color: "#dc2626",
                                                fontSize: "0.75rem",
                                                fontWeight: 600,
                                                cursor: isPending ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            Xóa (Admin)
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

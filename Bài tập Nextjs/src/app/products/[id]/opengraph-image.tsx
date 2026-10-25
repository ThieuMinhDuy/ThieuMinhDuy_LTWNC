import { ImageResponse } from "next/og";
import { getProduct } from "@/lib/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function Image({ params }: Props) {
    const { id } = await params;
    const product = getProduct(id);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "60px",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Header Tag */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                        style={{
                            padding: "8px 24px",
                            backgroundColor: "#2563eb",
                            borderRadius: "9999px",
                            fontSize: "22px",
                            fontWeight: 700,
                            letterSpacing: "1px",
                        }}
                    >
                        PTIT SHOP
                    </div>
                    <div style={{ fontSize: "22px", color: "#94a3b8" }}>
                        {product?.category ? `Danh mục: ${product.category}` : "Chính Hãng • Bảo Hành 12T"}
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ fontSize: "52px", fontWeight: 800, lineHeight: 1.2, color: "#ffffff" }}>
                        {product?.name || "Thiết Bị Công Nghệ Cao Cấp"}
                    </div>
                    <div
                        style={{
                            fontSize: "24px",
                            color: "#94a3b8",
                            lineHeight: 1.4,
                            maxWidth: "950px",
                        }}
                    >
                        {product?.description || "Xem chi tiết thông số kỹ thuật và ưu đãi tại PTIT Shop."}
                    </div>
                </div>

                {/* Footer Bar */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "2px solid #334155",
                        paddingTop: "24px",
                    }}
                >
                    <div style={{ fontSize: "40px", fontWeight: 800, color: "#38bdf8" }}>
                        {product ? `${product.price.toLocaleString("vi-VN")} đ` : ""}
                    </div>
                    <div style={{ fontSize: "22px", color: "#94a3b8" }}>
                        Next.js RBAC &amp; SEO Project • PTIT
                    </div>
                </div>
            </div>
        ),
        size
    );
}

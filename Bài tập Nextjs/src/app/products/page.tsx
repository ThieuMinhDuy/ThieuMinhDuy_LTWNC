import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { Star, ShieldCheck, ArrowRight, Laptop, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Danh Mục Sản Phẩm Công Nghệ Chính Hãng",
    description: "Khám phá danh mục các thiết bị công nghệ chính hãng: Laptop ThinkPad, bàn phím cơ Keychron, màn hình Dell UltraSharp tại PTIT Shop.",
    alternates: {
        canonical: "/products",
    },
    openGraph: {
        title: "Danh Mục Sản Phẩm Công Nghệ | PTIT Shop",
        description: "Thiết bị công nghệ đỉnh cao bảo hành chính hãng. Mua sắm an toàn, bảo mật.",
        url: "/products",
    },
};

export default function ProductsPage() {
    const products = getProducts();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // JSON-LD Structured Data: BreadcrumbList + ItemList
    const jsonLdBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": appUrl,
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Sản phẩm",
                "item": `${appUrl}/products`,
            },
        ],
    };

    const jsonLdItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Danh mục sản phẩm PTIT Shop",
        "description": "Danh sách các thiết bị công nghệ chính hãng",
        "numberOfItems": products.length,
        "itemListElement": products.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${appUrl}/products/${product.id}`,
            "name": product.name,
        })),
    };

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
            {/* Nhúng Structured Data JSON-LD chuẩn SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
            />

            {/* Breadcrumb trực quan */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "24px" }}>
                <ol style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: "#64748b", listStyle: "none", padding: 0 }}>
                    <li>
                        <Link href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Trang chủ</Link>
                    </li>
                    <li>/</li>
                    <li style={{ color: "#0f172a", fontWeight: "600" }}>Sản phẩm</li>
                </ol>
            </nav>

            {/* Hero Banner Header */}
            <header style={{ marginBottom: "36px", padding: "28px", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", backgroundColor: "#eff6ff", color: "#2563eb", borderRadius: "9999px", fontSize: "13px", fontWeight: "600", marginBottom: "16px" }}>
                    <Sparkles size={16} /> Trang Công Khai Chuẩn SEO
                </div>
                <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "10px", lineHeight: 1.3 }}>
                    Danh Mục Thiết Bị Công Nghệ Chính Hãng
                </h1>
                <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "700px", lineHeight: "1.6", margin: 0 }}>
                    Trang sản phẩm công khai được tối ưu hóa toàn diện với thẻ Canonical, thẻ Open Graph, dữ liệu có cấu trúc JSON-LD và Sitemap XML.
                </p>
            </header>

            {/* Product Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "24px" }}>
                {products.map((product) => (
                    <article
                        key={product.id}
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "14px",
                            border: "1px solid #e2e8f0",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                    >
                        {/* Ảnh sản phẩm */}
                        <div style={{ height: "200px", width: "100%", overflow: "hidden", backgroundColor: "#f8fafc", position: "relative" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", color: "#475569", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                                {product.category}
                            </span>
                        </div>

                        {/* Thông tin */}
                        <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                                <div style={{ display: "flex", color: "#eab308" }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#eab308" : "none"} />
                                    ))}
                                </div>
                                <span style={{ fontSize: "12px", color: "#64748b" }}>({product.reviewCount})</span>
                            </div>

                            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "8px", lineHeight: "1.4" }}>
                                <Link href={`/products/${product.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                    {product.name}
                                </Link>
                            </h2>

                            <p style={{ color: "#64748b", fontSize: "13px", lineHeight: "1.5", marginBottom: "16px", flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                {product.description}
                            </p>

                            <div style={{ paddingTop: "12px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Giá chính hãng</div>
                                    <div style={{ fontSize: "18px", fontWeight: "800", color: "#2563eb" }}>
                                        {product.price.toLocaleString("vi-VN")} đ
                                    </div>
                                </div>
                                <Link
                                    href={`/products/${product.id}`}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        padding: "8px 14px",
                                        backgroundColor: "#f8fafc",
                                        color: "#0f172a",
                                        borderRadius: "8px",
                                        border: "1px solid #cbd5e1",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                    }}
                                >
                                    Chi tiết <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

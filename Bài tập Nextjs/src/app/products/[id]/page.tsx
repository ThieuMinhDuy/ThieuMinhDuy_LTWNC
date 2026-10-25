import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getProduct, getProducts } from "@/lib/products";
import { Star, ShieldCheck, Truck, RefreshCw, ArrowLeft, ExternalLink, Sparkles, ShoppingCart, Settings } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
    params: Promise<{ id: string }>;
}

// Tối ưu hóa SEO với generateMetadata động
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        return {
            title: "Không tìm thấy sản phẩm",
        };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const canonicalUrl = `/products/${product.id}`;

    return {
        title: `${product.name} - Giá Tốt Chính Hãng`,
        description: product.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${product.name} | PTIT Shop`,
            description: product.description,
            url: canonicalUrl,
            siteName: "PTIT Shop",
            images: [
                {
                    url: `${appUrl}/products/${product.id}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: product.name,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} | PTIT Shop`,
            description: product.description,
            images: [`${appUrl}/products/${product.id}/opengraph-image`],
        },
    };
}

// Cho phép SSG / ISR sinh tĩnh trước các trang chi tiết sản phẩm
export async function generateStaticParams() {
    const products = getProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = getProduct(id);

    if (!product) {
        notFound();
    }

    const session = await auth();
    const user = session?.user;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Structured Data 1: BreadcrumbList (Slide 32)
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
            {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": `${appUrl}/products/${product.id}`,
            },
        ],
    };

    // Structured Data 2: Product + Offer + AggregateRating (Slide 32)
    const jsonLdProduct = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": [product.image],
        "description": product.description,
        "sku": product.id,
        "mpn": product.id,
        "brand": {
            "@type": "Brand",
            "name": product.category,
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating.toString(),
            "reviewCount": product.reviewCount.toString(),
        },
        "offers": {
            "@type": "Offer",
            "url": `${appUrl}/products/${product.id}`,
            "priceCurrency": "VND",
            "price": product.price.toString(),
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "Organization",
                "name": "PTIT Shop",
            },
        },
    };

    return (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
            {/* Nhúng Structured Data JSON-LD theo đúng chuẩn Schema.org */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
            />

            {/* Breadcrumb trực quan */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "24px" }}>
                <ol style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: "#64748b", listStyle: "none", padding: 0 }}>
                    <li>
                        <Link href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Trang chủ</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link href="/products" style={{ color: "#2563eb", textDecoration: "none" }}>Sản phẩm</Link>
                    </li>
                    <li>/</li>
                    <li style={{ color: "#0f172a", fontWeight: "600" }}>{product.name}</li>
                </ol>
            </nav>

            {/* Thông báo tính năng SEO */}
            <div style={{ marginBottom: "24px", padding: "14px 20px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#166534" }}>
                    <Sparkles size={16} />
                    <span><strong>SEO Tối Ưu:</strong> Canonical: <code>/products/{product.id}</code> • JSON-LD Schema: <code>Product + Offer + BreadcrumbList</code></span>
                </div>
                <a
                    href={`/products/${product.id}/opengraph-image`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "12px", color: "#15803d", fontWeight: "600", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                    Xem ảnh OG động sinh bởi next/og <ExternalLink size={12} />
                </a>
            </div>

            {/* Khung chi tiết sản phẩm */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                {/* Cột ảnh */}
                <div>
                    <div style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#f8fafc", border: "1px solid #f1f5f9" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "100%", height: "360px", objectFit: "cover" }}
                        />
                    </div>
                    <div style={{ marginTop: "16px", display: "flex", gap: "16px", fontSize: "13px", color: "#64748b" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <ShieldCheck size={16} color="#16a34a" /> Bảo hành 12 tháng
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <Truck size={16} color="#2563eb" /> Giao hàng toàn quốc
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <RefreshCw size={16} color="#0891b2" /> Đổi trả 7 ngày
                        </span>
                    </div>
                </div>

                {/* Cột thông tin */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "inline-block", alignSelf: "flex-start", padding: "4px 12px", backgroundColor: "#eff6ff", color: "#2563eb", borderRadius: "6px", fontSize: "12px", fontWeight: "700", marginBottom: "12px" }}>
                        {product.category.toUpperCase()}
                    </div>

                    <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", lineHeight: "1.3" }}>
                        {product.name}
                    </h1>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                        <div style={{ display: "flex", color: "#eab308" }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#eab308" : "none"} />
                            ))}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>{product.rating}</span>
                        <span style={{ fontSize: "14px", color: "#64748b" }}>({product.reviewCount} đánh giá tích cực)</span>
                        <span style={{ marginLeft: "auto", fontSize: "13px", color: "#16a34a", fontWeight: "600", backgroundColor: "#dcfce7", padding: "2px 8px", borderRadius: "4px" }}>
                            Còn {product.stock} sản phẩm
                        </span>
                    </div>

                    <div style={{ padding: "16px 20px", backgroundColor: "#f8fafc", borderRadius: "10px", marginBottom: "24px" }}>
                        <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Giá bán niêm yết:</span>
                        <div style={{ fontSize: "28px", fontWeight: "800", color: "#2563eb" }}>
                            {product.price.toLocaleString("vi-VN")} đ
                        </div>
                    </div>

                    <div style={{ marginBottom: "28px" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>Mô tả sản phẩm:</h3>
                        <p style={{ color: "#475569", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
                            {product.description}
                        </p>
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
                        {/* Nút chọn số lượng, Thêm vào giỏ hàng và Mua ngay */}
                        <AddToCartButton product={product} user={user} />

                        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", paddingTop: "8px", borderTop: "1px solid #f1f5f9" }}>
                            {user?.role === "admin" && (
                                <Link
                                    href="/admin"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "8px 16px",
                                        backgroundColor: "#fee2e2",
                                        color: "#dc2626",
                                        borderRadius: "6px",
                                        fontWeight: "600",
                                        fontSize: "13px",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Settings size={14} /> Quản lý (Trang Admin)
                                </Link>
                            )}

                            <Link
                                href="/products"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    padding: "8px 16px",
                                    backgroundColor: "#ffffff",
                                    color: "#64748b",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "6px",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    textDecoration: "none",
                                }}
                            >
                                <ArrowLeft size={14} /> Quay lại danh mục
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

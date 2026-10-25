"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Check, Plus, Minus, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";

interface AddToCartButtonProps {
    product: Product;
    user?: {
        name?: string | null;
        email?: string | null;
        role?: string;
    } | null;
}

export default function AddToCartButton({ product, user }: AddToCartButtonProps) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (redirectAfter = false) => {
        if (!user) {
            router.push(`/login?callbackUrl=/products/${product.id}`);
            return;
        }

        try {
            // Đọc giỏ hàng hiện tại từ localStorage
            const savedCart = localStorage.getItem("ptit_cart");
            let cartItems: Array<Product & { quantity: number }> = savedCart ? JSON.parse(savedCart) : [];

            const existingIndex = cartItems.findIndex((item) => item.id === product.id);
            if (existingIndex > -1) {
                cartItems[existingIndex].quantity += quantity;
            } else {
                cartItems.push({ ...product, quantity });
            }

            localStorage.setItem("ptit_cart", JSON.stringify(cartItems));

            // Kích hoạt sự kiện để Navbar hoặc component khác cập nhật
            window.dispatchEvent(new Event("cart_updated"));

            if (redirectAfter) {
                router.push("/dashboard");
            } else {
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 2500);
            }
        } catch (e) {
            console.error("Lỗi cập nhật giỏ hàng:", e);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            {/* Bộ chọn số lượng */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>Số lượng:</span>
                <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden", backgroundColor: "#ffffff" }}>
                    <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        disabled={quantity <= 1}
                        style={{
                            padding: "8px 12px",
                            backgroundColor: "#f8fafc",
                            border: "none",
                            cursor: quantity > 1 ? "pointer" : "not-allowed",
                            color: "#475569",
                            display: "flex",
                            alignItems: "center",
                        }}
                        aria-label="Giảm số lượng"
                    >
                        <Minus size={14} />
                    </button>
                    <span style={{ minWidth: "40px", textAlign: "center", fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                        disabled={quantity >= product.stock}
                        style={{
                            padding: "8px 12px",
                            backgroundColor: "#f8fafc",
                            border: "none",
                            cursor: quantity < product.stock ? "pointer" : "not-allowed",
                            color: "#475569",
                            display: "flex",
                            alignItems: "center",
                        }}
                        aria-label="Tăng số lượng"
                    >
                        <Plus size={14} />
                    </button>
                </div>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                    (Còn {product.stock} sản phẩm)
                </span>
            </div>

            {/* Các nút hành động */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", width: "100%" }}>
                {/* Nút Thêm vào giỏ hàng */}
                <button
                    type="button"
                    onClick={() => handleAddToCart(false)}
                    style={{
                        flex: 1,
                        minWidth: "180px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "12px 20px",
                        backgroundColor: isAdded ? "#16a34a" : "#ffffff",
                        color: isAdded ? "#ffffff" : "#2563eb",
                        border: isAdded ? "1px solid #16a34a" : "2px solid #2563eb",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                    }}
                >
                    {isAdded ? (
                        <>
                            <Check size={18} /> Đã thêm vào giỏ hàng!
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={18} /> Thêm vào giỏ hàng
                        </>
                    )}
                </button>

                {/* Nút Mua ngay (Thêm và chuyển thẳng vào Dashboard thanh toán) */}
                <button
                    type="button"
                    onClick={() => handleAddToCart(true)}
                    style={{
                        flex: 1,
                        minWidth: "180px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "12px 20px",
                        backgroundColor: "#2563eb",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}
                >
                    Mua ngay <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}

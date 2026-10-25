"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle, CreditCard, Package } from "lucide-react";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface UserProps {
    user: {
        name?: string | null;
        email?: string | null;
        role?: string;
    };
}

// Danh sách sản phẩm mẫu sử dụng thẻ <img> với ảnh độ phân giải cao (chưa tối ưu)
const STORE_PRODUCTS: Product[] = [
    {
        id: "sp1",
        name: "Laptop ThinkPad T14 Gen 4",
        price: 24500000,
        category: "Laptop",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1600&auto=format&fit=crop&q=80",
        description: "Intel Core i7-1355U, 16GB RAM, 512GB SSD, màn hình 14 inch FHD+",
    },
    {
        id: "sp2",
        name: "Bàn phím cơ Keychron Q1 Pro",
        price: 4350000,
        category: "Bàn phím",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1600&auto=format&fit=crop&q=80",
        description: "Khung nhôm CNC nguyên khối, kết nối Bluetooth 5.1 & Type-C, gõ cực êm",
    },
    {
        id: "sp3",
        name: "Màn hình Dell UltraSharp 27 4K",
        price: 13900000,
        category: "Màn hình",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1600&auto=format&fit=crop&q=80",
        description: "Tấm nền IPS Black, độ bao phủ 100% sRGB, hỗ trợ sạc ngược Type-C 90W",
    },
    {
        id: "sp4",
        name: "Chuột không dây Logitech MX Master 3S",
        price: 2200000,
        category: "Phụ kiện",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1600&auto=format&fit=crop&q=80",
        description: "Cảm biến 8000 DPI, cuộn MagSpeed siêu tốc, bấm click tĩnh âm 90%",
    },
    {
        id: "sp5",
        name: "Tai nghe Sony WH-1000XM5",
        price: 8490000,
        category: "Âm thanh",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=80",
        description: "Chống ồn chủ động đỉnh cao, thời lượng pin 30 giờ, âm thanh Hi-Res Audio",
    },
    {
        id: "sp6",
        name: "Apple Watch Series 9",
        price: 9990000,
        category: "Đồng hồ",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1600&auto=format&fit=crop&q=80",
        description: "Chip S9 SiP siêu mạnh, màn hình sáng 2000 nits, theo dõi sức khỏe chuyên sâu",
    },
];

export default function UserView({ user }: UserProps) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOrdered, setIsOrdered] = useState(false);

    // Đọc giỏ hàng từ localStorage khi khởi tạo
    useEffect(() => {
        try {
            const saved = localStorage.getItem("ptit_cart");
            if (saved) {
                setCart(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Lỗi đọc giỏ hàng từ localStorage:", e);
        }
    }, []);

    // Lưu giỏ hàng vào localStorage khi có thay đổi
    const saveCartToStorage = (newCart: CartItem[]) => {
        try {
            localStorage.setItem("ptit_cart", JSON.stringify(newCart));
            window.dispatchEvent(new Event("cart_updated"));
        } catch (e) {
            console.error("Lỗi lưu giỏ hàng:", e);
        }
    };

    // Thêm vào giỏ
    const addToCart = (product: Product) => {
        setIsOrdered(false);
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            let updated: CartItem[];
            if (existing) {
                updated = prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updated = [...prev, { ...product, quantity: 1 }];
            }
            saveCartToStorage(updated);
            return updated;
        });
    };

    // Giảm số lượng
    const decreaseQuantity = (productId: string) => {
        setCart((prev) => {
            const updated = prev
                .map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0);
            saveCartToStorage(updated);
            return updated;
        });
    };

    // Tăng số lượng
    const increaseQuantity = (productId: string) => {
        setCart((prev) => {
            const updated = prev.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
            saveCartToStorage(updated);
            return updated;
        });
    };

    // Xóa khỏi giỏ
    const removeFromCart = (productId: string) => {
        setCart((prev) => {
            const updated = prev.filter((item) => item.id !== productId);
            saveCartToStorage(updated);
            return updated;
        });
    };

    // Tổng tiền
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Thanh toán
    const handleCheckout = () => {
        if (cart.length === 0) return;
        setIsOrdered(true);
        setCart([]);
        try {
            localStorage.removeItem("ptit_cart");
            window.dispatchEvent(new Event("cart_updated"));
        } catch (e) {}
    };

    return (
        <div className="container" style={{ maxWidth: "1050px", margin: "24px auto" }}>
            {/* Thanh thông tin User gọn gàng */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    padding: "16px 20px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                }}
            >
                <div>
                    <h1 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a" }}>
                        Cửa hàng trực tuyến (Trang User)
                    </h1>
                    <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "2px" }}>
                        Tài khoản: <strong>{user.name}</strong> ({user.email})
                    </p>
                </div>
                <span
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "4px",
                        backgroundColor: "#e0f2fe",
                        color: "#0284c7",
                    }}
                >
                    ROLE: {user.role?.toUpperCase() || "USER"}
                </span>
            </div>

            {/* Bố cục 2 cột: Danh sách sản phẩm & Giỏ hàng */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>
                {/* Cột 1: Danh sách sản phẩm */}
                <div>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <Package size={18} color="#2563eb" />
                        Danh sách sản phẩm công nghệ ({STORE_PRODUCTS.length})
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                        {STORE_PRODUCTS.map((p) => (
                            <div
                                key={p.id}
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "8px",
                                    border: "1px solid #e2e8f0",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {/* Dùng thẻ <img> chưa tối ưu kích thước để tạo tải trang thực tế */}
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    style={{
                                        width: "100%",
                                        height: "170px",
                                        objectFit: "cover",
                                        backgroundColor: "#f1f5f9",
                                    }}
                                />
                                <div style={{ padding: "14px", display: "flex", flexDirection: "column", flex: 1 }}>
                                    <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>
                                        {p.category}
                                    </span>
                                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#0f172a", margin: "4px 0 6px", lineHeight: 1.4 }}>
                                        {p.name}
                                    </h3>
                                    <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.5, marginBottom: "12px", flex: 1 }}>
                                        {p.description}
                                    </p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid #f1f5f9" }}>
                                        <span style={{ fontWeight: 700, color: "#16a34a", fontSize: "0.95rem" }}>
                                            {p.price.toLocaleString("vi-VN")} đ
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => addToCart(p)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                padding: "6px 12px",
                                                backgroundColor: "#2563eb",
                                                color: "#ffffff",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                            }}
                                        >
                                            <ShoppingCart size={14} />
                                            <span>Thêm</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cột 2: Giỏ hàng & Thanh toán */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        padding: "20px",
                        position: "sticky",
                        top: "70px",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #e2e8f0" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                            <ShoppingCart size={18} color="#2563eb" />
                            Giỏ hàng của bạn
                        </h3>
                        <span style={{ fontSize: "0.8rem", backgroundColor: "#f1f5f9", padding: "2px 8px", borderRadius: "999px", color: "#475569", fontWeight: 600 }}>
                            {cart.reduce((total, i) => total + i.quantity, 0)} món
                        </span>
                    </div>

                    {isOrdered && (
                        <div
                            style={{
                                backgroundColor: "#f0fdf4",
                                border: "1px solid #bbf7d0",
                                color: "#16a34a",
                                padding: "12px",
                                borderRadius: "6px",
                                marginBottom: "16px",
                                fontSize: "0.85rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <CheckCircle size={18} />
                            <span>Đặt hàng thành công! Đơn hàng đang được xử lý.</span>
                        </div>
                    )}

                    {cart.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "30px 10px", color: "#94a3b8", fontSize: "0.85rem" }}>
                            Giỏ hàng đang trống. Hãy bấm &quot;Thêm&quot; sản phẩm ở bên trái!
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px", maxHeight: "300px", overflowY: "auto" }}>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #f1f5f9",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    <div style={{ flex: 1, paddingRight: "8px" }}>
                                        <div style={{ fontWeight: 600, color: "#0f172a", marginBottom: "2px" }}>
                                            {item.name}
                                        </div>
                                        <div style={{ color: "#16a34a", fontWeight: 500, fontSize: "0.8rem" }}>
                                            {item.price.toLocaleString("vi-VN")} đ
                                        </div>
                                    </div>

                                    {/* Nút tăng/giảm số lượng */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                        <button
                                            type="button"
                                            onClick={() => decreaseQuantity(item.id)}
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "4px",
                                                border: "1px solid #cbd5e1",
                                                backgroundColor: "#f8fafc",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span style={{ fontWeight: 600, minWidth: "16px", textAlign: "center" }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => increaseQuantity(item.id)}
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "4px",
                                                border: "1px solid #cbd5e1",
                                                backgroundColor: "#f8fafc",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Plus size={12} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            style={{
                                                marginLeft: "4px",
                                                color: "#dc2626",
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tổng cộng & Thanh toán */}
                    {cart.length > 0 && (
                        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                                <span style={{ color: "#64748b", fontSize: "0.9rem" }}>Tổng thanh toán:</span>
                                <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "#16a34a" }}>
                                    {totalAmount.toLocaleString("vi-VN")} đ
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleCheckout}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "#16a34a",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    fontSize: "0.9rem",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                }}
                            >
                                <CreditCard size={16} />
                                <span>Thanh toán ngay</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

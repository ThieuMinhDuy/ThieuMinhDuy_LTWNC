export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    rating: number;
    reviewCount: number;
    stock: number;
}

export const PRODUCTS: Product[] = [
    {
        id: "sp1",
        name: "Laptop ThinkPad T14 Gen 4",
        price: 24500000,
        category: "Laptop",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
        description: "Intel Core i7-1355U, 16GB RAM, 512GB SSD, màn hình 14 inch FHD+ độ sáng 400 nits, chuẩn doanh nhân bền bỉ.",
        rating: 4.8,
        reviewCount: 38,
        stock: 12,
    },
    {
        id: "sp2",
        name: "Bàn phím cơ Keychron Q1 Pro",
        price: 4350000,
        category: "Bàn phím",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80",
        description: "Khung nhôm CNC nguyên khối, kết nối Bluetooth 5.1 & Type-C, mạch hotswap, gõ cực êm chuẩn custom cao cấp.",
        rating: 4.9,
        reviewCount: 52,
        stock: 25,
    },
    {
        id: "sp3",
        name: "Màn hình Dell UltraSharp 27 4K",
        price: 13900000,
        category: "Màn hình",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
        description: "Tấm nền IPS Black độ tương phản 2000:1, độ phủ màu 100% sRGB & 98% DCI-P3, hỗ trợ sạc ngược Type-C 90W tiện lợi.",
        rating: 4.9,
        reviewCount: 29,
        stock: 8,
    },
    {
        id: "sp4",
        name: "Chuột không dây Logitech MX Master 3S",
        price: 2200000,
        category: "Phụ kiện",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
        description: "Cảm biến Darkfield 8000 DPI hoạt động trên mọi bề mặt, cuộn điện từ MagSpeed siêu tốc, giảm 90% tiếng ồn click.",
        rating: 4.7,
        reviewCount: 94,
        stock: 40,
    },
];

export function getProducts(): Product[] {
    return PRODUCTS;
}

export function getProduct(id: string): Product | undefined {
    return PRODUCTS.find((p) => p.id === id);
}

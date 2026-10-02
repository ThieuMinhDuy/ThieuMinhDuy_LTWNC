import { memo } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
}

function PerformanceProductCard({
    product,
    onAdd,
}: ProductCardProps) {
    return (
        <div className="performance-product-card">
            <div className="product-number">
                #{product.id}
            </div>

            <h3>{product.name}</h3>

            <p className="performance-price">
                ${product.price}
            </p>

            <button onClick={() => onAdd(product)}>
                Thêm vào giỏ
            </button>
        </div>
    );
}

export default memo(PerformanceProductCard);
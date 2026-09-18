import { useAppDispatch } from "../../app/hooks";
import { addItem } from "../../features/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import "./ProductList.css";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductListProps {
    products: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    currentPage: number;
    totalPages: number;
    gotoPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
}

export default function ProductList({
    products,
    status,
    error,
    currentPage,
    totalPages,
    gotoPage,
    nextPage,
    prevPage,
}: ProductListProps) {
    const dispatch = useAppDispatch();

    if (status === "loading") {
        return <div className="product-list-message">Đang tải sản phẩm...</div>;
    }

    if (status === "failed") {
        return <div className="product-list-message error">{error}</div>;
    }

    if (status !== "succeeded") {
        return null;
    }

    return (
        <div className="product-list-container">
            <h2>Danh sách sản phẩm</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <button
                                className="add-to-cart-btn"
                                onClick={() =>
                                    dispatch(
                                        addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            quantity: 1,
                                            image: product.image,
                                        })
                                    )
                                }
                            >
                                <ShoppingCart size={16} /> Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={currentPage === index + 1 ? "active" : ""}
                            onClick={() => gotoPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            <p className="page-info">
                Trang {currentPage} / {totalPages}
            </p>
        </div>
    );
}

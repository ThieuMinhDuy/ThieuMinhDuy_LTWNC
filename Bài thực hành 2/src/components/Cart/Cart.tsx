import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeItem, updateQuantity } from "../../features/cart/cartSlice";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import "./Cart.css";

export default function Cart() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>
                    <ShoppingBag size={20} /> Giỏ hàng
                </h2>
                <span className="cart-count">{cartItems.length}</span>
            </div>

            {cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Giỏ hàng đang trống</p>
                </div>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4 className="cart-item-name">{item.name}</h4>
                                <p className="cart-item-price">${item.price}</p>
                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    dispatch(
                                                        updateQuantity({
                                                            id: item.id,
                                                            quantity: item.quantity - 1,
                                                        })
                                                    );
                                                }
                                            }}
                                            disabled={item.quantity <= 1}
                                            className="qty-btn"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    updateQuantity({
                                                        id: item.id,
                                                        quantity: item.quantity + 1,
                                                    })
                                                )
                                            }
                                            className="qty-btn"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeItem(item.id))}
                                        className="remove-btn"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Tổng cộng:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn">Thanh toán</button>
                </div>
            )}
        </div>
    );
}

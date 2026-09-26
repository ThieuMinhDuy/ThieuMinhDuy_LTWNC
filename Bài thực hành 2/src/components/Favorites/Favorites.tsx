import { Heart, Trash2 } from "lucide-react";
import useFavoritesStore from "../../features/favorites/favoritesStore";
import "./Favorites.css";

export default function Favorites() {
    const favoriteItems = useFavoritesStore((state) => state.items);
    const removeFavorite = useFavoritesStore(
        (state) => state.removeFavorite
    );

    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <h2>
                    <Heart size={20} />
                    Sản phẩm yêu thích
                </h2>

                <span className="favorites-count">
                    {favoriteItems.length}
                </span>
            </div>

            {favoriteItems.length === 0 ? (
                <div className="favorites-empty">
                    <Heart size={32} />
                    <p>Chưa có sản phẩm yêu thích</p>
                </div>
            ) : (
                <div className="favorites-items">
                    {favoriteItems.map((item) => (
                        <div
                            key={item.id}
                            className="favorite-item"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="favorite-item-image"
                            />

                            <div className="favorite-item-details">
                                <h4 className="favorite-item-name">
                                    {item.name}
                                </h4>

                                <p className="favorite-item-price">
                                    ${item.price}
                                </p>
                            </div>

                            <button
                                className="favorite-remove-btn"
                                onClick={() =>
                                    removeFavorite(item.id)
                                }
                                title="Bỏ yêu thích"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
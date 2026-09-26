import { create } from "zustand";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface FavoritesState {
    items: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: number) => void;
}

const useFavoritesStore = create<FavoritesState>((set) => ({
    items: [],

    addFavorite: (product) =>
        set((state) => {
            const exists = state.items.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return state;
            }

            return {
                items: [...state.items, product],
            };
        }),

    removeFavorite: (productId) =>
        set((state) => ({
            items: state.items.filter(
                (item) => item.id !== productId
            ),
        })),
}));

export default useFavoritesStore;
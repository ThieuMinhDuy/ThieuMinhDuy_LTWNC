import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductsState {
    items: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    status: "idle",
    error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
    "products/fetchProducts",
    async () => {
        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
            throw new Error("Không thể lấy danh sách sản phẩm");
        }

        const data = await response.json();

        return data.map((product: {
            id: number;
            title: string;
            price: number;
            image: string;
        }) => ({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.image,
        }));
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Có lỗi xảy ra";
            });
    },
});

export default productsSlice.reducer;
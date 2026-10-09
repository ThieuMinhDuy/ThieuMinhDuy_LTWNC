
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "./productsSlice";

import {
    describe,
    it,
    expect,
    beforeEach,
    afterEach,
    jest,
} from "@jest/globals";

describe("productsSlice", () => {
    const originalFetch = globalThis.fetch;

    const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;

    beforeEach(() => {
        mockFetch.mockReset();
        globalThis.fetch = mockFetch;
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
        jest.clearAllMocks();
    });

    // Test 1: Khởi tạo state mặc định
    it("khởi tạo danh sách sản phẩm rỗng", () => {
        const state = productsReducer(undefined, {
            type: "unknown",
        });

        expect(state.items).toEqual([]);
        expect(state.status).toBe("idle");
        expect(state.error).toBeNull();
    });

    // Test 2: Chuyển sang trạng thái loading
    it("chuyển status thành loading khi bắt đầu tải", () => {
        const initialState = productsReducer(undefined, {
            type: "unknown",
        });

        const state = productsReducer(
            { ...initialState, error: "Lỗi cũ" },
            fetchProducts.pending("request-1", undefined)
        );

        expect(state.status).toBe("loading");
        expect(state.error).toBeNull();
    });

    // Test 3: Lưu sản phẩm khi API thành công
    it("lưu danh sách sản phẩm khi fetch thành công", () => {
        const products = [
            {
                id: 1,
                name: "Áo khoác",
                price: 29.99,
                image: "jacket.jpg",
            },
        ];

        const state = productsReducer(
            undefined,
            fetchProducts.fulfilled(
                products,
                "request-2",
                undefined
            )
        );

        expect(state.status).toBe("succeeded");
        expect(state.items).toEqual(products);
        expect(state.error).toBeNull();
    });

    // Test 4: Lưu lỗi khi request thất bại
    it("chuyển status thành failed khi request thất bại", () => {
        const state = productsReducer(
            undefined,
            fetchProducts.rejected(
                new Error("Lỗi kết nối"),
                "request-3",
                undefined
            )
        );

        expect(state.status).toBe("failed");
        expect(state.error).toBe("Lỗi kết nối");
    });

    // Test 5: API thành công và ánh xạ đúng dữ liệu
    it("fetch và ánh xạ dữ liệu sản phẩm thành công", async () => {
        const apiProducts = [
            {
                id: 1,
                title: "Áo khoác",
                price: 29.99,
                image: "jacket.jpg",
            },
            {
                id: 2,
                title: "Áo phông",
                price: 15.5,
                image: "shirt.jpg",
            },
        ];

        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => apiProducts,
        } as unknown as Response);

        const store = configureStore({
            reducer: {
                products: productsReducer,
            },
        });

        await store.dispatch(fetchProducts());

        const state = store.getState().products;

        expect(mockFetch).toHaveBeenCalledWith(
            "https://fakestoreapi.com/products"
        );

        expect(state.status).toBe("succeeded");

        expect(state.items).toEqual([
            {
                id: 1,
                name: "Áo khoác",
                price: 29.99,
                image: "jacket.jpg",
            },
            {
                id: 2,
                name: "Áo phông",
                price: 15.5,
                image: "shirt.jpg",
            },
        ]);

        expect(state.error).toBeNull();
    });

    // Test 6: API trả về HTTP error
    it("xử lý khi API trả về response không thành công", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 500,
        } as Response);

        const store = configureStore({
            reducer: {
                products: productsReducer,
            },
        });

        await store.dispatch(fetchProducts());

        const state = store.getState().products;

        expect(state.status).toBe("failed");
        expect(state.error).toBe(
            "Không thể lấy danh sách sản phẩm"
        );
        expect(state.items).toEqual([]);
    });

    // Test 7: Lỗi kết nối mạng
    it("xử lý khi fetch phát sinh lỗi mạng", async () => {
        mockFetch.mockRejectedValue(
            new Error("Network error")
        );

        const store = configureStore({
            reducer: {
                products: productsReducer,
            },
        });

        await store.dispatch(fetchProducts());

        const state = store.getState().products;

        expect(state.status).toBe("failed");
        expect(state.error).toBe("Network error");
    });
});

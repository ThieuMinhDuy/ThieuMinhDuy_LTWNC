import { describe, it, expect } from "@jest/globals";
import cartReducer, {
    addItem,
    removeItem,
    updateQuantity,
} from "./cartSlice";

describe("cartSlice", () => {
    const product = {
        id: 1,
        name: "Áo thun",
        price: 100,
        quantity: 2,
        image: "/images/shirt.jpg",
    };

    // Test 1: Giỏ hàng ban đầu rỗng
    it("khởi tạo giỏ hàng rỗng", () => {
        const state = cartReducer(undefined, {
            type: "unknown",
        });

        expect(state.items).toEqual([]);
    });

    // Test 2: Thêm sản phẩm mới
    it("thêm sản phẩm mới vào giỏ hàng", () => {
        const state = cartReducer(
            undefined,
            addItem(product)
        );

        expect(state.items).toHaveLength(1);
        expect(state.items[0]).toEqual(product);
    });

    // Test 3: Thêm sản phẩm đã tồn tại
    it("cộng số lượng khi thêm sản phẩm đã tồn tại", () => {
        const initialState = {
            items: [product],
        };

        const state = cartReducer(
            initialState,
            addItem({ ...product, quantity: 3 })
        );

        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(5);
    });

    // Test 4: Thêm sản phẩm khác
    it("cho phép thêm nhiều sản phẩm khác nhau", () => {
        const secondProduct = {
            ...product,
            id: 2,
            name: "Quần jean",
        };

        const state = cartReducer(
            { items: [product] },
            addItem(secondProduct)
        );

        expect(state.items).toHaveLength(2);
    });

    // Test 5: Xóa sản phẩm đang có
    it("xóa sản phẩm theo id", () => {
        const state = cartReducer(
            { items: [product] },
            removeItem(1)
        );

        expect(state.items).toEqual([]);
    });

    // Test 6: Xóa id không tồn tại
    it("không thay đổi giỏ hàng nếu id cần xóa không tồn tại", () => {
        const state = cartReducer(
            { items: [product] },
            removeItem(999)
        );

        expect(state.items).toEqual([product]);
    });

    // Test 7: Cập nhật số lượng
    it("cập nhật số lượng sản phẩm", () => {
        const state = cartReducer(
            { items: [product] },
            updateQuantity({ id: 1, quantity: 5 })
        );

        expect(state.items[0].quantity).toBe(5);
    });

    // Test 8: Cập nhật id không tồn tại
    it("không thay đổi giỏ hàng nếu id cập nhật không tồn tại", () => {
        const state = cartReducer(
            { items: [product] },
            updateQuantity({ id: 999, quantity: 5 })
        );

        expect(state.items).toEqual([product]);
    });
});

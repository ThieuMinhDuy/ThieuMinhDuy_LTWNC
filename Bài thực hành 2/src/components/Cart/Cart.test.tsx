
/** @jest-environment jsdom */

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Cart from "./Cart";
import cartReducer from "../../features/cart/cartSlice";
import productsReducer from "../../features/products/productsSlice";

jest.mock("./Cart.css", () => ({}));

interface TestCartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

function renderCart(items: TestCartItem[] = []) {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
            products: productsReducer,
        },
        preloadedState: {
            cart: { items },
            products: {
                items: [],
                status: "idle" as const,
                error: null,
            },
        },
    });

    const result = render(
        <Provider store={store}>
            <Cart />
        </Provider>
    );

    return { ...result, store };
}

const sampleItem: TestCartItem = {
    id: 1,
    name: "Áo khoác",
    price: 25,
    image: "jacket.jpg",
    quantity: 2,
};

describe("Cart integration tests", () => {
    // Test 1: Hiển thị giỏ hàng trống
    it("hiển thị thông báo khi giỏ hàng trống", () => {
        renderCart();

        expect(
            screen.getByText("Giỏ hàng đang trống")
        ).toBeInTheDocument();

        expect(
            screen.queryByRole("button", { name: "Thanh toán" })
        ).not.toBeInTheDocument();
    });

    // Test 2: Hiển thị sản phẩm và tổng tiền
    it("hiển thị thông tin sản phẩm và tổng tiền chính xác", () => {
        renderCart([sampleItem]);

        expect(screen.getByText("Áo khoác")).toBeInTheDocument();
        expect(screen.getByText("$25")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("$50.00")).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "Thanh toán" })
        ).toBeInTheDocument();
    });

    // Test 3: Tăng số lượng sản phẩm
    it("tăng số lượng và cập nhật tổng tiền khi nhấn nút cộng", () => {
        const { container } = renderCart([sampleItem]);

        const buttons = container.querySelectorAll<HTMLButtonElement>(
            ".quantity-controls .qty-btn"
        );

        fireEvent.click(buttons[1]);

        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("$75.00")).toBeInTheDocument();
    });

    // Test 4: Giảm số lượng sản phẩm
    it("giảm số lượng và cập nhật tổng tiền khi nhấn nút trừ", () => {
        const { container } = renderCart([sampleItem]);

        const buttons = container.querySelectorAll<HTMLButtonElement>(
            ".quantity-controls .qty-btn"
        );

        fireEvent.click(buttons[0]);

        expect(container.querySelector(".quantity")).toHaveTextContent("1");
        expect(screen.getByText("$25.00")).toBeInTheDocument();
    });

    // Test 5: Không cho giảm số lượng xuống dưới 1
    it("vô hiệu hóa nút trừ khi số lượng bằng 1", () => {
        const item = { ...sampleItem, quantity: 1 };
        const { container } = renderCart([item]);

        const minusButton = container.querySelector<HTMLButtonElement>(
            ".quantity-controls .qty-btn"
        )!;

        expect(minusButton).toBeDisabled();

        fireEvent.click(minusButton);

        expect(container.querySelector(".quantity")).toHaveTextContent("1");
        expect(screen.getByText("$25.00")).toBeInTheDocument();
    });

    // Test 6: Xóa sản phẩm khỏi giỏ hàng
    it("xóa sản phẩm và hiển thị trạng thái giỏ hàng trống", () => {
        const { container } = renderCart([sampleItem]);

        const removeButton = container.querySelector<HTMLButtonElement>(
            ".remove-btn"
        )!;

        fireEvent.click(removeButton);

        expect(
            screen.getByText("Giỏ hàng đang trống")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Áo khoác")
        ).not.toBeInTheDocument();

        expect(
            screen.queryByRole("button", { name: "Thanh toán" })
        ).not.toBeInTheDocument();
    });
});

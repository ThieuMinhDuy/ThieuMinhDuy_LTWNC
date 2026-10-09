
import { useState } from "react";
import PerformancePage from "../pages/PerformancePage";

import { useEffect } from "react";
import Accordion from "./components/Accordion/Accordion";
import usePagination from "./hooks/usePagination";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchProducts } from "./features/products/productsSlice";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import Favorites from "./components/Favorites/Favorites";
import "./App.css";

type Page = "performance" | "store";

function App() {
    const [currentPage, setCurrentPage] =
        useState<Page>("performance");

    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);
    const status = useAppSelector((state) => state.products.status);
    const error = useAppSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const {
        currentPage: productPage,
        totalPages,
        paginatedItems,
        gotoPage,
        nextPage,
        prevPage,
    } = usePagination(products, 6);

    return (
        <div>
            <nav
                style={{
                    display: "flex",
                    gap: "12px",
                    padding: "12px 24px",
                    backgroundColor: "#ffffff",
                    borderBottom: "1px solid #e2e8f0",
                }}
            >
                <button
                    onClick={() => setCurrentPage("performance")}
                    disabled={currentPage === "performance"}
                >
                    Bài tuần 5: 10.000 sản phẩm
                </button>

                <button
                    onClick={() => setCurrentPage("store")}
                    disabled={currentPage === "store"}
                >
                    Bài tuần 6: Giỏ hàng
                </button>
            </nav>

            {/* Trang bài tuần 5 */}
            {currentPage === "performance" && (
                <PerformancePage />
            )}

            {/* Trang cửa hàng và giỏ hàng */}
            {currentPage === "store" && (
                <div className="app-layout">
                    <header className="app-header">
                        <h1>Cửa hàng</h1>
                    </header>

                    <main className="app-main">
                        <section className="accordion-section">
                            <h2>Câu hỏi thường gặp (FAQ)</h2>

                            <Accordion>
                                <Accordion.Item id="1">
                                    <Accordion.Trigger>
                                        Chính sách giao hàng
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        Chúng tôi giao hàng toàn quốc với thời gian từ 3-5 ngày làm việc.
                                        Miễn phí vận chuyển cho đơn hàng trên $50.
                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item id="2">
                                    <Accordion.Trigger>
                                        Chính sách đổi trả
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        Bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng
                                        nếu sản phẩm còn nguyên tem mác và chưa qua sử dụng.
                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item id="3">
                                    <Accordion.Trigger>
                                        Hỗ trợ khách hàng
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        Tổng đài hỗ trợ khách hàng hoạt động 24/7.
                                        Vui lòng gọi số 1900 xxxx hoặc gửi email về cskh@cuahang.com
                                        để được giải đáp.
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion>
                        </section>

                        <section className="store-section">
                            <div className="store-products">
                                <ProductList
                                    products={paginatedItems}
                                    status={status}
                                    error={error}
                                    currentPage={productPage}
                                    totalPages={totalPages}
                                    gotoPage={gotoPage}
                                    nextPage={nextPage}
                                    prevPage={prevPage}
                                />
                            </div>

                            <div className="store-sidebar">
                                <Favorites />
                                <Cart />
                            </div>
                        </section>
                    </main>
                </div>
            )}
        </div>
    );
}

export default App;

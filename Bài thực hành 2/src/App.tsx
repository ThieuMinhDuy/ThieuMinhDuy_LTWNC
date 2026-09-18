import { useEffect } from "react";
import Accordion from "./components/Accordion/Accordion";
import usePagination from "./hooks/usePagination";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchProducts } from "./features/products/productsSlice";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import "./App.css";

function App() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);
    const status = useAppSelector((state) => state.products.status);
    const error = useAppSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const {
        currentPage,
        totalPages,
        paginatedItems,
        gotoPage,
        nextPage,
        prevPage,
    } = usePagination(products, 6); // Changed to 6 for a better grid

    return (
        <div className="app-layout">
            <header className="app-header">
                <h1>Cửa hàng</h1>
            </header>

            <main className="app-main">
                {/* ACCORDION - BÀI 2 */}
                <section className="accordion-section">
                    <h2>Câu hỏi thường gặp (FAQ)</h2>
                    <Accordion>
                        <Accordion.Item id="1">
                            <Accordion.Trigger>Chính sách giao hàng</Accordion.Trigger>
                            <Accordion.Content>
                                Chúng tôi giao hàng toàn quốc với thời gian từ 3-5 ngày làm việc.
                                Miễn phí vận chuyển cho đơn hàng trên $50.
                            </Accordion.Content>
                        </Accordion.Item>
                        <Accordion.Item id="2">
                            <Accordion.Trigger>Chính sách đổi trả</Accordion.Trigger>
                            <Accordion.Content>
                                Bạn có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng 
                                nếu sản phẩm còn nguyên tem mác và chưa qua sử dụng.
                            </Accordion.Content>
                        </Accordion.Item>
                        <Accordion.Item id="3">
                            <Accordion.Trigger>Hỗ trợ khách hàng</Accordion.Trigger>
                            <Accordion.Content>
                                Tổng đài hỗ trợ khách hàng hoạt động 24/7. Vui lòng gọi số 1900 xxxx 
                                hoặc gửi email về cskh@cuahang.com để được giải đáp.
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
                            currentPage={currentPage}
                            totalPages={totalPages}
                            gotoPage={gotoPage}
                            nextPage={nextPage}
                            prevPage={prevPage}
                        />
                    </div>
                    <div className="store-cart">
                        <Cart />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
import Accordion from "./components/Accordion/Accordion";
import usePagination from "./hooks/usePagination";

const products = [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Chuột", price: 500000 },
    { id: 3, name: "Bàn phím", price: 1000000 },
    { id: 4, name: "Tai nghe", price: 800000 },
    { id: 5, name: "Màn hình", price: 5000000 },
    { id: 6, name: "Webcam", price: 700000 },
    { id: 7, name: "USB", price: 200000 },
];

function App() {
    const {
        currentPage,
        totalPages,
        paginatedItems,
        gotoPage,
        nextPage,
        prevPage
    } = usePagination(products, 3);

    return (
        <div>
            <h1>Bài thực hành 2</h1>

            <Accordion>
                <Accordion.Item id="1">
                    <Accordion.Trigger>
                        Panel 1
                    </Accordion.Trigger>

                    <Accordion.Content>
                        Nội dung của Panel 1
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item id="2">
                    <Accordion.Trigger>
                        Panel 2
                    </Accordion.Trigger>

                    <Accordion.Content>
                        Nội dung của Panel 2
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item id="3">
                    <Accordion.Trigger>
                        Panel 3
                    </Accordion.Trigger>

                    <Accordion.Content>
                        Nội dung của Panel 3
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>

            <div>
                <h2>Danh sách sản phẩm</h2>

                <p>
                    Trang {currentPage} / {totalPages}
                </p>

                {paginatedItems.map((product) => (
                    <div key={product.id}>
                        <p>Tên: {product.name}</p>
                        <p>Giá: {product.price}</p>
                    </div>
                ))}

                <button onClick={prevPage}>
                    Previous
                </button>

                <button onClick={nextPage}>
                    Next
                </button>

                <div>
                    {Array.from(
                        { length: totalPages },
                        (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => gotoPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
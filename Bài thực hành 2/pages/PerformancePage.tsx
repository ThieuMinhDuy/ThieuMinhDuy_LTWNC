import { useCallback, type CSSProperties } from "react";
import { Grid } from "react-window";
import PerformanceProductCard from "../src/components/PerformanceProductCard/PerformanceProductCard";
import "./PerformancePage.css";

interface Product {
    id: number;
    name: string;
    price: number;
}

const products: Product[] = Array.from(
    { length: 10000 },
    (_, index) => ({
        id: index + 1,
        name: `Sản phẩm ${index + 1}`,
        price: Math.floor(Math.random() * 1000) + 1,
    })
);

const COLUMN_COUNT = 4;
const ROW_COUNT = Math.ceil(products.length / COLUMN_COUNT);

function PerformancePage() {
    const handleAddProduct = useCallback((product: Product) => {
        console.log("Thêm vào giỏ:", product.name);
    }, []);

    const Cell = ({
        columnIndex,
        rowIndex,
        style,
        ariaAttributes,
    }: {
        columnIndex: number;
        rowIndex: number;
        style: CSSProperties;
        ariaAttributes: {
            "aria-colindex": number;
            role: "gridcell";
        };
    }) => {
        const index = rowIndex * COLUMN_COUNT + columnIndex;
        const product = products[index];

        if (!product) {
            return null;
        }

        return (
            <div style={style} {...ariaAttributes}>
                <PerformanceProductCard
                    product={product}
                    onAdd={handleAddProduct}
                />
            </div>
        );
    };

    return (
        <div className="performance-page">
            <header className="performance-header">
                <h1>React Performance Test</h1>
                <p>
                    Trang kiểm tra hiệu năng với 10.000 sản phẩm
                </p>
            </header>

            <div className="performance-info">
                <strong>Tổng số sản phẩm:</strong>{" "}
                {products.length}
            </div>

            <div className="performance-grid-wrapper">
                <Grid
                    columnCount={COLUMN_COUNT}
                    rowCount={ROW_COUNT}
                    columnWidth={335}
                    rowHeight={180}
                    defaultWidth={1360}
                    defaultHeight={600}
                    cellComponent={Cell}
                    cellProps={{}}
                />
            </div>
        </div>
    );
}

export default PerformancePage;
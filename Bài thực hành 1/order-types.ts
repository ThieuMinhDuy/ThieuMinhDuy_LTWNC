interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface OrderItem {
    product: Product;
    quantity: number;
}

enum OrderStatus {
    Pending = "Pending",
    Processing = "Processing",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled"
}

interface Order {
    id: string;
    customer: Customer;
    items: OrderItem[];
    status: OrderStatus;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}


//Generic type
interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}

type OrderResponse = ApiResponse<Order>;

//Utility type
//Partial: Tất cả các thuộc tính của Product đều trở thành tùy chọn
type UpdateProduct = Partial<Product>;

//Omit: Loại bỏ id, createdAt và updatedAt khỏi Order vì các trường này sẽ được tự động sinh ra khi tạo đơn hàng mới
type CreateOrder = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>;

/*
Giải thích:
- Interface được sử dụng để định nghĩa cấu trúc của các đối tượng: Product, Customer, OrderItem và Order.
- Enum OrderStatus được sử dụng để định nghĩa các trạng thái của đơn hàng.
- Generic type ApiResponse<T> giúp tái sử dụng cấu trúc respone cho các loại dự liệu khác nhau, T có thể là Product, Customer, OrderItem hoặc Order.
- Utility type Partial<Product> được sử dụng để tạo ra kiểu UpdateProduct, khi cập nhật sản phẩm thì không nhất thiết phải điền đầy đủ các trường dữ liệu. Ví dụ như 
cập nhật tên sản phẩm thì chỉ cần điền trường name mà không cần điền các trường còn lại.
- Utility type Omit<Order, 'id' | 'createdAt' | 'updatedAt'> được sử dụng để tạo ra kiểu CreateOrder, khi tạo ra sản phẩm mới thì không cần điiền các trường id, createdAt và updatedAt 
vì các trường này sẽ được tự động sinh ra khi tạo đơn hàng mới.
*/
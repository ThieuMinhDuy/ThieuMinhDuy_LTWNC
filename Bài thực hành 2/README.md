# So sánh Zustand với Redux Toolkit

## Ưu điểm của Zustand

- Cách triển khai đơn giản, ít code hơn Redux Toolkit.
- Không cần tạo `slice`, `reducer`, `action` hay cấu hình `configureStore`.
- Component có thể truy cập trực tiếp vào `store` và gọi các action như `addFavorite`, `removeFavorite`.
- Phù hợp với những state đơn giản như danh sách sản phẩm yêu thích.

## Nhược điểm của Zustand

- Không có sẵn cơ chế `pending`, `fulfilled`, `rejected` như `createAsyncThunk` của Redux Toolkit.
- Với những ứng dụng có state phức tạp và nhiều module, Redux Toolkit có cấu trúc quản lý tập trung rõ ràng hơn.
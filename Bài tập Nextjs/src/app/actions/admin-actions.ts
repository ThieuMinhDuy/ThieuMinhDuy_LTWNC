"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { can } from "@/lib/permissions";

// Dữ liệu mẫu lưu trữ trên server (Mock database)
let productsDatabase = [
    {
        id: "p1",
        name: "Laptop ThinkPad T14 Gen 4",
        price: 24500000,
        category: "Laptop",
    },
    {
        id: "p2",
        name: "Bàn phím cơ Keychron Q1 Pro",
        price: 4350000,
        category: "Bàn phím",
    },
    {
        id: "p3",
        name: "Màn hình Dell UltraSharp 27 4K",
        price: 13900000,
        category: "Màn hình",
    },
    {
        id: "p4",
        name: "Chuột không dây Logitech MX Master 3S",
        price: 2200000,
        category: "Chuột",
    },
];

export async function getAdminProducts() {
    return productsDatabase;
}

// Schema kiểm định đầu vào với Zod
const DeleteProductSchema = z.object({
    id: z.string().min(1, "ID sản phẩm không được để trống"),
});

const CreateProductSchema = z.object({
    name: z.string().min(3, "Tên sản phẩm phải có ít nhất 3 ký tự"),
    price: z.coerce.number().positive("Giá phải lớn hơn 0"),
    category: z.string().min(2, "Danh mục không được để trống"),
});

/**
 * LỚP BẢO VỆ 3: Server Action xóa sản phẩm
 * - Xác thực phiên đăng nhập
 * - Kiểm tra vai trò admin (RBAC)
 * - Kiểm tra tính hợp lệ của dữ liệu đầu vào (Zod)
 */
export async function deleteProduct(formData: FormData) {
    const session = await auth();

    // 1. Kiểm tra phiên và phân quyền RBAC
    if (!session || !can(session.user.role, "product:delete")) {
        throw new Error(
            "403 Forbidden: Chỉ tài khoản Admin mới có quyền thực hiện thao tác xóa này!"
        );
    }

    // 2. Validate dữ liệu đầu vào bằng Zod
    const rawData = { id: formData.get("id") };
    const validated = DeleteProductSchema.safeParse(rawData);

    if (!validated.success) {
        throw new Error(validated.error.issues[0]?.message ?? "Dữ liệu không hợp lệ");
    }

    // 3. Thực thi nghiệp vụ
    productsDatabase = productsDatabase.filter((p) => p.id !== validated.data.id);

    // 4. Làm mới dữ liệu hiển thị trên trang
    revalidatePath("/admin");
    revalidatePath("/products");
    return { success: true, message: "Đã xóa sản phẩm thành công!" };
}

/**
 * LỚP BẢO VỆ 3: Server Action thêm sản phẩm
 */
export async function createProduct(formData: FormData) {
    const session = await auth();

    // 1. Kiểm tra phiên và phân quyền RBAC
    if (!session || !can(session.user.role, "product:write")) {
        throw new Error(
            "403 Forbidden: Bạn không có quyền thêm mới sản phẩm!"
        );
    }

    // 2. Validate dữ liệu đầu vào bằng Zod
    const rawData = {
        name: formData.get("name"),
        price: formData.get("price"),
        category: formData.get("category"),
    };

    const validated = CreateProductSchema.safeParse(rawData);

    if (!validated.success) {
        throw new Error(validated.error.issues[0]?.message ?? "Dữ liệu không hợp lệ");
    }

    // 3. Thực thi nghiệp vụ
    const newProduct = {
        id: `p${Date.now()}`,
        name: validated.data.name,
        price: validated.data.price,
        category: validated.data.category,
    };

    productsDatabase.unshift(newProduct);

    // 4. Làm mới dữ liệu
    revalidatePath("/admin");
    revalidatePath("/products");
    return { success: true, message: "Đã thêm sản phẩm thành công!" };
}

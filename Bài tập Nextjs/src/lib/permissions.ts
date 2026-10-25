export type Role = "guest" | "user" | "admin";

export type Action =
    | "product:read"
    | "cart:add"
    | "order:create"
    | "product:write"
    | "product:delete"
    | "user:manage";

const userPermissions: Action[] = [
    "product:read",
    "cart:add",
    "order:create",
];

export const permissions: Record<Role, Action[]> = {
    guest: ["product:read"],
    user: userPermissions,
    admin: [
        ...userPermissions,
        "product:write",
        "product:delete",
        "user:manage",
    ],
};

/**
 * Hàm kiểm tra quyền theo ma trận RBAC (Role-Based Access Control)
 * @param role Vai trò người dùng ('guest' | 'user' | 'admin')
 * @param action Hành động muốn thực hiện
 * @returns boolean cho biết có được phép hay không
 */
export function can(role: Role, action: Action): boolean {
    return permissions[role]?.includes(action) ?? false;
}

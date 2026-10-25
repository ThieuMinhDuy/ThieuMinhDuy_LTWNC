import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import type { Role } from "./types/next-auth";

export const MOCK_USERS = [
    {
        id: "1",
        name: "Quản trị viên (Admin)",
        email: "admin@ptit.edu.vn",
        password: "admin123",
        role: "admin" as Role,
    },
    {
        id: "2",
        name: "Người dùng (User)",
        email: "user@ptit.edu.vn",
        password: "user123",
        role: "user" as Role,
    },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mật khẩu", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = MOCK_USERS.find(
                    (u) =>
                        u.email === credentials.email &&
                        u.password === credentials.password
                );

                if (!user) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
});

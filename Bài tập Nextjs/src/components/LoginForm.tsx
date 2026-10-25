"use client";

import { useActionState, useState } from "react";
import { authenticate } from "@/app/actions/auth-actions";

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleQuickFill = (demoEmail: string, demoPass: string) => {
        setEmail(demoEmail);
        setPassword(demoPass);
    };

    return (
        <div style={{ maxWidth: "380px", margin: "60px auto" }}>
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    padding: "28px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
            >
                <h1 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                    Đăng nhập
                </h1>
                <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "20px" }}>
                    Nhập thông tin tài khoản để truy cập
                </p>

                {errorMessage && (
                    <div
                        style={{
                            backgroundColor: "#fef2f2",
                            color: "#dc2626",
                            border: "1px solid #fecaca",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            marginBottom: "16px",
                            fontSize: "0.85rem",
                        }}
                    >
                        {errorMessage}
                    </div>
                )}

                <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#334155", marginBottom: "4px", fontWeight: 500 }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                            style={{
                                width: "100%",
                                padding: "9px 12px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                color: "#0f172a",
                                fontSize: "0.9rem",
                                outline: "none",
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#334155", marginBottom: "4px", fontWeight: 500 }}>
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            style={{
                                width: "100%",
                                padding: "9px 12px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                color: "#0f172a",
                                fontSize: "0.9rem",
                                outline: "none",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        style={{
                            padding: "10px",
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            cursor: isPending ? "not-allowed" : "pointer",
                            marginTop: "6px",
                        }}
                    >
                        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                {/* Điền nhanh tài khoản mẫu */}
                <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px dashed #e2e8f0" }}>
                    <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "8px", fontWeight: 600 }}>
                        BẤM ĐỂ CHỌN NHANH TÀI KHOẢN MẪU:
                    </p>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button
                            type="button"
                            onClick={() => handleQuickFill("admin@ptit.edu.vn", "admin123")}
                            style={{
                                flex: 1,
                                padding: "7px 10px",
                                backgroundColor: "#fef2f2",
                                border: "1px solid #fecaca",
                                borderRadius: "6px",
                                color: "#dc2626",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Tài khoản Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickFill("user@ptit.edu.vn", "user123")}
                            style={{
                                flex: 1,
                                padding: "7px 10px",
                                backgroundColor: "#f0f9ff",
                                border: "1px solid #bae6fd",
                                borderRadius: "6px",
                                color: "#0284c7",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Tài khoản User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

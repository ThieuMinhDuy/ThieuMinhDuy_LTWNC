
module.exports = {
    testEnvironment: "jsdom",

    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: {
                    jsx: "react-jsx",
                    module: "CommonJS",
                    esModuleInterop: true,
                },
            },
        ],
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    testMatch: [
        "**/?(*.)+(spec|test).[tj]s?(x)",
    ],

    collectCoverageFrom: [
        "src/features/cart/cartSlice.ts",
        "src/components/Cart/Cart.tsx",
        "src/features/products/productsSlice.ts",
        "!**/*.test.ts",
        "!**/*.test.tsx",
    ],

    coverageDirectory: "coverage",

    coverageReporters: ["text", "html"],
};

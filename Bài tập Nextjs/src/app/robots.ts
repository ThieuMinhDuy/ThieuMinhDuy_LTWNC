import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/products", "/products/*", "/login"],
                disallow: [
                    "/admin",
                    "/admin/*",
                    "/dashboard",
                    "/dashboard/*",
                    "/api/*",
                    "/403",
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}

import { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/lib/blogs";

const BASE_URL = "https://sharikrasool.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPublishedBlogs();

    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
        { url: `${BASE_URL}/about`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/projects`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/blog`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
        { url: `${BASE_URL}/contact`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/tools`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ];

    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticPages, ...blogPages];
}

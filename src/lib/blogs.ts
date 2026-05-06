import connectDB from "@/lib/db";
import Blog, { IBlog } from "@/models/Blog";

export type BlogDoc = {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
    status: "draft" | "published";
    seoTitle: string;
    seoDescription: string;
    createdAt: string;
    updatedAt: string;
};

function serialize(doc: IBlog): BlogDoc {
    const obj = doc.toObject ? doc.toObject() : doc;
    return {
        _id: obj._id.toString(),
        title: obj.title,
        slug: obj.slug,
        content: obj.content,
        excerpt: obj.excerpt || "",
        coverImage: obj.coverImage || "",
        tags: obj.tags || [],
        status: obj.status,
        seoTitle: obj.seoTitle || "",
        seoDescription: obj.seoDescription || "",
        createdAt: obj.createdAt?.toISOString?.() ?? obj.createdAt,
        updatedAt: obj.updatedAt?.toISOString?.() ?? obj.updatedAt,
    };
}

async function db() {
    const conn = await connectDB();
    if (!conn) throw new Error("No database connection");
}

export async function getPublishedBlogs(): Promise<BlogDoc[]> {
    try {
        await db();
        const blogs = await Blog.find({ status: "published" })
            .sort({ createdAt: -1 })
            .lean<IBlog[]>();
        return blogs.map((b) => serialize(b as unknown as IBlog));
    } catch {
        return [];
    }
}

export async function getAllBlogs(): Promise<BlogDoc[]> {
    try {
        await db();
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean<IBlog[]>();
        return blogs.map((b) => serialize(b as unknown as IBlog));
    } catch {
        return [];
    }
}

export async function getBlogBySlug(slug: string): Promise<BlogDoc | null> {
    try {
        await db();
        const blog = await Blog.findOne({ slug }).lean<IBlog>();
        if (!blog) return null;
        return serialize(blog as unknown as IBlog);
    } catch {
        return null;
    }
}

export async function getBlogById(id: string): Promise<BlogDoc | null> {
    try {
        await db();
        const blog = await Blog.findById(id).lean<IBlog>();
        if (!blog) return null;
        return serialize(blog as unknown as IBlog);
    } catch {
        return null;
    }
}

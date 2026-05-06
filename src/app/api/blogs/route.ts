import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blog.find({ status: "published" })
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json(blogs);
    } catch {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();
        const data = await request.json();
        const blog = await Blog.create(data);
        return NextResponse.json(blog, { status: 201 });
    } catch (error: unknown) {
        if ((error as { code?: number }).code === 11000) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}

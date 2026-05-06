import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await connectDB();
        const blog = await Blog.findById(id).lean();
        if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(blog);
    } catch {
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    try {
        await connectDB();
        const data = await request.json();
        const blog = await Blog.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).lean();
        if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(blog);
    } catch (error: unknown) {
        if ((error as { code?: number }).code === 11000) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    try {
        await connectDB();
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
}

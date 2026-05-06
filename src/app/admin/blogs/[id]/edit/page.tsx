import { getBlogById } from "@/lib/blogs";
import { notFound } from "next/navigation";
import BlogForm from "../../BlogForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) notFound();

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/blogs"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to posts
                </Link>
                <h1 className="text-2xl font-bold">Edit Post</h1>
                <p className="text-sm text-muted-foreground mt-1">{blog.title}</p>
            </div>
            <BlogForm initialData={blog} />
        </div>
    );
}

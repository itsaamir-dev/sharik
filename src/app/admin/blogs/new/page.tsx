import BlogForm from "../BlogForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewBlogPage() {
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
                <h1 className="text-2xl font-bold">New Post</h1>
            </div>
            <BlogForm />
        </div>
    );
}

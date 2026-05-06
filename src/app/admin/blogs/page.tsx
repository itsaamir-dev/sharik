import { getAllBlogs } from "@/lib/blogs";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import BlogDeleteButton from "./BlogDeleteButton";

export default async function AdminBlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Blog Posts</h1>
                    <p className="text-sm text-muted-foreground mt-1">{blogs.length} post{blogs.length !== 1 ? "s" : ""} total</p>
                </div>
                <Link href="/admin/blogs/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-0">
                    {blogs.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <p className="mb-3">No blog posts yet.</p>
                            <Link href="/admin/blogs/new">
                                <Button variant="outline">Create your first post</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                                        <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Slug</th>
                                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                        <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                                        <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {blogs.map((post) => (
                                        <tr key={post._id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-4 py-3">
                                                <p className="font-medium truncate max-w-[240px]">{post.title}</p>
                                            </td>
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <span className="text-muted-foreground font-mono text-xs truncate max-w-[160px] block">{post.slug}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={post.status === "published" ? "default" : "secondary"}
                                                    className="text-xs"
                                                >
                                                    {post.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    {post.status === "published" && (
                                                        <Link
                                                            href={`/blog/${post.slug}`}
                                                            target="_blank"
                                                            className="text-xs text-muted-foreground hover:text-foreground"
                                                        >
                                                            View
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={`/admin/blogs/${post._id}/edit`}
                                                        className="text-xs text-primary hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <BlogDeleteButton id={post._id} title={post.title} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

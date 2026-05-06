import { getPublishedBlogs } from "@/lib/blogs";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SEO Blog | Sharik Rasool — Link Building & SEO Strategies",
    description:
        "Actionable SEO and link building strategies from Sharik Rasool. Tips for SaaS companies, domain authority growth, and organic traffic.",
    alternates: { canonical: "https://sharikrasool.com/blog" },
    openGraph: {
        title: "SEO Blog | Sharik Rasool",
        description: "Actionable SEO and link building strategies that actually work.",
        url: "https://sharikrasool.com/blog",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SEO Blog | Sharik Rasool",
        description: "Actionable SEO and link building strategies that actually work.",
    },
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
    const posts = await getPublishedBlogs();

    return (
        <section className="section">
            <div className="container-wide">
                <FadeIn>
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold mb-4">
                            SEO <span className="text-primary">Blog</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Actionable SEO strategies that actually work.
                        </p>
                    </div>
                </FadeIn>

                {posts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No posts published yet — check back soon!
                    </div>
                ) : (
                    <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <StaggerItem key={post._id} className="h-full">
                                <Link href={`/blog/${post.slug}`} className="block h-full">
                                    <Card className="hover:shadow-md transition h-full flex flex-col">
                                        {post.coverImage && (
                                            <div className="overflow-hidden rounded-t-lg">
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <CardContent className="p-6 flex flex-col flex-1">
                                            <div className="flex-1">
                                                {post.tags.length > 0 && (
                                                    <div className="flex items-center gap-2 text-primary text-sm mb-3">
                                                        <Tag className="h-4 w-4" />
                                                        {post.tags[0]}
                                                    </div>
                                                )}
                                                <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                                                {post.excerpt && (
                                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1 text-primary">
                                                    Read More <ArrowRight className="h-3 w-3" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                )}
            </div>
        </section>
    );
}

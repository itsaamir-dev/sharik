import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    if (!post || post.status !== "published") {
        return { title: "Post Not Found" };
    }

    const seoTitle = post.seoTitle || post.title;
    const seoDescription = post.seoDescription || post.excerpt;
    const baseUrl = "https://sharikrasool.com";

    return {
        title: `${seoTitle} | Sharik Rasool`,
        description: seoDescription,
        alternates: { canonical: `${baseUrl}/blog/${post.slug}` },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: `${baseUrl}/blog/${post.slug}`,
            type: "article",
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            authors: ["Sharik Rasool"],
            tags: post.tags,
            images: post.coverImage
                ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
                : [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: seoTitle,
            description: seoDescription,
        },
    };
}

export async function generateStaticParams() {
    const posts = await getPublishedBlogs();
    return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    if (!post || post.status !== "published") notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        image: post.coverImage || undefined,
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        author: {
            "@type": "Person",
            name: "Sharik Rasool",
            url: "https://sharikrasool.com/about",
        },
        publisher: {
            "@type": "Person",
            name: "Sharik Rasool",
        },
        keywords: post.tags.join(", "),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://sharikrasool.com/blog/${post.slug}`,
        },
    };

    return (
        <article className="section">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container-narrow">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>

                {post.coverImage && (
                    <div className="mb-8 overflow-hidden rounded-xl">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto max-h-[480px] object-cover"
                        />
                    </div>
                )}

                <header className="mb-8">
                    {post.tags.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-primary mb-4">
                            <Tag className="h-4 w-4" />
                            {post.tags[0]}
                        </div>
                    )}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Sharik Rasool
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                </header>

                <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-custom"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {post.tags.length > 0 && (
                    <div className="mt-10 pt-8 border-t border-border">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}

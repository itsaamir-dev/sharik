"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, Send, X, Upload, ImageIcon } from "lucide-react";
import type { BlogDoc } from "@/lib/blogs";

const SummernoteEditor = dynamic(() => import("./SummernoteEditor"), { ssr: false });

interface BlogFormProps {
    initialData?: BlogDoc;
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter();
    const isEditing = !!initialData;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
        excerpt: initialData?.excerpt ?? "",
        content: initialData?.content ?? "",
        coverImage: initialData?.coverImage ?? "",
        tags: initialData?.tags?.join(", ") ?? "",
        status: initialData?.status ?? "draft",
        seoTitle: initialData?.seoTitle ?? "",
        seoDescription: initialData?.seoDescription ?? "",
    });

    const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!slugManuallyEdited) {
            setForm((f) => ({ ...f, slug: slugify(f.title) }));
        }
    }, [form.title, slugManuallyEdited]);

    const set = (key: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        setUploading(false);
        if (data.url) {
            setForm((f) => ({ ...f, coverImage: data.url }));
        } else {
            setError(data.error ?? "Upload failed");
        }
        e.target.value = "";
    };

    async function submit(status: "draft" | "published") {
        setError("");
        if (!form.title.trim()) { setError("Title is required."); return; }
        if (!form.slug.trim()) { setError("Slug is required."); return; }
        if (!form.content.trim()) { setError("Content is required."); return; }

        if (status === "published") setPublishing(true);
        else setSaving(true);

        const payload = {
            ...form,
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            status,
            seoTitle: form.seoTitle || form.title,
            seoDescription: form.seoDescription || form.excerpt,
        };

        const url = isEditing ? `/api/blogs/${initialData!._id}` : "/api/blogs";
        const method = isEditing ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await res.json();

        setSaving(false);
        setPublishing(false);

        if (!res.ok) {
            setError(data.error ?? "Something went wrong.");
            return;
        }

        router.push("/admin/blogs");
        router.refresh();
    }

    const tagList = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    return (
        <div className="space-y-6">
            {error && (
                <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg">
                    <X className="h-4 w-4 shrink-0" />
                    {error}
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            value={form.title}
                            onChange={set("title")}
                            placeholder="Your blog post title"
                            className="text-lg font-medium"
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                            id="slug"
                            value={form.slug}
                            onChange={(e) => {
                                setSlugManuallyEdited(true);
                                setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                            }}
                            placeholder="url-friendly-slug"
                            className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                            /blog/<span className="text-foreground">{form.slug || "slug"}</span>
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            value={form.excerpt}
                            onChange={set("excerpt")}
                            placeholder="Short summary shown in the blog listing (plain text)"
                            rows={3}
                        />
                    </div>

                    {/* Summernote Content Editor */}
                    <div className="space-y-2">
                        <Label>Content (HTML) *</Label>
                        <div className="rounded-md overflow-hidden border border-input">
                            <SummernoteEditor
                                initialValue={form.content}
                                onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">

                    {/* Publish */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold">Publish</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant={form.status === "published" ? "default" : "secondary"}>
                                    {form.status}
                                </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={saving || publishing}
                                    onClick={() => submit("draft")}
                                    className="gap-1"
                                >
                                    {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                                    Save Draft
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={saving || publishing}
                                    onClick={() => submit("published")}
                                    className="gap-1"
                                >
                                    {publishing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                                    Publish
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Cover Image */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold">Cover Image</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Upload button */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleCoverUpload}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-full gap-2"
                                disabled={uploading}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {uploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Upload className="h-4 w-4" />
                                )}
                                {uploading ? "Uploading..." : "Upload Image"}
                            </Button>

                            {/* Divider */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="flex-1 h-px bg-border" />
                                or enter URL
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            {/* URL input */}
                            <Input
                                value={form.coverImage}
                                onChange={set("coverImage")}
                                placeholder="https://example.com/image.jpg"
                                className="text-sm"
                            />

                            {/* Preview */}
                            {form.coverImage ? (
                                <div className="relative group">
                                    <img
                                        src={form.coverImage}
                                        alt="Cover preview"
                                        className="w-full h-36 object-cover rounded-md border border-border"
                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setForm((f) => ({ ...f, coverImage: "" }))}
                                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full h-36 rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground gap-1">
                                    <ImageIcon className="h-6 w-6 opacity-40" />
                                    <span className="text-xs">No cover image</span>
                                </div>
                            )}
                            <p className="text-xs text-muted-foreground">Max 5MB · JPG, PNG, WebP, GIF</p>
                        </CardContent>
                    </Card>

                    {/* Tags */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold">Tags</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Input
                                value={form.tags}
                                onChange={set("tags")}
                                placeholder="seo, link-building, ..."
                                className="text-sm"
                            />
                            {tagList.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {tagList.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <p className="text-xs text-muted-foreground">Comma-separated</p>
                        </CardContent>
                    </Card>

                    {/* SEO */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold">SEO</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-1.5">
                                <Label className="text-xs">SEO Title</Label>
                                <Input
                                    value={form.seoTitle}
                                    onChange={set("seoTitle")}
                                    placeholder="Defaults to post title"
                                    className="text-sm"
                                />
                                <p className="text-xs text-muted-foreground">{form.seoTitle.length}/60 chars</p>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Meta Description</Label>
                                <Textarea
                                    value={form.seoDescription}
                                    onChange={set("seoDescription")}
                                    placeholder="Defaults to excerpt"
                                    rows={3}
                                    className="text-sm resize-none"
                                />
                                <p className="text-xs text-muted-foreground">{form.seoDescription.length}/160 chars</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef } from "react";

interface SummernoteEditorProps {
    initialValue?: string;
    onChange: (html: string) => void;
}

function loadAsset(tag: "script" | "link", attrs: Record<string, string>): Promise<void> {
    return new Promise((resolve) => {
        const key = tag === "script" ? "src" : "href";
        if (document.querySelector(`${tag}[${key}="${attrs[key]}"]`)) {
            resolve();
            return;
        }
        const el = document.createElement(tag) as HTMLScriptElement & HTMLLinkElement;
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        el.onload = () => resolve();
        document.head.appendChild(el);
    });
}

export default function SummernoteEditor({ initialValue = "", onChange }: SummernoteEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current || !editorRef.current) return;

        const init = async () => {
            await loadAsset("script", { src: "https://code.jquery.com/jquery-3.7.1.min.js" });
            await loadAsset("link", {
                rel: "stylesheet",
                href: "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css",
            });
            await loadAsset("script", {
                src: "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js",
            });

            const $ = (window as any).$;
            if (!$ || !editorRef.current) return;

            $(editorRef.current).summernote({
                height: 480,
                placeholder: "Write your blog post content here...",
                toolbar: [
                    ["style", ["style"]],
                    ["font", ["bold", "italic", "underline", "strikethrough", "clear"]],
                    ["fontsize", ["fontsize"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["table", ["table"]],
                    ["insert", ["link", "picture", "hr"]],
                    ["view", ["fullscreen", "codeview"]],
                ],
                fontSizes: ["12", "13", "14", "15", "16", "18", "20", "24", "28", "32", "36", "48"],
                callbacks: {
                    onChange: (contents: string) => {
                        onChange(contents);
                    },
                    onImageUpload: async (files: FileList) => {
                        const formData = new FormData();
                        formData.append("file", files[0]);
                        try {
                            const res = await fetch("/api/upload", { method: "POST", body: formData });
                            const data = await res.json();
                            if (data.url) {
                                $(editorRef.current).summernote("insertImage", data.url, files[0].name);
                            }
                        } catch {
                            alert("Image upload failed. Please try again.");
                        }
                    },
                },
            });

            if (initialValue) {
                $(editorRef.current).summernote("code", initialValue);
            }

            initialized.current = true;
        };

        init();

        return () => {
            try {
                const $ = (window as any).$;
                if ($ && editorRef.current) {
                    $(editorRef.current).summernote("destroy");
                }
            } catch {}
            initialized.current = false;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <style>{`
                .note-editor.note-frame { border-radius: 6px; border-color: hsl(var(--border)); }
                .note-toolbar { background: hsl(var(--muted)) !important; border-color: hsl(var(--border)) !important; border-radius: 6px 6px 0 0; }
                .note-editable { background: hsl(var(--background)) !important; color: hsl(var(--foreground)) !important; font-size: 15px; line-height: 1.7; }
                .note-statusbar { background: hsl(var(--muted)) !important; border-color: hsl(var(--border)) !important; border-radius: 0 0 6px 6px; }
                .note-btn { background: transparent !important; border-color: transparent !important; color: hsl(var(--foreground)) !important; }
                .note-btn:hover { background: hsl(var(--accent)) !important; }
                .note-dropdown-menu { background: hsl(var(--background)) !important; border-color: hsl(var(--border)) !important; color: hsl(var(--foreground)) !important; }
                .note-placeholder { color: hsl(var(--muted-foreground)) !important; }
            `}</style>
            <div ref={editorRef} />
        </>
    );
}

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
    status: "draft" | "published";
    seoTitle?: string;
    seoDescription?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, trim: true },
        content: { type: String, required: true },
        excerpt: { type: String, default: "" },
        coverImage: { type: String, default: "" },
        tags: { type: [String], default: [] },
        status: { type: String, enum: ["draft", "published"], default: "draft" },
        seoTitle: { type: String, default: "" },
        seoDescription: { type: String, default: "" },
    },
    { timestamps: true }
);

BlogSchema.index({ status: 1, createdAt: -1 });

const Blog: Model<IBlog> =
    (mongoose.models.Blog as Model<IBlog>) ||
    mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;

import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
    title: "Sharik Rasool | SEO Strategist & Link Builder",
    description:
        "Expert SEO strategist and link builder with 6+ years of experience helping SaaS and tech companies grow organically. 500+ high-quality backlinks built.",
    alternates: { canonical: "https://sharikrasool.com" },
    openGraph: {
        title: "Sharik Rasool | SEO Strategist & Link Builder",
        description:
            "Expert SEO strategist and link builder. I help SaaS and tech companies increase domain authority, organic traffic, and search rankings.",
        url: "https://sharikrasool.com",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sharik Rasool | SEO Strategist & Link Builder",
        description: "Expert SEO strategist helping SaaS companies grow organically.",
    },
};

const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sharik Rasool - SEO Strategist & Link Builder",
    "description": "Expert SEO strategist and link builder with 6+ years of experience helping SaaS and tech companies grow organically.",
    "url": "https://sharikrasool.com",
    "mainEntity": {
        "@type": "Person",
        "name": "Sharik Rasool",
        "jobTitle": "SEO Strategist & Link Builder",
        "description": "6+ years of experience in SEO strategy and link building",
    },
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
            />
            <HeroSection />
            <PartnersSection />
            <ResultsSection />
            <ProcessSection />
            <TestimonialsSection />
            <CTASection />
        </>
    );
}

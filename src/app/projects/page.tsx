import type { Metadata } from 'next';
import Image from "next/image";
import { ArrowRight, ExternalLink, TrendingUp, Link2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import Link from "next/link";

// Image imports
import sharikPortrait from "@/assets/sharik-portrait-3.jpeg";
import leadgenLogo from "@/assets/logos/leadgen.png";
import uniqodeLogo from "@/assets/logos/uniqode.svg";
import tqrcgLogo from "@/assets/logos/tqrcg.jpg";
import redstaglabsLogo from "@/assets/logos/redstaglabs.png";
import dominionLogo from "@/assets/logos/dominion.png";
import rayobyteLogo from "@/assets/logos/rayobyte.png";

export const metadata: Metadata = {
    title: "SEO Projects & Case Studies | Sharik Rasool",
    description:
        "Explore successful SEO and link building projects with measurable results. See how strategic SEO has driven DR growth, traffic increases, and ranking improvements.",
    alternates: { canonical: "https://sharikrasool.com/projects" },
    openGraph: {
        title: "SEO Projects & Case Studies | Sharik Rasool",
        description:
            "Real results: DR growth, 300%+ traffic increases, and 500+ high-quality backlinks built for SaaS and tech companies.",
        url: "https://sharikrasool.com/projects",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SEO Projects & Case Studies | Sharik Rasool",
        description: "Real SEO results: DR growth, 300%+ traffic increases for SaaS companies.",
    },
};

const projects = [
    {
        name: "LeadGenApp.io",
        url: "https://leadgenapp.io",
        logo: leadgenLogo,
        description: "Online form builder and marketing automation platform. Implemented comprehensive off page SEO strategy focusing on link building.",
        metrics: {
            drGrowth: "+45",
            trafficGrowth: "+280%",
            backlinks: "150+",
        },
        tags: ["SaaS SEO", "Link Building", "Off-Page SEO"],
    },
    {
        name: "Uniqode",
        url: "https://uniqode.com",
        logo: uniqodeLogo,
        description: "QR code generation platform. Built authority through strategic guest posting and digital PR campaigns.",
        metrics: {
            drGrowth: "+38",
            trafficGrowth: "+420%",
            backlinks: "200+",
        },
        tags: ["Digital PR", "Guest Posting", "Authority Building"],
    },
    {
        name: "The QR Code Generator",
        url: "https://the-qrcode-generator.com",
        logo: tqrcgLogo,
        description: "Free QR code tool. Focused on building topical authority and capturing long-tail keyword traffic.",
        metrics: {
            drGrowth: "+52",
            trafficGrowth: "+350%",
            backlinks: "180+",
        },
        tags: ["Topical Authority", "Long-tail Keywords", "Link Building"],
    },
    {
        name: "Red Stag Labs",
        url: "https://redstaglabs.com",
        logo: redstaglabsLogo,
        description: "Software development agency. Developed link building strategy targeting tech and SaaS publications.",
        metrics: {
            drGrowth: "+28",
            trafficGrowth: "+190%",
            backlinks: "120+",
        },
        tags: ["Tech SEO", "SaaS Publications", "Link Building"],
    },
    {
        name: "Dominion",
        url: "https://dominion.com",
        logo: dominionLogo,
        description: "Financial and legal advisors service. Enterprise-level SEO focusing on global visibility and authority building.",
        metrics: {
            drGrowth: "+22",
            trafficGrowth: "+150%",
            backlinks: "90+",
        },
        tags: ["Enterprise SEO", "Global Visibility", "Authority Building"],
    },
    {
        name: "Rayobyte",
        url: "https://rayobyte.com",
        logo: rayobyteLogo,
        description: "Proxy and data collection services. Technical SEO improvements and niche-specific link building.",
        metrics: {
            drGrowth: "+35",
            trafficGrowth: "+240%",
            backlinks: "160+",
        },
        tags: ["Technical SEO", "Niche Link Building", "Data Services"],
    },
];

const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SEO Projects & Case Studies",
    "description": "Explore successful SEO and link building projects with measurable results",
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": projects.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "CreativeWork",
                "name": project.name,
                "description": project.description,
                "url": project.url,
            },
        })),
    },
};

export default function ProjectsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
            />

            <section className="section">
                <div className="container-wide">
                    {/* Header with Image */}
                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
                        <FadeIn className="lg:col-span-3">
                            <div className="text-center lg:text-left">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                                    Projects & <span className="text-primary">Case Studies</span>
                                </h1>
                                <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                                    Real results from real campaigns. Here are some of the companies I've helped grow through strategic SEO and link building.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1} className="lg:col-span-2 hidden lg:block">
                            <div className="relative max-w-xs ml-auto">
                                <Image
                                    src={sharikPortrait}
                                    alt="Sharik Rasool"
                                    className="w-full aspect-[3/4] object-cover object-top rounded-2xl shadow-lg"
                                    placeholder="blur"
                                />
                                <div className="absolute -bottom-3 -right-3 w-full h-full bg-primary/20 rounded-2xl -z-10" />
                            </div>
                        </FadeIn>
                    </div>

                    {/* Projects Grid */}
                    <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                        {projects.map((project, index) => (
                            <StaggerItem key={index}>
                                <Card className="card-hover overflow-hidden h-full">
                                    <CardContent className="p-0">
                                        {/* Project Header */}
                                        <div className="p-4 md:p-6 border-b border-border">
                                            <div className="flex items-start justify-between gap-3 md:gap-4">
                                                <div className="min-w-0 flex-1">
                                                    <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{project.name}</h2>
                                                    <a
                                                        href={project.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs md:text-sm text-primary hover:underline inline-flex items-center gap-1"
                                                    >
                                                        <span className="truncate">{project.url.replace("https://", "")}</span>
                                                        <ExternalLink className="h-3 w-3 shrink-0" />
                                                    </a>
                                                </div>
                                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white border border-border flex items-center justify-center p-2 shrink-0 relative">
                                                    <Image
                                                        src={project.logo}
                                                        alt={`${project.name} logo`}
                                                        className="object-contain p-1"
                                                        fill
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="p-4 md:p-6 border-b border-border">
                                            <p className="text-sm md:text-base text-muted-foreground">{project.description}</p>
                                        </div>

                                        {/* Metrics */}
                                        <div className="p-4 md:p-6 bg-muted/30">
                                            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4">
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 text-sm md:text-lg font-bold text-primary mb-1">
                                                        <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                                                        {project.metrics.drGrowth}
                                                    </div>
                                                    <p className="text-[10px] md:text-xs text-muted-foreground">DR Growth</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 text-sm md:text-lg font-bold text-primary mb-1">
                                                        <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
                                                        {project.metrics.trafficGrowth}
                                                    </div>
                                                    <p className="text-[10px] md:text-xs text-muted-foreground">Traffic</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 text-sm md:text-lg font-bold text-primary mb-1">
                                                        <Link2 className="h-3 w-3 md:h-4 md:w-4" />
                                                        {project.metrics.backlinks}
                                                    </div>
                                                    <p className="text-[10px] md:text-xs text-muted-foreground">Backlinks</p>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                {project.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-2 py-0.5 md:py-1 text-[10px] md:text-xs rounded bg-background border border-border"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* CTA */}
                    <FadeIn>
                        <div className="text-center">
                            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                                Want similar results for your business? Let's discuss your SEO goals.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="gap-2">
                                    Start Your Project
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </>
    );
}

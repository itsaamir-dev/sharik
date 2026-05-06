import type { Metadata } from 'next';
import { ContactPageContent } from "@/components/contact/ContactPageContent";

const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Sharik Rasool - SEO Services",
        "description": "Professional SEO strategy and link building services",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Srinagar",
            "addressRegion": "Jammu & Kashmir",
            "addressCountry": "India",
        },
        "telephone": "+91-7006500941",
        "email": "hi@sharikrasool.com",
        "url": "https://sharikrasool.com",
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
    },
};

export const metadata: Metadata = {
    title: "Contact Sharik Rasool | Free SEO Consultation",
    description:
        "Get in touch with Sharik Rasool for SEO strategy and link building services. Free initial consultation. Based in Srinagar, J&K, serving clients worldwide.",
    alternates: { canonical: "https://sharikrasool.com/contact" },
    openGraph: {
        title: "Contact Sharik Rasool | Free SEO Consultation",
        description:
            "Ready to grow your organic traffic? Book a free consultation with Sharik Rasool — expert SEO strategist and link builder.",
        url: "https://sharikrasool.com/contact",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Contact Sharik Rasool | Free SEO Consultation",
        description: "Book a free SEO consultation with Sharik Rasool.",
    },
};

export default function ContactPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            <ContactPageContent />
        </>
    );
}

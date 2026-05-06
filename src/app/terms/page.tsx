import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description: "Terms and conditions for using Sharik Rasool's website and services.",
    alternates: { canonical: "https://sharikrasool.com/terms" },
    robots: {
        index: false,
    },
};

export default function TermsPage() {
    return (
        <section className="section">
            <div className="container-narrow prose-custom">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h1>
                <p className="text-muted-foreground mb-6">Last updated: January 2024</p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">By accessing this website, you agree to be bound by these terms and conditions.</p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Services</h2>
                <p className="text-muted-foreground mb-4">Our SEO consulting services are provided on a project basis with agreed-upon deliverables and timelines.</p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">All content on this website is owned by Sharik Rasool unless otherwise stated.</p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground">We are not liable for any indirect or consequential damages arising from the use of our services.</p>
            </div>
        </section>
    );
}

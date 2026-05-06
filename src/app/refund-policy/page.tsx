import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund Policy",
    description: "Refund and cancellation policy for Sharik Rasool's SEO services.",
    alternates: { canonical: "https://sharikrasool.com/refund-policy" },
    robots: {
        index: false,
    },
};

export default function RefundPolicyPage() {
    return (
        <section className="section">
            <div className="container-narrow prose-custom">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Refund & Cancellation Policy</h1>
                <p className="text-muted-foreground mb-6">Last updated: January 2024</p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Service Cancellation</h2>
                <p className="text-muted-foreground mb-4">Clients may cancel services with 30 days written notice. Work completed up to cancellation will be billed.</p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Eligibility</h2>
                <p className="text-muted-foreground mb-4">Refunds may be issued for services not yet rendered. Completed work is non-refundable.</p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Dispute Resolution</h2>
                <p className="text-muted-foreground">Any disputes will be handled through direct communication. Contact hi@sharikrasool.com for concerns.</p>
            </div>
        </section>
    );
}

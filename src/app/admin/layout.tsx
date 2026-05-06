import { auth } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
    title: "Admin — Sharik Rasool",
    robots: { index: false, follow: false },
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // No session = login page (middleware already handles redirects)
    if (!session) {
        return (
            <div className="min-h-screen bg-muted/30">
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30">
            <AdminSidebar email={session.user?.email ?? ""} />
            <div className="lg:pl-64">
                <main className="p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}

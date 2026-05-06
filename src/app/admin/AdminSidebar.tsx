"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, LogOut, PenSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/blogs", label: "Blog Posts", icon: FileText, exact: false },
];

export default function AdminSidebar({ email }: { email: string }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href: string, exact: boolean) =>
        exact ? pathname === href : pathname.startsWith(href);

    const sidebar = (
        <div className="flex flex-col h-full">
            <div className="px-6 py-5 border-b border-border">
                <Link href="/admin" className="flex items-center gap-2">
                    <PenSquare className="h-5 w-5 text-primary" />
                    <span className="font-bold text-lg">SR Admin</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map(({ href, label, icon: Icon, exact }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            isActive(href, exact)
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="px-4 py-4 border-t border-border space-y-3">
                <p className="px-3 text-xs text-muted-foreground truncate">{email}</p>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 bg-background border-r border-border z-30">
                {sidebar}
            </aside>

            {/* Mobile top bar */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-background border-b border-border sticky top-0 z-30">
                <Link href="/admin" className="flex items-center gap-2 font-bold">
                    <PenSquare className="h-5 w-5 text-primary" />
                    SR Admin
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
                    <aside className="absolute left-0 top-0 bottom-0 w-64 bg-background border-r border-border">
                        {sidebar}
                    </aside>
                </div>
            )}
        </>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Megaphone,
    LineChart,
    Share2,
    Settings,
    ArrowLeft
} from 'lucide-react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/crm', label: 'Panel Control', icon: LayoutDashboard },
        { href: '/crm/audience', label: 'Audiencia (Cientes)', icon: Users },
        { href: '/crm/campaigns', label: 'Campañas', icon: Megaphone },
        { href: '/crm/analytics', label: 'Inteligencia', icon: LineChart },
        { href: '/crm/social', label: 'Redes Sociales', icon: Share2 },
        { href: '/crm/settings', label: 'Configuración', icon: Settings },
    ];

    return (
        <aside className="hidden w-64 flex-col border-r bg-sidebar h-screen fixed left-0 top-0 z-30 shadow-sm md:flex">
            <div className="p-4 flex justify-center border-b border-sidebar-border h-16 items-center">
                <img src="/logo-text.png" alt="SOTO DEL PRIOR" className="h-10 w-auto" />
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1 mt-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/crm' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={classNames(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-sidebar-accent text-sidebar-primary shadow-sm"
                                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-sidebar-border space-y-2 mt-auto">
                <Link
                    href="/"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-sidebar-accent/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Volver al Portal</span>
                </Link>
            </div>
        </aside>
    );
}

import Link from "next/link"
import { Sidebar } from "@/components/Sidebar"

export default function CrmLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-muted/40 font-sans">
            <Sidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
                    <h1 className="text-lg font-semibold md:text-2xl text-foreground">Marketing Hub</h1>
                </header>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

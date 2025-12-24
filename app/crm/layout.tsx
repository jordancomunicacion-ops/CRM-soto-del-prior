import Link from "next/link"

export default function CrmLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight text-primary">SOTOdelPRIOR <span className="text-gray-500 font-normal">| MarketingHub</span></h1>
                    <nav className="flex gap-1">
                        <Link href="/crm" className="px-4 py-2 rounded-md hover:bg-gray-100 font-medium">Audience</Link>
                        <Link href="/crm/campaigns" className="px-4 py-2 rounded-md hover:bg-gray-100 font-medium">Campaigns</Link>
                        <Link href="/crm/analytics" className="px-4 py-2 rounded-md hover:bg-gray-100 font-medium text-blue-600">Intelligence</Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1 container mx-auto p-6">
                {children}
            </main>
        </div>
    )
}

import { getCampaigns, createCampaign } from "../../actions/crm"

// Simple components for Standalone App (since we don't have shadcn here effectively)
function Badge({ children, color }: { children: React.ReactNode, color: string }) {
    const colors: any = {
        green: 'bg-green-100 text-green-800',
        blue: 'bg-blue-100 text-blue-800',
        gray: 'bg-gray-100 text-gray-800'
    }
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray}`}>{children}</span>
}

export default async function CampaignsPage() {
    const campaigns = await getCampaigns()

    async function create(formData: FormData) {
        "use server"
        await createCampaign({
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            subject: formData.get('subject') as string,
            content: formData.get('content') as string
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-semibold">Campaigns</h2>
                    <p className="text-gray-500 text-sm">Design and broadcast marketing messages.</p>
                </div>

                {/* Simple Form for MVP */}
                <div className="bg-white p-4 rounded-lg border shadow-sm w-full md:w-auto">
                    <h3 className="text-sm font-medium mb-2">Quick Draft</h3>
                    <form action={create} className="flex flex-wrap gap-2 items-end">
                        <div>
                            <input name="name" placeholder="Campaign Name" required className="h-9 px-3 w-40 rounded-md border text-sm" />
                        </div>
                        <div>
                            <select name="type" className="h-9 px-3 rounded-md border text-sm bg-white">
                                <option value="EMAIL">Email</option>
                                <option value="WHATSAPP">WhatsApp</option>
                            </select>
                        </div>
                        <button type="submit" className="h-9 px-4 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900">Create</button>
                    </form>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium uppercase tracking-wider">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Sent</th>
                            <th className="p-3">Created</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {campaigns.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td className="p-3 font-medium">{c.name}</td>
                                <td className="p-3"><Badge color={c.type === 'EMAIL' ? 'blue' : 'green'}>{c.type}</Badge></td>
                                <td className="p-3"><Badge color={c.status === 'SENT' ? 'gray' : 'green'}>{c.status}</Badge></td>
                                <td className="p-3">{c.sentCount}</td>
                                <td className="p-3 text-gray-500">{c.createdAt.toLocaleDateString()}</td>
                                <td className="p-3">
                                    {c.status === 'DRAFT' && <button className="text-blue-600 hover:underline">Edit</button>}
                                </td>
                            </tr>
                        ))}
                        {campaigns.length === 0 && (
                            <tr><td colSpan={6} className="p-8 text-center text-gray-500">No campaigns created yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

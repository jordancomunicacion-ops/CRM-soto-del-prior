import { getProfiles, getSalesStats } from "../actions/crm"

export default async function AudiencePage() {
    const profiles = await getProfiles()
    const stats = await getSalesStats()

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                    <p className="text-2xl font-bold">€{Number(stats.revenue).toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm border-l-4 border-l-blue-500">
                    <h3 className="text-sm font-medium text-gray-500">TPV (Sala)</h3>
                    <p className="text-2xl font-bold">€{stats.bySource.TPV.toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm border-l-4 border-l-green-500">
                    <h3 className="text-sm font-medium text-gray-500">Delivery</h3>
                    <p className="text-2xl font-bold">€{stats.bySource.DELIVERY.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Audience Segments</h2>
                    <span className="text-sm text-gray-500">Displaying top {profiles.length} profiles</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium uppercase tracking-wider">
                            <tr>
                                <th className="p-3">Identity</th>
                                <th className="p-3">Source</th>
                                <th className="p-3">Spend (CLV)</th>
                                <th className="p-3">Channels</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {profiles.map((profile: any) => (
                                <tr key={profile.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3">
                                        <div className="font-medium text-gray-900">{profile.firstName || 'Guest'}</div>
                                        <div className="text-xs text-gray-500">{profile.email}</div>
                                    </td>
                                    <td className="p-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {profile.systemTags || 'WEB_USER'}
                                        </span>
                                    </td>
                                    <td className="p-3 font-medium text-gray-900">€{Number(profile.totalSpend).toFixed(2)}</td>
                                    <td className="p-3 space-x-1">
                                        {profile.consentEmail && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">EMAIL</span>}
                                        {profile.consentWhatsApp && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">WA</span>}
                                    </td>
                                </tr>
                            ))}
                            {profiles.length === 0 && (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No profiles found yet. Connect Booking/POS or import data.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

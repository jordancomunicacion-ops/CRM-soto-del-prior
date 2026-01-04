import { getSocialOverview, getTopContent } from "../../actions/social"
import SeedButton from "./seed-button"

// Helper for icons
const icons: any = {
    INSTAGRAM: "📸",
    FACEBOOK: "📘",
    TIKTOK: "🎵",
    LINKEDIN: "💼",
    YOUTUBE: "📺"
}

export default async function SocialDashboard() {
    const overview = await getSocialOverview()
    const topContent = await getTopContent()

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Social Command Center</h2>
                    <p className="text-gray-500 text-sm">Real-time performance across all channels.</p>
                </div>
                <SeedButton />
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium">Total Audience</h3>
                    <p className="text-3xl font-bold mt-2">{overview.kpis.followers.toLocaleString()}</p>
                    <span className="text-xs text-green-600">↑ 12% vs last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium">Monthly Reach</h3>
                    <p className="text-3xl font-bold mt-2">{overview.kpis.reach.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium">Engagement (Likes/Comments)</h3>
                    <p className="text-3xl font-bold mt-2 text-purple-600">{overview.kpis.engagement.toLocaleString()}</p>
                </div>
            </div>

            {/* Platform Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {overview.platforms.map((p: any) => (
                    <div key={p.provider} className="bg-white rounded-lg border shadow-sm p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4 border-b pb-3">
                            <div className="text-3xl">{icons[p.provider]}</div>
                            <div>
                                <h3 className="font-bold text-gray-900">{p.provider}</h3>
                                <p className="text-xs text-gray-500 truncate w-32">{p.name}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-gray-500">Followers</span>
                                <span className="text-xl font-semibold">{p.followers.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-gray-500">Reach</span>
                                <span className="text-xl font-semibold">{p.reach.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-gray-500">Engagement</span>
                                <span className="text-lg font-bold text-purple-600">{p.engagement.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {overview.platforms.length === 0 && (
                    <div className="col-span-3 text-center py-12 bg-gray-50 rounded border border-dashed">
                        <p className="text-gray-400 mb-2">No social accounts connected.</p>
                        <p className="text-sm text-gray-500">Click "Load Mock Data" to simulate connection.</p>
                    </div>
                )}
            </div>

            {/* Top Content */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">🔥 Top Performing Content</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-3 rounded-l-md">Platform</th>
                                <th className="p-3">Avg. Content</th>
                                <th className="p-3">Impressions</th>
                                <th className="p-3 text-right rounded-r-md">Engagement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topContent.map((c: any) => (
                                <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="p-3 font-medium flex items-center gap-2">
                                        <span>{icons[c.platform]}</span>
                                        <span className="text-xs text-gray-500 bg-gray-200 px-1 rounded">{c.type}</span>
                                    </td>
                                    <td className="p-3 max-w-xs truncate" title={c.caption}>{c.caption}</td>
                                    <td className="p-3">{c.impressions.toLocaleString()}</td>
                                    <td className="p-3 text-right font-bold text-purple-600">{c.engagement.toLocaleString()}</td>
                                </tr>
                            ))}
                            {topContent.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-400">Content will appear here.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

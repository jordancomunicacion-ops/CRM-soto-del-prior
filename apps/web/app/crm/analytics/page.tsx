import { getWeatherCorrelation, getSeasonalAnalysis, getCustomerMetrics, getCrossSellingStats } from "../../actions/analytics"

export default async function AnalyticsPage() {
    const weatherStats = await getWeatherCorrelation()
    const seasonalStats = await getSeasonalAnalysis()
    const customerMetrics = await getCustomerMetrics()
    const crossSell = await getCrossSellingStats()

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Intelligence Dashboard</h2>

                {/* Customer Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Total Customers</h3>
                        <p className="text-3xl font-bold mt-2">{customerMetrics.total}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Recurring Guests</h3>
                        <p className="text-3xl font-bold mt-2">{customerMetrics.recurring}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-sm border-l-4 border-l-purple-500">
                        <h3 className="text-gray-500 text-sm font-medium">Hotel → Restaurant</h3>
                        <div className="flex items-baseline gap-2 mt-2">
                            <p className="text-3xl font-bold">{crossSell.count}</p>
                            <span className="text-sm text-gray-500">({crossSell.rate}%)</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Loyalty Rate</h3>
                        <p className="text-3xl font-bold mt-2 text-blue-600">{customerMetrics.recurringRate}%</p>
                    </div>
                </div>
            </div>

            {/* Weather Analysis */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    🌤️ Weather Impact Analysis
                </h3>
                <p className="text-sm text-gray-500 mb-6">Which products perform best under different weather conditions.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weatherStats.length > 0 ? weatherStats.map((stat) => (
                        <div key={stat.condition} className="border rounded-md p-4 bg-gray-50">
                            <h4 className="font-medium text-lg mb-3 border-b pb-2">{stat.condition}</h4>
                            <ul className="space-y-2">
                                {stat.topProducts.map((prod, idx) => (
                                    <li key={idx} className="flex justify-between text-sm">
                                        <span>{prod.name}</span>
                                        <span className="font-semibold">{prod.qty} sold</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )) : (
                        <div className="col-span-3 text-center py-8 text-gray-400">
                            No sufficient weather-sales data yet. Recording in progress...
                        </div>
                    )}
                </div>
            </div>

            {/* Seasonal Analysis */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    📅 Seasonal Performance
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-3 rounded-l-md">Season/Event</th>
                                <th className="p-3">Total Revenue</th>
                                <th className="p-3 rounded-r-md">Top Seller</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seasonalStats.map((s) => (
                                <tr key={s.season} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="p-3 font-medium">{s.season}</td>
                                    <td className="p-3">€{s.revenue.toLocaleString()}</td>
                                    <td className="p-3 text-green-600 font-medium">{s.topProduct}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

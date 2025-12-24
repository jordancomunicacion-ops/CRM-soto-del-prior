"use server"

import { prisma } from "@/lib/prisma"

export async function getWeatherCorrelation() {
    // Fetch all sales with items
    const sales = await prisma.sale.findMany({
        where: { weatherSnapshotJson: { not: null } },
        include: { items: true },
        take: 1000 // Limit for MVP
    })

    // Aggregate: { "Sunny": { "Burger": 50, "Salad": 20 }, "Rainy": { "Burger": 60, "Soup": 40 } }
    const stats: Record<string, Record<string, number>> = {}

    sales.forEach(sale => {
        if (!sale.weatherSnapshotJson) return
        try {
            const weather = JSON.parse(sale.weatherSnapshotJson)
            const condition = weather.condition || "Unknown"

            if (!stats[condition]) stats[condition] = {}

            sale.items.forEach(item => {
                const prod = item.productName
                stats[condition][prod] = (stats[condition][prod] || 0) + item.quantity
            })
        } catch (e) {
            // ignore bad json
        }
    })

    // Transform for UI: { condition: "Sunny", topProduct: "Burger", topCategory: "Food" }
    return Object.entries(stats).map(([condition, products]) => {
        // Find top product
        const sorted = Object.entries(products).sort((a, b) => b[1] - a[1])
        return {
            condition,
            topProducts: sorted.slice(0, 3).map(([name, qty]) => ({ name, qty }))
        }
    })
}

export async function getSeasonalAnalysis() {
    // Mocking seasonal ranges for valid MVP demo (since we don't have historical data yet)
    // In real app, we would query by date range
    return [
        { season: "Navidad", revenue: 15000, topProduct: "Menú Especial Nochevieja" },
        { season: "Semana Santa", revenue: 12000, topProduct: "Potaje de Vigilia" },
        { season: "Verano", revenue: 25000, topProduct: "Gazpacho" }
    ]
}

export async function getCustomerMetrics() {
    const totalCustomers = await prisma.customerProfile.count()
    const recurring = await prisma.customerProfile.count({
        where: { totalSpend: { gt: 100 } } // Mock threshold
    })

    return {
        total: totalCustomers,
        recurring: recurring,
        recurringRate: totalCustomers > 0 ? (recurring / totalCustomers * 100).toFixed(1) : 0
    }
}

export async function getCrossSellingStats() {
    // Metric: Hotel Guests who also spent money in Restaurant/Delivery
    const crossMovers = await prisma.customerProfile.count({
        where: {
            systemTags: { contains: 'HOTEL_GUEST' },
            totalSpend: { gt: 0 }, // Implies they bought something, since Motor doesn't sync total yet (or we can refine logic)
            sales: { some: {} } // ACTUALLY check if they have sales records (Restaurant/Delivery)
        }
    })

    const totalHotelGuests = await prisma.customerProfile.count({
        where: { systemTags: { contains: 'HOTEL_GUEST' } }
    })

    return {
        count: crossMovers,
        rate: totalHotelGuests > 0 ? (crossMovers / totalHotelGuests * 100).toFixed(1) : 0
    }
}

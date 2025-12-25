"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getProfiles() {
    return await prisma.customerProfile.findMany({
        orderBy: { updatedAt: 'desc' },
        include: { campaigns: true },
        take: 100 // Limit for MVP performance
    })
}

export async function getCampaigns() {
    return await prisma.campaign.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function createCampaign(data: { name: string; type: string; subject?: string; content: string }) {
    const campaign = await prisma.campaign.create({
        data: {
            name: data.name,
            type: data.type,
            subject: data.subject,
            content: data.content,
            status: 'DRAFT'
        }
    })
    revalidatePath('/crm/campaigns')
    return campaign
}

export async function getSalesStats() {
    // Quick aggregations for dashboard
    const totalRevenue = await prisma.sale.aggregate({
        _sum: { total: true }
    })
    const recentSales = await prisma.sale.findMany({
        take: 5,
        orderBy: { timestamp: 'desc' },
        include: { items: true } // Relation to items exists
    })

    return {
        revenue: totalRevenue._sum.total || 0,
        recent: recentSales,
        bySource: await getRevenueBySource()
    }
}

async function getRevenueBySource() {
    const grouped = await prisma.sale.groupBy({
        by: ['source'],
        _sum: { total: true }
    })

    // Transform to simple object { TPV: 100, DELIVERY: 200 }
    const stats: Record<string, number> = { TPV: 0, DELIVERY: 0 }
    grouped.forEach((g: any) => {
        if (g.source === 'TPV_RESTAURANT') stats.TPV = Number(g._sum.total)
        else stats.DELIVERY = (stats.DELIVERY || 0) + Number(g._sum.total)
    })
    return stats
}

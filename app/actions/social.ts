"use server"

import { prisma } from "@/lib/prisma"

export async function getSocialOverview() {
    const accounts = await prisma.socialAccount.findMany({
        include: {
            metrics: {
                where: { date: { gte: new Date(Date.now() - 7 * 86400000) } }, // Last 7 days
                orderBy: { date: 'asc' }
            }
        }
    })

    // Agregados
    let totalFollowers = 0
    let totalReach = 0
    let totalEngagement = 0
    const platformStats: any[] = []

    for (const acc of accounts) {
        // Get latest follower count
        const followers = await prisma.metricTimeseries.findFirst({
            where: { socialAccountId: acc.id, metric: 'FOLLOWERS' },
            orderBy: { date: 'desc' }
        })
        const count = Number(followers?.value || 0)
        totalFollowers += count

        // Sum Reach & Engagement from recent posts
        const recentMetrics = await prisma.metricTimeseries.groupBy({
            by: ['metric'],
            where: { socialAccountId: acc.id, contentItemId: { not: null } },
            _sum: { value: true }
        })

        let accReach = 0
        let accEng = 0

        recentMetrics.forEach((m: any) => {
            if (m.metric === 'REACH') accReach = Number(m._sum.value || 0)
            if (m.metric === 'ENGAGEMENT') accEng = Number(m._sum.value || 0)
        })

        totalReach += accReach
        totalEngagement += accEng

        platformStats.push({
            name: acc.name,
            provider: acc.provider,
            followers: count,
            reach: accReach,
            engagement: accEng
        })
    }

    return {
        kpis: {
            followers: totalFollowers,
            reach: totalReach,
            engagement: totalEngagement
        },
        platforms: platformStats
    }
}

export async function getTopContent() {
    // Return top 5 posts by engagement across all platforms
    // For MVP, we fetch usage aggregate manually or sort via JS if data volume is low
    // SQL efficient way:
    /*
    const top = await prisma.metricTimeseries.groupBy({
        by: ['contentItemId'],
        where: { metric: 'ENGAGEMENT' },
        _sum: { value: true },
        orderBy: { _sum: { value: 'desc' } },
        take: 5
    })
    */
    // Since we need post details, we'll do a robust query in real implementaion.
    // For this Mock phase, let's fetch content with their metrics
    const content = await prisma.contentItem.findMany({
        take: 10,
        include: { metrics: true, socialAccount: true },
        orderBy: { publishedAt: 'desc' }
    })

    return content.map((c: any) => {
        const eng = c.metrics.find((m: any) => m.metric === 'ENGAGEMENT')?.value || 0
        const imp = c.metrics.find((m: any) => m.metric === 'IMPRESSIONS')?.value || 0
        return {
            id: c.id,
            platform: c.socialAccount.provider,
            type: c.type,
            caption: c.caption,
            engagement: Number(eng),
            impressions: Number(imp),
            permalink: c.permalink
        }
    }).sort((a: any, b: any) => b.engagement - a.engagement).slice(0, 5)
}

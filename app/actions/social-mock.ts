"use server"

import { prisma } from "@/lib/prisma"

export async function seedSocialData() {
    console.log("Seeding Social Data...")

    // 1. Create Accounts
    const platforms = [
        { provider: "INSTAGRAM", name: "@sotodelprior_hotel", platformId: "ig_123" },
        { provider: "FACEBOOK", name: "Soto del Prior - Tu Espacio", platformId: "fb_456" },
        { provider: "TIKTOK", name: "@chef_soto_prior", platformId: "tt_789" },
        { provider: "LINKEDIN", name: "SOTO del PRIOR Events", platformId: "li_101" },
        { provider: "YOUTUBE", name: "SOTO del PRIOR Experience", platformId: "yt_202" }
    ]

    for (const p of platforms) {
        const existing = await prisma.socialAccount.findFirst({ where: { provider: p.provider } })
        let accountId = existing?.id

        if (!existing) {
            const newAcc = await prisma.socialAccount.create({
                data: {
                    provider: p.provider,
                    name: p.name,
                    platformId: p.platformId,
                    accessToken: "mock_token"
                }
            })
            accountId = newAcc.id
        }

        if (!accountId) continue

        // 2. Create Content Items (Last 5 posts)
        for (let i = 1; i <= 5; i++) {
            const type = p.provider === 'TIKTOK' || p.provider === 'YOUTUBE' ? 'VIDEO' : 'IMAGE'
            const post = await prisma.contentItem.create({
                data: {
                    socialAccountId: accountId,
                    externalId: `${p.provider}_post_${i}`,
                    type: type,
                    caption: `Post #${i} about our amazing food and rooms! #luxury #experience`,
                    publishedAt: new Date(Date.now() - i * 86400000), // i days ago
                    permalink: `https://${p.provider.toLowerCase()}.com/p/${i}`
                }
            })

            // 3. Create Metrics for Content
            await prisma.metricTimeseries.createMany({
                data: [
                    { socialAccountId: accountId, contentItemId: post.id, date: new Date(), metric: 'IMPRESSIONS', value: 1000 * i },
                    { socialAccountId: accountId, contentItemId: post.id, date: new Date(), metric: 'REACH', value: 800 * i },
                    { socialAccountId: accountId, contentItemId: post.id, date: new Date(), metric: 'ENGAGEMENT', value: 50 * i },
                    { socialAccountId: accountId, contentItemId: post.id, date: new Date(), metric: 'CLICKS', value: 10 * i }
                ]
            })
        }

        // 4. Account Level Daily Metrics (Last 7 days)
        for (let d = 0; d < 7; d++) {
            await prisma.metricTimeseries.createMany({
                data: [
                    { socialAccountId: accountId, date: new Date(Date.now() - d * 86400000), metric: 'FOLLOWERS', value: 5000 + (d * 10) },
                    { socialAccountId: accountId, date: new Date(Date.now() - d * 86400000), metric: 'PROFILE_VIEWS', value: 100 + (d * 5) }
                ]
            })
        }
    }

    return { success: true }
}

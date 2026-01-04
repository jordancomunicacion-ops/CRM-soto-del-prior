import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Body: { source, platformName, total, customer: { email... }, items: [] }

        // 1. Find or Create Customer
        let profileId = null;
        if (body.customer?.email || body.customer?.phone) {
            const profile = await prisma.customerProfile.upsert({
                where: { email: body.customer.email || undefined }, // Simple logic for MVP (should check phone too)
                update: {
                    totalSpend: { increment: body.total },
                    lastInteraction: new Date()
                },
                create: {
                    email: body.customer.email,
                    phone: body.customer.phone,
                    firstName: body.customer.name,
                    totalSpend: body.total,
                    lastInteraction: new Date(),
                    systemTags: body.source === 'DELIVERY_PLATFORM' ? 'DELIVERY_USER' : 'RESTAURANT_GUEST'
                }
            });
            profileId = profile.id;
        }

        // 2. Fetch Weather (Mock for now, will implement Open-Meteo logic later)
        // In production, we would call fetch('https://api.open-meteo.com/...') here
        const weatherSnapshot = JSON.stringify({ temp: 22, condition: 'Sunny' });

        // 3. Create Sale
        const sale = await prisma.sale.create({
            data: {
                source: body.source, // 'DELIVERY_PLATFORM' or 'TPV_RESTAURANT'
                platformName: body.platformName,
                total: body.total,
                customerProfileId: profileId,
                weatherSnapshotJson: weatherSnapshot,
                hour: new Date().getHours(),
                items: {
                    create: body.items.map((item: any) => ({
                        productName: item.name,
                        quantity: item.quantity,
                        unitPrice: item.price
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, saleId: sale.id });
    } catch (error) {
        console.error('Sales Ingestion Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

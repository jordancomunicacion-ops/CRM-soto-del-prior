import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Payload: { 
        //   guest: { email, phone, firstName, lastName, country }, 
        //   booking: { total, nights, roomType } 
        // }

        if (!body.guest || !body.guest.email) {
            return NextResponse.json({ success: false, error: 'Guest email required' }, { status: 400 });
        }

        // 1. Unified Customer Profile (Identity Resolution)
        // Try to find by Email first
        const profile = await prisma.customerProfile.upsert({
            where: { email: body.guest.email },
            update: {
                totalSpend: { increment: body.booking.total || 0 },
                lastInteraction: new Date(),
                // Append HOTEL_GUEST tag if not present
                // (Prisma doesn't support easy string append, logic simplified for MVP)
                systemTags: "HOTEL_GUEST"
            },
            create: {
                email: body.guest.email,
                phone: body.guest.phone,
                firstName: body.guest.firstName,
                lastName: body.guest.lastName,
                totalSpend: body.booking.total || 0,
                lastInteraction: new Date(),
                systemTags: "HOTEL_GUEST",
                consentEmail: true // Assuming guest agreed during booking
            }
        });

        // 2. Log "Stay" (If we had a Stay model, we'd log it. For now updating stats is key)

        return NextResponse.json({ success: true, profileId: profile.id });
    } catch (error) {
        console.error('Hotel Integration Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

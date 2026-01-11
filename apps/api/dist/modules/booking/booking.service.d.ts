import { PrismaService } from '../../prisma/prisma.service';
import { RatesService } from '../rates/rates.service';
import { AvailabilityService } from '../rates/availability.service';
export declare class BookingService {
    private prisma;
    private ratesService;
    private availabilityService;
    constructor(prisma: PrismaService, ratesService: RatesService, availabilityService: AvailabilityService);
    createBooking(data: {
        hotelId: string;
        guestName: string;
        checkInDate: string;
        checkOutDate: string;
        roomTypeId: string;
        ratePlanId?: string;
        pax: number;
        guestEmail?: string;
        guestPhone?: string;
    }): Promise<any>;
    private syncWithCRM;
    getBookings(hotelId: string): Promise<any>;
    checkAvailability(hotelId: string, from: string, to: string, pax: number): Promise<any[]>;
    private allocateRoom;
    private calculateNights;
}

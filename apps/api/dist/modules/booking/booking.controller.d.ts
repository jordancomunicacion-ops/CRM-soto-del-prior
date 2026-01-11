import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(body: any): Promise<any>;
    checkAvailability(hotelId: string, from: string, to: string, pax: string): Promise<any[]>;
    getBookings(hotelId: string): Promise<any>;
}

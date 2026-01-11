import { RatesService } from './rates.service';
import { AvailabilityService } from './availability.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class RatesController {
    private readonly ratesService;
    private readonly availabilityService;
    private readonly prisma;
    constructor(ratesService: RatesService, availabilityService: AvailabilityService, prisma: PrismaService);
    getRatePlans(hotelId: string): Promise<any>;
    createRatePlan(body: any): Promise<any>;
    updatePrices(body: {
        hotelId: string;
        ratePlanId: string;
        roomTypeId: string;
        fromDate: string;
        toDate: string;
        price: number;
    }): Promise<{
        status: string;
        count: number;
    }>;
}

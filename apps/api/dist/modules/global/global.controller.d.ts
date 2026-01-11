import { PrismaService } from '../../prisma/prisma.service';
export declare class GlobalController {
    private prisma;
    constructor(prisma: PrismaService);
    getContexts(): Promise<{
        hotels: any;
        restaurants: any;
    }>;
}

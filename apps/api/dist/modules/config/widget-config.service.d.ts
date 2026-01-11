import { PrismaService } from '../../prisma/prisma.service';
export declare class WidgetConfigService {
    private prisma;
    constructor(prisma: PrismaService);
    getConfig(hotelId: string): Promise<any>;
    updateConfig(hotelId: string, data: any): Promise<any>;
}

import { PrismaService } from '../../prisma/prisma.service';
export declare class ChannelManagerService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleCron(): Promise<void>;
    getFeeds(): Promise<any>;
    createFeed(data: {
        roomTypeId: string;
        url: string;
        name: string;
        source: string;
    }): Promise<any>;
    syncAllFeeds(): Promise<void>;
    private processICalUrl;
    private allocateRoomForOTA;
    pushInventory(hotelId: string): Promise<void>;
    generateICal(roomTypeId: string): Promise<string>;
}

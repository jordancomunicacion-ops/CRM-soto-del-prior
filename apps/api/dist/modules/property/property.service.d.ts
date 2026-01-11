import { PrismaService } from '../../prisma/prisma.service';
export declare class PropertyService {
    private prisma;
    constructor(prisma: PrismaService);
    createHotel(data: {
        name: string;
        currency: string;
        timezone: string;
    }): Promise<any>;
    getHotels(): Promise<any>;
    getHotel(id: string): Promise<any>;
    createRoomType(hotelId: string, data: {
        name: string;
        basePrice: number;
        capacity: number;
    }): Promise<any>;
    getRoomTypes(hotelId: string): Promise<any>;
    createRoom(roomTypeId: string, name: string): Promise<any>;
}

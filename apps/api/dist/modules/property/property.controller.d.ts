import { PropertyService } from './property.service';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    createHotel(body: {
        name: string;
        currency: string;
        timezone: string;
    }): Promise<any>;
    getHotels(): Promise<any>;
    getHotel(id: string): Promise<any>;
    createRoomType(hotelId: string, body: {
        name: string;
        basePrice: number;
        capacity: number;
    }): Promise<any>;
    getRoomTypes(hotelId: string): Promise<any>;
    createRoom(roomTypeId: string, name: string): Promise<any>;
}

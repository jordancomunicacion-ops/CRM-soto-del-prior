import { PrismaService } from '../../prisma/prisma.service';
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    private stripe;
    createCustomer(email: string, name: string): Promise<{
        id: string;
    }>;
    savePaymentMethod(bookingId: string, paymentMethodId: string): Promise<any>;
    chargeNoShowFee(bookingId: string): Promise<{
        success: boolean;
        paymentIntent: {
            id: string;
            client_secret: string;
        };
    }>;
}

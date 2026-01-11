import { PaymentService } from './payment.service';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    attachCard(bookingId: string, paymentMethodId: string): Promise<any>;
    chargeNoShow(bookingId: string): Promise<{
        success: boolean;
        paymentIntent: {
            id: string;
            client_secret: string;
        };
    }>;
}

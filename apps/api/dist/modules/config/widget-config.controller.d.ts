import { WidgetConfigService } from './widget-config.service';
export declare class WidgetConfigController {
    private readonly service;
    constructor(service: WidgetConfigService);
    getConfig(hotelId: string): Promise<any>;
    updateConfig(hotelId: string, body: any): Promise<any>;
}

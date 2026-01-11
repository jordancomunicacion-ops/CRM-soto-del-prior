import { ChannelManagerService } from './channel-manager.service';
import type { Response } from 'express';
export declare class ChannelManagerController {
    private readonly channelService;
    constructor(channelService: ChannelManagerService);
    forceSync(): Promise<{
        status: string;
    }>;
    exportICal(mk: string, res: Response): Promise<void>;
    getFeeds(): Promise<any>;
    createFeed(body: {
        roomTypeId: string;
        url: string;
        name: string;
        source: string;
    }): Promise<any>;
}

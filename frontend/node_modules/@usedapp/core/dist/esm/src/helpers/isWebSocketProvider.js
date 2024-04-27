import { providers } from 'ethers';
export const isWebSocketProvider = (provider) => {
    return provider instanceof providers.WebSocketProvider || !!provider._websocket; // Could be a different instance of ethers.
};
//# sourceMappingURL=isWebSocketProvider.js.map
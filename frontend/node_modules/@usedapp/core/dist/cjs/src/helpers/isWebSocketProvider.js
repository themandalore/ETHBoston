"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWebSocketProvider = void 0;
const ethers_1 = require("ethers");
const isWebSocketProvider = (provider) => {
    return provider instanceof ethers_1.providers.WebSocketProvider || !!provider._websocket; // Could be a different instance of ethers.
};
exports.isWebSocketProvider = isWebSocketProvider;
//# sourceMappingURL=isWebSocketProvider.js.map
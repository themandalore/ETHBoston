"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
const constants_1 = require("../../constants");
const implementations_1 = require("../../providers/network/connectors/implementations");
exports.DEFAULT_CONFIG = {
    pollingInterval: 15000,
    supportedChains: undefined,
    networks: constants_1.DEFAULT_SUPPORTED_CHAINS,
    notifications: {
        checkInterval: 500,
        expirationPeriod: 5000,
    },
    localStorage: {
        transactionPath: 'transactions',
    },
    autoConnect: true,
    multicallVersion: 1,
    connectors: {
        metamask: new implementations_1.MetamaskConnector(),
    },
};
//# sourceMappingURL=default.js.map
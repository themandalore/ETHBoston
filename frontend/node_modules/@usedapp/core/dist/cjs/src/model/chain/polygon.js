"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mumbai = exports.Polygon = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const polygonExplorerUrl = 'https://polygonscan.com';
exports.Polygon = {
    chainId: 137,
    chainName: 'Polygon',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    rpcUrl: 'https://polygon-rpc.com',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    },
    blockExplorerUrl: polygonExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(polygonExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(polygonExplorerUrl),
};
const mumbaiExplorerUrl = 'https://mumbai.polygonscan.com';
exports.Mumbai = {
    chainId: 80001,
    chainName: 'Mumbai',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    },
    blockExplorerUrl: mumbaiExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(mumbaiExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(mumbaiExplorerUrl),
};
exports.default = { Polygon: exports.Polygon, Mumbai: exports.Mumbai };
//# sourceMappingURL=polygon.js.map
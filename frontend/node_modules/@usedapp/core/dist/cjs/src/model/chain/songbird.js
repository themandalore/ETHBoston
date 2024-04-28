"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Songbird = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const songbirdExplorerUrl = 'https://songbird-explorer.flare.network';
exports.Songbird = {
    chainId: 19,
    chainName: 'Songbird',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x60351436cf80A31EA6C3B261C784d3C127dBD6f1',
    rpcUrl: 'https://songbird.towolabs.com/rpc',
    nativeCurrency: {
        name: 'SGB',
        symbol: 'SGB',
        decimals: 18,
    },
    blockExplorerUrl: songbirdExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(songbirdExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(songbirdExplorerUrl),
};
//# sourceMappingURL=songbird.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonbaseAlpha = exports.Moonriver = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const moonriverExplorerUrl = 'https://moonriver.moonscan.io';
exports.Moonriver = {
    chainId: 1285,
    chainName: 'Moonriver',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
    rpcUrl: 'https://rpc.api.moonriver.moonbeam.network',
    nativeCurrency: {
        name: 'MOVR',
        symbol: 'MOVR',
        decimals: 18,
    },
    blockExplorerUrl: moonriverExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(moonriverExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(moonriverExplorerUrl),
};
const moonbaseAlphaExplorerUrl = 'https://moonbase.moonscan.io';
exports.MoonbaseAlpha = {
    chainId: 1287,
    chainName: 'Moonbase Alpha',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x4E2cfca20580747AdBA58cd677A998f8B261Fc21',
    rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
    nativeCurrency: {
        name: 'DEV',
        symbol: 'DEV',
        decimals: 18,
    },
    blockExplorerUrl: moonbaseAlphaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(moonbaseAlphaExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(moonbaseAlphaExplorerUrl),
};
exports.default = { Moonriver: exports.Moonriver };
//# sourceMappingURL=moonriver.js.map
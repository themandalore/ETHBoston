"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronosTestnet = exports.Cronos = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const cronosExplorerUrl = 'https://cronoscan.com';
exports.Cronos = {
    chainId: 25,
    chainName: 'Cronos',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x0fA4d452693F2f45D28c4EC4d20b236C4010dA74',
    rpcUrl: 'https://evm.cronos.org',
    nativeCurrency: {
        name: 'CRO',
        symbol: 'CRO',
        decimals: 18,
    },
    blockExplorerUrl: cronosExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(cronosExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(cronosExplorerUrl),
};
const cronosTestnetExplorerUrl = 'https://testnet.cronoscan.com';
exports.CronosTestnet = {
    chainId: 338,
    chainName: 'Cronos Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x6a8c1ba309136D78245f1F0a14790239b71a9577',
    rpcUrl: 'https://cronos-testnet-3.crypto.org:8545',
    nativeCurrency: {
        name: 'TCRO',
        symbol: 'TCRO',
        decimals: 18,
    },
    blockExplorerUrl: cronosTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(cronosTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(cronosTestnetExplorerUrl),
};
exports.default = {
    Cronos: exports.Cronos,
    CronosTestnet: exports.CronosTestnet,
};
//# sourceMappingURL=cronos.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvalancheTestnet = exports.Avalanche = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const avax = {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
};
const avalancheExplorerUrl = 'https://snowtrace.io';
exports.Avalanche = {
    chainId: 43114,
    chainName: 'Avalanche',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    nativeCurrency: avax,
    blockExplorerUrl: avalancheExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(avalancheExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(avalancheExplorerUrl),
};
const testExplorerUrl = 'https://testnet.snowtrace.io';
exports.AvalancheTestnet = {
    chainId: 43113,
    chainName: 'Avalanche Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xccc75e78Dce6A20bCCa3a30deB23Cb4D23df993a',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    nativeCurrency: avax,
    blockExplorerUrl: testExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(testExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(testExplorerUrl),
};
exports.default = {
    Avalanche: exports.Avalanche,
    AvalancheTestnet: exports.AvalancheTestnet,
};
//# sourceMappingURL=avalanche.js.map
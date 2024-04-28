"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeloAlfajores = exports.Celo = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const celoExplorerUrl = 'https://celoscan.io';
exports.Celo = {
    chainId: 42220,
    chainName: 'Celo',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x75F59534dd892c1f8a7B172D639FA854D529ada3',
    rpcUrl: 'https://forno.celo.org',
    nativeCurrency: {
        name: 'CELO',
        symbol: 'CELO',
        decimals: 18,
    },
    blockExplorerUrl: celoExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(celoExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(celoExplorerUrl),
};
const alfajoresExplorerUrl = 'https://alfajores.celoscan.io';
exports.CeloAlfajores = {
    chainId: 44787,
    chainName: 'CeloAlfajores',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    nativeCurrency: {
        name: 'CELO',
        symbol: 'CELO',
        decimals: 18,
    },
    blockExplorerUrl: alfajoresExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(alfajoresExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(alfajoresExplorerUrl),
};
exports.default = { Celo: exports.Celo, CeloAlfajores: exports.CeloAlfajores };
//# sourceMappingURL=celo.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KromaMainnet = exports.KromaSepoliaTestnet = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const KromaSepoliaExplorerUrl = 'https://blockscout.sepolia.kroma.network/';
exports.KromaSepoliaTestnet = {
    chainId: 2358,
    chainName: 'Kroma Sepolia Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x62FB84bD50b254c5aFB33453a693a6733Ae40a25',
    rpcUrl: 'https://api.sepolia.kroma.network/',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: KromaSepoliaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(KromaSepoliaExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(KromaSepoliaExplorerUrl),
};
const KromaExplorerUrl = 'https://blockscout.kroma.network/';
exports.KromaMainnet = {
    chainId: 255,
    chainName: 'Kroma',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xE3c886498ac54433F2B0E6842FAE421006067751',
    rpcUrl: 'https://api.kroma.network/',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: KromaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(KromaExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(KromaExplorerUrl),
};
//# sourceMappingURL=kroma.js.map
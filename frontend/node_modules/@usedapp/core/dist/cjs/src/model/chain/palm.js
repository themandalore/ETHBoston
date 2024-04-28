"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalmTestnet = exports.Palm = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const palmExplorerUrl = 'https://explorer.palm.io';
exports.Palm = {
    chainId: 11297108109,
    chainName: 'Palm',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
    // RPC URL source: https://chainlist.org/
    rpcUrl: 'https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b',
    nativeCurrency: {
        name: 'PALM',
        symbol: 'PALM',
        decimals: 18,
    },
    blockExplorerUrl: palmExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(palmExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(palmExplorerUrl),
};
const palmTestnetExplorerUrl = 'https://explorer.palm-uat.xyz';
exports.PalmTestnet = {
    chainId: 11297108099,
    chainName: 'Palm Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
    rpcUrl: 'https://palm-testnet.public.blastapi.io',
    nativeCurrency: {
        name: 'PALM',
        symbol: 'PALM',
        decimals: 18,
    },
    blockExplorerUrl: palmTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(palmTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(palmTestnetExplorerUrl),
};
exports.default = { Palm: exports.Palm, PalmTestnet: exports.PalmTestnet };
//# sourceMappingURL=palm.js.map
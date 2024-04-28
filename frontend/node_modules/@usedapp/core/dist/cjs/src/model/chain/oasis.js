"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OasisSapphireTestnet = exports.OasisEmeraldTestnet = exports.OasisEmerald = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const oasisEmeraldExplorerUrl = 'https://explorer.emerald.oasis.dev';
exports.OasisEmerald = {
    chainId: 42262,
    chainName: 'Oasis Emerald',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xA1513CE1a147BB84E04cD61d877d598C018a460F',
    rpcUrl: 'https://emerald.oasis.dev',
    nativeCurrency: {
        name: 'ROSE',
        symbol: 'ROSE',
        decimals: 18,
    },
    blockExplorerUrl: oasisEmeraldExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(oasisEmeraldExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(oasisEmeraldExplorerUrl),
};
const oasisEmeraldTestnetExplorerUrl = 'https://testnet.explorer.emerald.oasis.dev';
exports.OasisEmeraldTestnet = {
    chainId: 42261,
    chainName: 'Oasis Emerald Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xB2929229096d2ee6850c4d3906ef2d1f1330cdc7',
    rpcUrl: 'https://testnet.emerald.oasis.dev',
    nativeCurrency: {
        name: 'ROSE',
        symbol: 'ROSE',
        decimals: 18,
    },
    blockExplorerUrl: oasisEmeraldTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(oasisEmeraldTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(oasisEmeraldTestnetExplorerUrl),
};
const oasisSapphireExplorerUrl = 'https://explorer.sapphire.oasis.dev';
exports.OasisSapphireTestnet = {
    chainId: 23295,
    chainName: 'Oasis Sapphire Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xB2929229096d2ee6850c4d3906ef2d1f1330cdc7',
    rpcUrl: 'https://testnet.emerald.oasis.dev',
    nativeCurrency: {
        name: 'ROSE',
        symbol: 'ROSE',
        decimals: 18,
    },
    blockExplorerUrl: oasisSapphireExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(oasisSapphireExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(oasisSapphireExplorerUrl),
};
exports.default = { OasisEmerald: exports.OasisEmerald, OasisEmeraldTestnet: exports.OasisEmeraldTestnet, OasisSapphireTestnet: exports.OasisSapphireTestnet };
//# sourceMappingURL=oasis.js.map
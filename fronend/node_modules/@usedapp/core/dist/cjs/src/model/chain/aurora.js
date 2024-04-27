"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuroraTestnet = exports.Aurora = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const auroraExplorerUrl = 'https://aurorascan.dev';
exports.Aurora = {
    chainId: 1313161554,
    chainName: 'Aurora',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x32b50c286DEFd2932a0247b8bb940b78c063F16c',
    multicall2Address: '0xace58a26b8Db90498eF0330fDC9C2655db0C45E2',
    rpcUrl: 'https://mainnet.aurora.dev',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: auroraExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(auroraExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(auroraExplorerUrl),
};
const auroraTestnetExplorerUrl = 'https://testnet.aurorascan.dev';
exports.AuroraTestnet = {
    chainId: 1313161555,
    chainName: 'Aurora Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x755E730F28A31079711aB588e3568e70A40F3564',
    rpcUrl: 'https://testnet.aurora.dev',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: auroraTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(auroraTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(auroraTestnetExplorerUrl),
};
exports.default = {
    Aurora: exports.Aurora,
    AuroraTestnet: exports.AuroraTestnet,
};
//# sourceMappingURL=aurora.js.map
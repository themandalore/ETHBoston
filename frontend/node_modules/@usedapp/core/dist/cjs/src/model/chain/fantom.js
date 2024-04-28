"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FantomTestnet = exports.Fantom = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const fantomExplorerUrl = 'https://ftmscan.com';
exports.Fantom = {
    chainId: 250,
    chainName: 'Fantom',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xdc85396592f0F466224390771C861EE3957a3ff4',
    rpcUrl: 'https://rpc.ftm.tools',
    nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
    },
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(fantomExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(fantomExplorerUrl),
};
const fantomTestnetExplorerUrl = 'https://testnet.ftmscan.com';
exports.FantomTestnet = {
    chainId: 4002,
    chainName: 'Fantom Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xA01917aF773b703717C25C483a619e9218343531',
    rpcUrl: 'https://rpc.testnet.fantom.network',
    nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
    },
    blockExplorerUrl: fantomTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(fantomTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(fantomTestnetExplorerUrl),
};
exports.default = { Fantom: exports.Fantom, FantomTestnet: exports.FantomTestnet };
//# sourceMappingURL=fantom.js.map
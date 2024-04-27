"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootstockMainnet = exports.RootstockTestnet = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const rootstockTestnetExplorerUrl = 'https://explorer.testnet.rsk.co/';
exports.RootstockTestnet = {
    chainId: 31,
    chainName: 'Rootstock Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: 'https://public-node.testnet.rsk.co',
    nativeCurrency: {
        name: 'Test Rootstock Bitcoin',
        symbol: 'tRBTC',
        decimals: 18,
    },
    blockExplorerUrl: rootstockTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(rootstockTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(rootstockTestnetExplorerUrl),
};
const rootstockMainnetExplorerUrl = 'https://explorer.rsk.co/';
exports.RootstockMainnet = {
    chainId: 30,
    chainName: 'Rootstock Mainnet',
    isTestChain: false,
    isLocalChain: false,
    rpcUrl: 'https://public-node.rsk.co',
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    nativeCurrency: {
        name: 'Rootstock Bitcoin',
        symbol: 'RBTC',
        decimals: 18,
    },
    blockExplorerUrl: rootstockMainnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(rootstockMainnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(rootstockMainnetExplorerUrl),
};
exports.default = { RootstockTestnet: exports.RootstockTestnet, RootstockMainnet: exports.RootstockMainnet };
//# sourceMappingURL=rootstock.js.map
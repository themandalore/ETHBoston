"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Harmony = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const harmonyExplorerUrl = 'https://blockscout.com/poa/xdai';
exports.Harmony = {
    chainId: 1666600000,
    chainName: 'Harmony',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xFE4980f62D708c2A84D3929859Ea226340759320',
    rpcUrl: 'https://api.harmony.one',
    nativeCurrency: {
        name: 'ONE',
        symbol: 'ONE',
        decimals: 18,
    },
    blockExplorerUrl: harmonyExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(harmonyExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(harmonyExplorerUrl),
};
exports.default = { Harmony: exports.Harmony };
//# sourceMappingURL=harmony.js.map
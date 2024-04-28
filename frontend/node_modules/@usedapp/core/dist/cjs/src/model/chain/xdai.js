"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gnosis = exports.xDai = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const xDaiExplorerUrl = 'https://blockscout.com/poa/xdai';
exports.xDai = {
    chainId: 100,
    chainName: 'xDai',
    isTestChain: false,
    isLocalChain: false,
    rpcUrl: 'https://rpc.gnosischain.com',
    multicallAddress: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
    nativeCurrency: {
        name: 'xDAI',
        symbol: 'xDAI',
        decimals: 18,
    },
    blockExplorerUrl: xDaiExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(xDaiExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(xDaiExplorerUrl),
};
// xdai alias
exports.Gnosis = {
    ...exports.xDai,
    chainName: 'Gnosis',
};
exports.default = { xDai: exports.xDai, Gnosis: exports.Gnosis };
//# sourceMappingURL=xdai.js.map
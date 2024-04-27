"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = exports.BaseGoerli = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const baseGoerliUrl = 'https://goerli.basescan.org';
exports.BaseGoerli = {
    chainId: 84531,
    chainName: 'Base Goerli',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x1Be882bE320C2C21849891E441da4829a34e0627',
    rpcUrl: 'https://goerli.base.org',
    nativeCurrency: {
        name: 'Goerli Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: baseGoerliUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(baseGoerliUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(baseGoerliUrl),
};
const baseUrl = 'https://basescan.org';
exports.Base = {
    chainId: 8453,
    chainName: 'Base',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x38641b7a50CDcfde75a7A83eB7c02581F3279362',
    rpcUrl: 'https://base.org',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: baseUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(baseUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(baseUrl),
};
exports.default = {
    BaseGoerli: exports.BaseGoerli,
    Base: exports.Base,
};
//# sourceMappingURL=base.js.map
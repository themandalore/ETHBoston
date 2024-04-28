"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VelasTestnet = exports.Velas = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const velasExplorerUrl = 'https://evmexplorer.velas.com';
exports.Velas = {
    chainId: 106,
    chainName: 'Velas',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x55c77eEba2b891c7f940cE4C3d9Fcd6915c12082',
    multicall2Address: '0x324f25e6eEB13D45DF559B7326d631e34Fd5ceDF',
    rpcUrl: 'https://evmexplorer.velas.com/rpc',
    nativeCurrency: {
        name: 'VLX',
        symbol: 'VLX',
        decimals: 18,
    },
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(velasExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(velasExplorerUrl),
};
const velasTestnetExplorerUrl = 'https://evmexplorer.testnet.velas.com';
exports.VelasTestnet = {
    chainId: 111,
    chainName: 'Velas Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x649DEa474f0Ca0FDb276098d1A4c8BA62b4abC83',
    multicall2Address: '0x65f4f071505912dbC9dCCF3a51542374a43D6a5A',
    rpcUrl: 'https://api.testnet.velas.com',
    nativeCurrency: {
        name: 'VLX',
        symbol: 'VLX',
        decimals: 18,
    },
    blockExplorerUrl: velasTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(velasTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(velasTestnetExplorerUrl),
};
exports.default = {
    Velas: exports.Velas,
    VelasTestnet: exports.VelasTestnet,
};
//# sourceMappingURL=velas.js.map
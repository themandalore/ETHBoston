"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linea = exports.LineaTestnet = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const lineaExplorerUrlTestnet = 'https://explorer.goerli.linea.build';
exports.LineaTestnet = {
    chainId: 59140,
    chainName: 'Linea Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x9901f3053527a58B8C210B144f53CbeA7b6E23Fb',
    rpcUrl: 'https://rpc.goerli.linea.build',
    nativeCurrency: {
        name: 'Linea Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: lineaExplorerUrlTestnet,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(lineaExplorerUrlTestnet),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(lineaExplorerUrlTestnet),
};
const lineaExplorerUrl = 'https://lineascan.build/';
exports.Linea = {
    chainId: 59144,
    chainName: 'Linea',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x5D155A04De5bB501f022E44AEd7FF23A6Ff2C1F1',
    rpcUrl: 'https://rpc.linea.build',
    nativeCurrency: {
        name: 'Linea Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: lineaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(lineaExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(lineaExplorerUrl),
};
exports.default = { LineaTestnet: exports.LineaTestnet };
//# sourceMappingURL=linea.js.map
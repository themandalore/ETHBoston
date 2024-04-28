"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbitrumNova = exports.Arbitrum = exports.ArbitrumGoerli = exports.ArbitrumRinkeby = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const arbiscanRinkebyUrl = 'https://testnet.arbiscan.io';
exports.ArbitrumRinkeby = {
    chainId: 421611,
    chainName: 'Arbitrum Rinkeby',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xd27BEFd29F8Da4E187fDAEf663aEDF7742f9F47F',
    rpcUrl: 'https://rinkeby.arbitrum.io/rpc',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: arbiscanRinkebyUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(arbiscanRinkebyUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(arbiscanRinkebyUrl),
};
const arbitrumGoerliExplorerUrl = 'https://goerli-rollup-explorer.arbitrum.io';
exports.ArbitrumGoerli = {
    chainId: 421613,
    chainName: 'Arbitrum Goerli',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x108B25170319f38DbED14cA9716C54E5D1FF4623',
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    nativeCurrency: {
        name: 'AGOR',
        symbol: 'AGOR',
        decimals: 18,
    },
    blockExplorerUrl: arbitrumGoerliExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(arbitrumGoerliExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(arbitrumGoerliExplorerUrl),
};
const arbiscanUrl = 'https://arbiscan.io';
exports.Arbitrum = {
    chainId: 42161,
    chainName: 'Arbitrum One',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
    multicall2Address: '0x80c7dd17b01855a6d2347444a0fcc36136a314de',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: arbiscanUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(arbiscanUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(arbiscanUrl),
};
const arbitrumNovaExplorerUrl = 'https://nova-explorer.arbitrum.io';
exports.ArbitrumNova = {
    chainId: 42170,
    chainName: 'Arbitrum Nova',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x4E74EBd9CABff51cE9a43EFe059bA8c5A28E4A14',
    rpcUrl: 'https://nova.arbitrum.io/rpc',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: arbitrumNovaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(arbitrumNovaExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(arbitrumNovaExplorerUrl),
};
exports.default = {
    ArbitrumNova: exports.ArbitrumNova,
    ArbitrumRinkeby: exports.ArbitrumRinkeby,
    Arbitrum: exports.Arbitrum,
};
//# sourceMappingURL=arbitrum.js.map
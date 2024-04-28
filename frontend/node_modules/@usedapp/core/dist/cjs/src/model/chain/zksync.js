"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZkSyncTestnet = exports.ZkSync = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const zksyncExplorerUrl = 'https://zksync2-mainnet.zkscan.io/';
exports.ZkSync = {
    chainId: 324,
    chainName: 'zkSync Era',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x1De2452e12b982Bc31500FcfD1AFf8FfdAd93CBa',
    multicall2Address: '0x7541c21A0D384B0f734d4C091fd40125F7Ad9AE1',
    rpcUrl: 'https://mainnet.era.zksync.io',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(zksyncExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(zksyncExplorerUrl),
};
exports.ZkSyncTestnet = {
    chainId: 280,
    chainName: 'zkSync testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x5014a961801de9a52548068bDac853CE337221e7',
    multicall2Address: '0x32Caf123F6f574035f51532E597125062C0Aa8EE',
    rpcUrl: 'https://zksync2-testnet.zksync.dev',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: zksyncExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(zksyncExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(zksyncExplorerUrl),
};
//# sourceMappingURL=zksync.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KlaytnTestnet = exports.Klaytn = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const klaytnExplorerUrl = 'https://scope.klaytn.com/';
exports.Klaytn = {
    chainId: 8217,
    chainName: 'klaytn',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xd11dfc2ab34abd3e1abfba80b99aefbd6255c4b8',
    rpcUrl: 'https://klaytn.blockpi.network/v1/rpc/public	',
    nativeCurrency: {
        name: 'klaytn',
        symbol: 'KLAY',
        decimals: 18,
    },
    blockExplorerUrl: klaytnExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(klaytnExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(klaytnExplorerUrl),
};
const klaytnTestnetExplorerUrl = 'https://baobab.scope.klaytn.com/';
exports.KlaytnTestnet = {
    chainId: 1001,
    chainName: 'klaytn Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xd11dfc2ab34abd3e1abfba80b99aefbd6255c4b8',
    rpcUrl: 'https://klaytn-baobab.blockpi.network/v1/rpc/public',
    nativeCurrency: {
        name: 'klaytn Testnet',
        symbol: 'KLAY',
        decimals: 18,
    },
    blockExplorerUrl: klaytnTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(klaytnTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(klaytnTestnetExplorerUrl),
};
exports.default = { Klaytn: exports.Klaytn, KlaytnTestnet: exports.KlaytnTestnet };
//# sourceMappingURL=klaytn.js.map
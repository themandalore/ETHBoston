"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbitrumRedditTestnet = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const arbitrumRedditTestnetExplorerUrl = 'https://testnet.redditspace.com';
exports.ArbitrumRedditTestnet = {
    chainId: 5391184,
    chainName: 'Arbitrum Reddit Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x722db82dea58c880d03b87885053f206f1b37136',
    multicall2Address: '0xd4d664d419a6a845c98cc366ae1c4b24592bd5ce',
    rpcUrl: 'https://testnet.redditspace.com/rpc',
    nativeCurrency: {
        name: 'Reddit',
        symbol: 'Reddit',
        decimals: 18,
    },
    blockExplorerUrl: arbitrumRedditTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(arbitrumRedditTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(arbitrumRedditTestnetExplorerUrl),
};
exports.default = {
    ArbitrumRedditTestnet: exports.ArbitrumRedditTestnet,
};
//# sourceMappingURL=arbitrumReddit.js.map
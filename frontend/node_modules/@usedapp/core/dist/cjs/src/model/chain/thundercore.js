"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThunderCoreTestnet = exports.ThunderCore = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const thunderCoreExplorerUrl = 'https://viewblock.io/thundercore';
exports.ThunderCore = {
    chainId: 108,
    chainName: 'ThunderCore',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x3017086DeEf56679e267F67F66c4415109b7A97f',
    multicall2Address: '0xd1dC5CF410b227dFEeFEe8D3c1C9DB4FBE66d362',
    rpcUrl: 'https://mainnet-rpc.thundercore.com',
    nativeCurrency: {
        name: 'TT',
        symbol: 'TT',
        decimals: 18,
    },
    blockExplorerUrl: thunderCoreExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(thunderCoreExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(thunderCoreExplorerUrl),
};
const thunderCoreTestnetExplorerUrl = 'https://explorer-testnet.thundercore.com';
exports.ThunderCoreTestnet = {
    chainId: 18,
    chainName: 'ThunderCore Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x7818a6A0fFe134b2aF30850DCE7c86A52eC6AC4F',
    multicall2Address: '0x02C5503dd793cC457a1CE50d2d31a749cb5e9cB5',
    rpcUrl: 'https://testnet-rpc.thundercore.com',
    nativeCurrency: {
        name: 'TST',
        symbol: 'TST',
        decimals: 18,
    },
    blockExplorerUrl: thunderCoreTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(thunderCoreTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(thunderCoreTestnetExplorerUrl),
};
exports.default = {
    ThunderCore: exports.ThunderCore,
    ThunderCoreTestnet: exports.ThunderCoreTestnet,
};
//# sourceMappingURL=thundercore.js.map
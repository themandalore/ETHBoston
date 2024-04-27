"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Optimism = exports.OptimismGoerli = exports.OptimismKovan = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const testnetExplorerUrl = 'https://kovan-optimistic.etherscan.io';
exports.OptimismKovan = {
    chainId: 69,
    chainName: 'Optimism Kovan',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xE71bf4622578c7d1526A88CD3060f03030E99a04',
    rpcUrl: 'https://kovan.optimism.io',
    nativeCurrency: {
        name: 'Kovan Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: testnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(testnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(testnetExplorerUrl),
};
const testnetGoerliExplorerUrl = 'https://goerli-optimism.etherscan.io';
exports.OptimismGoerli = {
    chainId: 420,
    chainName: 'Optimism Goerli',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xC8315CC7DCDF57476a8a1D184505845d52711024',
    rpcUrl: 'https://goerli.optimism.io',
    nativeCurrency: {
        name: 'Goerli Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: testnetGoerliExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(testnetGoerliExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(testnetGoerliExplorerUrl),
};
const optimismExplorerUrl = 'https://optimistic.etherscan.io';
exports.Optimism = {
    chainId: 10,
    chainName: 'Optimism',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x35A6Cdb2C9AD4a45112df4a04147EB07dFA01aB7',
    rpcUrl: 'https://mainnet.optimism.io',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: optimismExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(optimismExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(optimismExplorerUrl),
};
exports.default = {
    OptimismKovan: exports.OptimismKovan,
    OptimismGoerli: exports.OptimismGoerli,
    Optimism: exports.Optimism,
};
//# sourceMappingURL=optimism.js.map
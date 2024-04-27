"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThetaTestnet = exports.Theta = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const thetaExplorerUrl = 'https://explorer.thetatoken.org';
exports.Theta = {
    chainId: 361,
    chainName: 'Theta',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
    rpcUrl: 'https://eth-rpc-api.thetatoken.org/rpc',
    nativeCurrency: {
        name: 'TFUEL',
        symbol: 'TFUEL',
        decimals: 18,
    },
    blockExplorerUrl: thetaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(thetaExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(thetaExplorerUrl),
};
const thetaTestnetExplorerUrl = 'https://testnet-explorer.thetatoken.org';
exports.ThetaTestnet = {
    chainId: 365,
    chainName: 'Theta Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xf822bf2e728e264c58d7618022addd9cbc780350',
    rpcUrl: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
    nativeCurrency: {
        name: 'TFUEL',
        symbol: 'TFUEL',
        decimals: 18,
    },
    blockExplorerUrl: thetaTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(thetaTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(thetaTestnetExplorerUrl),
};
exports.default = {
    Theta: exports.Theta,
    ThetaTestnet: exports.ThetaTestnet,
};
//# sourceMappingURL=theta.js.map
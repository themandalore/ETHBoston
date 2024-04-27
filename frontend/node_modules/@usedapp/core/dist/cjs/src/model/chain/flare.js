"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlareCoston2Testnet = exports.FlareCostonTestnet = exports.Flare = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const flareExplorerUrl = 'https://flare-explorer.flare.network';
exports.Flare = {
    chainId: 14,
    chainName: 'Flare',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: 'https://flare-api.flare.network/ext/C/rpc',
    nativeCurrency: {
        name: 'FLR',
        symbol: 'FLR',
        decimals: 18,
    },
    blockExplorerUrl: flareExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(flareExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(flareExplorerUrl),
};
const FlareCostonTestnetExplorerUrl = 'https://coston-explorer.flare.network';
exports.FlareCostonTestnet = {
    chainId: 16,
    chainName: 'Flare Testnet Coston',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xF7aB82e5253F65496e21dF0dacfA6D5e765b4874',
    rpcUrl: 'https://coston-api.flare.network/ext/bc/C/rpc',
    nativeCurrency: {
        name: 'Flare Coston',
        symbol: 'CFLR',
        decimals: 18,
    },
    blockExplorerUrl: FlareCostonTestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(FlareCostonTestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(FlareCostonTestnetExplorerUrl),
};
const FlareCoston2TestnetExplorerUrl = 'https://coston2-explorer.flare.network';
exports.FlareCoston2Testnet = {
    chainId: 114,
    chainName: 'Flare Testnet Coston2',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: 'https://coston2-api.flare.network/ext/bc/C/rpc',
    nativeCurrency: {
        name: 'Flare Coston2',
        symbol: 'C2FLR',
        decimals: 18,
    },
    blockExplorerUrl: FlareCoston2TestnetExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(FlareCoston2TestnetExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(FlareCoston2TestnetExplorerUrl),
};
exports.default = { Flare: exports.Flare, FlareCostonTestnet: exports.FlareCostonTestnet, FlareCoston2Testnet: exports.FlareCoston2Testnet };
//# sourceMappingURL=flare.js.map
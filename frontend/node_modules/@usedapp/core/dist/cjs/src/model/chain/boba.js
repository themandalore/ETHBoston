"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BobaRinkeby = exports.Boba = void 0;
const chainExplorerLink_1 = require("../../helpers/chainExplorerLink");
const bobaExplorerUrl = 'https://bobascan.com';
exports.Boba = {
    chainId: 288,
    chainName: 'Boba',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x344696b815742A3E31181207e027e5110e2A0f74',
    rpcUrl: 'https://mainnet.boba.network',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: bobaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(bobaExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(bobaExplorerUrl),
};
const bobaRinkebyExplorerUrl = 'https://blockexplorer.rinkeby.boba.network';
exports.BobaRinkeby = {
    chainId: 28,
    chainName: 'Boba Rinkeby',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xC8Ad85fF276fbC1aDF627D9dff0AfD8bdc4C3492',
    rpcUrl: 'https://rinkeby.boba.network',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: bobaExplorerUrl,
    getExplorerAddressLink: (0, chainExplorerLink_1.getAddressLink)(bobaRinkebyExplorerUrl),
    getExplorerTransactionLink: (0, chainExplorerLink_1.getTransactionLink)(bobaRinkebyExplorerUrl),
};
exports.default = {
    Boba: exports.Boba,
    BobaRinkeby: exports.BobaRinkeby,
};
//# sourceMappingURL=boba.js.map
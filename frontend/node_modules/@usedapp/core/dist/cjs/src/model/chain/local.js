"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hardhat = exports.Localhost = void 0;
exports.Localhost = {
    chainId: 1337,
    chainName: 'Localhost',
    isTestChain: true,
    isLocalChain: true,
    multicallAddress: '',
    rpcUrl: 'http://localhost:8545',
    getExplorerAddressLink: () => '',
    getExplorerTransactionLink: () => '',
};
exports.Hardhat = {
    chainId: 31337,
    chainName: 'Hardhat',
    isTestChain: true,
    isLocalChain: true,
    multicallAddress: '',
    rpcUrl: 'http://localhost:8545',
    getExplorerAddressLink: () => '',
    getExplorerTransactionLink: () => '',
};
exports.default = {
    Localhost: exports.Localhost,
    Hardhat: exports.Hardhat,
};
//# sourceMappingURL=local.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalChain = exports.isTestChain = exports.getChainName = exports.getExplorerTransactionLink = exports.getExplorerAddressLink = exports.getChainById = void 0;
const constants_1 = require("../constants");
/**
 * @internal Intended for internal use - use it on your own risk
 */
const getChainById = (chainId) => constants_1.DEFAULT_SUPPORTED_CHAINS.find((network) => network.chainId === chainId);
exports.getChainById = getChainById;
const deprecationWarning = (methodName) => console.warn(`${methodName} is deprecated, can call with Chain directly`);
/**
 * @public
 * @deprecated
 */
const getExplorerAddressLink = (address, chainId) => {
    var _a;
    deprecationWarning('getExplorerAddressLink');
    return ((_a = (0, exports.getChainById)(chainId)) === null || _a === void 0 ? void 0 : _a.getExplorerAddressLink(address)) || '';
};
exports.getExplorerAddressLink = getExplorerAddressLink;
/**
 * @public
 * @deprecated
 */
const getExplorerTransactionLink = (transactionHash, chainId) => {
    var _a;
    deprecationWarning('getExplorerTransactionLink');
    return ((_a = (0, exports.getChainById)(chainId)) === null || _a === void 0 ? void 0 : _a.getExplorerTransactionLink(transactionHash)) || '';
};
exports.getExplorerTransactionLink = getExplorerTransactionLink;
/**
 * @public
 * @deprecated
 */
const getChainName = (chainId) => {
    var _a;
    deprecationWarning('getChainName');
    return ((_a = (0, exports.getChainById)(chainId)) === null || _a === void 0 ? void 0 : _a.chainName) || '';
};
exports.getChainName = getChainName;
/**
 * @public
 * @deprecated
 */
const isTestChain = (chainId) => {
    var _a;
    deprecationWarning('isTestChain');
    return ((_a = (0, exports.getChainById)(chainId)) === null || _a === void 0 ? void 0 : _a.isTestChain) || false;
};
exports.isTestChain = isTestChain;
/**
 * @public
 * @deprecated
 */
const isLocalChain = (chainId) => {
    var _a;
    deprecationWarning('isLocalChain');
    return ((_a = (0, exports.getChainById)(chainId)) === null || _a === void 0 ? void 0 : _a.isLocalChain) || false;
};
exports.isLocalChain = isLocalChain;
//# sourceMappingURL=chain.js.map
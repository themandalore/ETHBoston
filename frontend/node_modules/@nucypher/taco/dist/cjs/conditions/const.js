"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESERVED_CONTEXT_PARAMS = exports.SUPPORTED_CHAIN_IDS = exports.CONTEXT_PARAM_PREFIX = exports.CONTEXT_PARAM_REGEXP = exports.ETH_ADDRESS_REGEXP = exports.USER_ADDRESS_PARAM = void 0;
const shared_1 = require("@nucypher/shared");
exports.USER_ADDRESS_PARAM = ':userAddress';
exports.ETH_ADDRESS_REGEXP = new RegExp('^0x[a-fA-F0-9]{40}$');
// Only allow alphanumeric characters and underscores
exports.CONTEXT_PARAM_REGEXP = new RegExp('^:[a-zA-Z_][a-zA-Z0-9_]*$');
exports.CONTEXT_PARAM_PREFIX = ':';
exports.SUPPORTED_CHAIN_IDS = [
    shared_1.ChainId.POLYGON,
    shared_1.ChainId.AMOY,
    shared_1.ChainId.SEPOLIA,
    shared_1.ChainId.ETHEREUM_MAINNET,
];
exports.RESERVED_CONTEXT_PARAMS = [exports.USER_ADDRESS_PARAM];
//# sourceMappingURL=const.js.map
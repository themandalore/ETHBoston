"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCanonicalAddress = exports.ChainId = void 0;
const utils_1 = require("./utils");
var ChainId;
(function (ChainId) {
    ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
    ChainId[ChainId["AMOY"] = 80002] = "AMOY";
    ChainId[ChainId["SEPOLIA"] = 11155111] = "SEPOLIA";
    ChainId[ChainId["ETHEREUM_MAINNET"] = 1] = "ETHEREUM_MAINNET";
})(ChainId || (exports.ChainId = ChainId = {}));
const toCanonicalAddress = (address) => {
    const ethAddressStringPrefix = '0x';
    const nonPrefixed = address.startsWith(ethAddressStringPrefix)
        ? address.substring(ethAddressStringPrefix.length)
        : address;
    return (0, utils_1.fromHexString)(nonPrefixed);
};
exports.toCanonicalAddress = toCanonicalAddress;
//# sourceMappingURL=web3.js.map
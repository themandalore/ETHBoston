"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressEqual = exports.compareAddress = exports.shortenIfAddress = exports.shortenAddress = void 0;
const ethers_1 = require("ethers");
const ethers_2 = require("ethers");
const common_1 = require("./common");
/**
 * @public
 */
function shortenAddress(address) {
    try {
        const formattedAddress = ethers_1.utils.getAddress(address);
        return (0, common_1.shortenString)(formattedAddress);
    }
    catch (_a) {
        throw new TypeError("Invalid input, address can't be parsed");
    }
}
exports.shortenAddress = shortenAddress;
/**
 * @public
 */
function shortenIfAddress(address) {
    if (typeof address === 'string' && address.length > 0) {
        return shortenAddress(address);
    }
    return '';
}
exports.shortenIfAddress = shortenIfAddress;
/**
 * @public
 */
function compareAddress(firstAddress, secondAddress) {
    try {
        const parsedFirstAddress = ethers_2.BigNumber.from(firstAddress);
        const parsedSecondAddress = ethers_2.BigNumber.from(secondAddress);
        if (parsedFirstAddress.gt(parsedSecondAddress)) {
            return 1;
        }
        if (parsedFirstAddress.lt(parsedSecondAddress)) {
            return -1;
        }
        return 0;
    }
    catch (_a) {
        throw new TypeError("Invalid input, address can't be parsed");
    }
}
exports.compareAddress = compareAddress;
/**
 * @public
 */
function addressEqual(firstAddress, secondAddress) {
    try {
        return ethers_1.utils.getAddress(firstAddress) === ethers_1.utils.getAddress(secondAddress);
    }
    catch (_a) {
        throw new TypeError("Invalid input, address can't be parsed");
    }
}
exports.addressEqual = addressEqual;
//# sourceMappingURL=address.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeAggregate = void 0;
const common_1 = require("../common");
const encoder_1 = require("../multicall2/encoder");
const constants_1 = require("./constants");
const selector = constants_1.ethersAbi.getSighash('aggregate');
function encodeAggregate(calls) {
    // function aggregate(tuple(address target, bytes callData)[] calls) public returns (tuple(uint256 blockNumber, bytes returnData)[])
    // offset of the array is 0x20 because the only thing
    // that goes before the array is the offset itself
    const dynamicOffset = 0x20;
    const res = selector + (0, common_1.encodeUint)(dynamicOffset);
    // encode dynamic array of calls
    return (0, encoder_1.encodeCalls)(res, calls);
}
exports.encodeAggregate = encodeAggregate;
//# sourceMappingURL=encoder.js.map
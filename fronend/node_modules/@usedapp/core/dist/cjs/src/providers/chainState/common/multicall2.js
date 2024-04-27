"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastEncodingMulticall2 = exports.multicall2 = exports.multicall2Factory = void 0;
const ethers_1 = require("ethers");
const multicall2_1 = require("../../../abi/multicall2");
const ABI = [
    'function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public view returns (tuple(bool success, bytes returnData)[])',
];
/**
 * @public
 */
const multicall2Factory = (fastEncoding) => (fastEncoding ? fastEncodingMulticall2 : multicall2);
exports.multicall2Factory = multicall2Factory;
/**
 * @public
 */
async function multicall2(provider, address, blockNumber, requests) {
    if (requests.length === 0) {
        return {};
    }
    const contract = new ethers_1.Contract(address, ABI, provider);
    const results = await contract.tryAggregate(false, requests.map(({ address, data }) => [address, data]), { blockTag: blockNumber });
    return decodeResult(results, requests);
}
exports.multicall2 = multicall2;
/**
 * @public
 */
async function fastEncodingMulticall2(provider, address, blockNumber, requests) {
    if (requests.length === 0) {
        return {};
    }
    const response = await provider.call({
        to: address,
        data: (0, multicall2_1.encodeTryAggregate)(false, requests.map(({ address, data }) => [address, data])),
    }, blockNumber);
    const [results] = (0, multicall2_1.decodeTryAggregate)(response);
    return decodeResult(results, requests);
}
exports.fastEncodingMulticall2 = fastEncodingMulticall2;
function decodeResult(results, requests) {
    var _a;
    const state = {};
    for (let i = 0; i < requests.length; i++) {
        const { address, data } = requests[i];
        const [success, value] = results[i];
        const stateForAddress = (_a = state[address]) !== null && _a !== void 0 ? _a : {};
        stateForAddress[data] = { success, value };
        state[address] = stateForAddress;
    }
    return state;
}
//# sourceMappingURL=multicall2.js.map
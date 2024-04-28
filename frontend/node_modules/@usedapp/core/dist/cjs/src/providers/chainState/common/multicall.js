"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastEncodingMulticall = exports.multicall = exports.multicall1Factory = void 0;
const ethers_1 = require("ethers");
const multicall_1 = require("../../../abi/multicall");
const ABI = [
    'function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)',
];
/**
 * @public
 */
const multicall1Factory = (fastEncoding) => (fastEncoding ? fastEncodingMulticall : multicall);
exports.multicall1Factory = multicall1Factory;
/**
 * @public
 */
async function multicall(provider, address, blockNumber, requests) {
    if (requests.length === 0) {
        return {};
    }
    const contract = new ethers_1.Contract(address, ABI, provider);
    const [, results] = await contract.aggregate(requests.map(({ address, data }) => [address, data]), { blockTag: blockNumber });
    return decodeResult(results, requests);
}
exports.multicall = multicall;
/**
 * @public
 */
async function fastEncodingMulticall(provider, address, blockNumber, requests) {
    if (requests.length === 0) {
        return {};
    }
    const response = await provider.call({
        to: address,
        data: (0, multicall_1.encodeAggregate)(requests.map(({ address, data }) => [address, data])),
    }, blockNumber);
    const [, results] = (0, multicall_1.decodeAggregate)(response);
    return decodeResult(results, requests);
}
exports.fastEncodingMulticall = fastEncodingMulticall;
function decodeResult(results, requests) {
    var _a;
    const state = {};
    for (let i = 0; i < requests.length; i++) {
        const { address, data } = requests[i];
        const result = results[i];
        const stateForAddress = (_a = state[address]) !== null && _a !== void 0 ? _a : {};
        stateForAddress[data] = { value: result, success: true };
        state[address] = stateForAddress;
    }
    return state;
}
//# sourceMappingURL=multicall.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeCallResult = exports.getCallsForUpdate = exports.getUniqueActiveCalls = exports.encodeCallData = exports.validateCall = exports.warnOnInvalidCall = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../abi/multicall/constants");
/**
 * @internal Intended for internal use - use it on your own risk
 */
function warnOnInvalidCall(call) {
    if (!call) {
        return;
    }
    const { contract, method, args } = call;
    console.warn(`Invalid contract call: address=${contract.address} method=${method} args=${args}`);
}
exports.warnOnInvalidCall = warnOnInvalidCall;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function validateCall(call) {
    const { contract, method, args } = call;
    if (!contract.address || !method) {
        throw new Error('Missing contract address or method name');
    }
    try {
        contract.interface.encodeFunctionData(method, args);
        return call;
    }
    catch (err) {
        throw new Error(`Invalid contract call for method="${method}" on contract="${contract.address}": ${err.message}`);
    }
}
exports.validateCall = validateCall;
/**
 * @internal Intended for internal use - use it on your own risk
 * @returns
 * One of these:
 * - a RawCall, if encoding is successful.
 * - Falsy, if there is no call to encode.
 * - an Error, if encoding fails (e.g. because of mismatched arguments).
 */
function encodeCallData(call, chainId, queryParams = {}) {
    var _a;
    if (!call) {
        return undefined;
    }
    try {
        validateCall(call);
    }
    catch (e) {
        return e;
    }
    const { contract, method, args } = call;
    const isStatic = (_a = queryParams.isStatic) !== null && _a !== void 0 ? _a : queryParams.refresh === 'never';
    const refreshPerBlocks = typeof queryParams.refresh === 'number' ? queryParams.refresh : undefined;
    return {
        address: contract.address,
        data: contract.interface.encodeFunctionData(method, args),
        chainId,
        isStatic,
        refreshPerBlocks,
    };
}
exports.encodeCallData = encodeCallData;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function getUniqueActiveCalls(requests) {
    const unique = [];
    const used = {};
    for (const request of requests) {
        if (!used[`${request.address.toLowerCase()}${request.data}${request.chainId}`]) {
            unique.push(request);
            used[`${request.address.toLowerCase()}${request.data}${request.chainId}`] = true;
        }
    }
    return unique;
}
exports.getUniqueActiveCalls = getUniqueActiveCalls;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function getCallsForUpdate(requests, options) {
    const callsForUpdate = [];
    for (const request of requests) {
        if (options) {
            if (options.chainId && options.chainId !== request.chainId) {
                continue;
            }
            if (request.isStatic && request.lastUpdatedBlockNumber !== undefined) {
                continue;
            }
            const currentBlock = options.blockNumber;
            if (currentBlock && request.lastUpdatedBlockNumber && request.refreshPerBlocks) {
                if (currentBlock < request.lastUpdatedBlockNumber + request.refreshPerBlocks) {
                    continue;
                }
            }
        }
        callsForUpdate.push(request);
    }
    return callsForUpdate;
}
exports.getCallsForUpdate = getCallsForUpdate;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function decodeCallResult(call, result) {
    var _a;
    if (!result || !call) {
        return undefined;
    }
    const { value, success } = result;
    try {
        if (success) {
            return {
                value: call.contract.interface.decodeFunctionResult(call.method, value),
                error: undefined,
            };
        }
        else {
            const errorMessage = (_a = tryDecodeErrorData(value, call.contract.interface)) !== null && _a !== void 0 ? _a : 'Unknown error';
            return {
                value: undefined,
                error: new Error(errorMessage),
            };
        }
    }
    catch (error) {
        return {
            value: undefined,
            error: error,
        };
    }
}
exports.decodeCallResult = decodeCallResult;
function tryDecodeErrorData(data, contractInterface) {
    if (data === '0x') {
        return 'Call reverted without a cause message';
    }
    if (data.startsWith('0x08c379a0')) {
        // decode Error(string)
        const reason = new ethers_1.utils.Interface(['function Error(string)']).decodeFunctionData('Error', data)[0];
        if (reason.startsWith('VM Exception')) {
            return constants_1.defaultMulticall1ErrorMessage;
        }
        return reason;
    }
    if (data.startsWith('0x4e487b71')) {
        // decode Panic(uint)
        const code = new ethers_1.utils.Interface(['function Panic(uint)']).decodeFunctionData('Panic', data)[0];
        return `panic code ${code._hex}`;
    }
    try {
        const errorInfo = contractInterface.parseError(data);
        return `error ${errorInfo.name}`;
    }
    catch (e) {
        console.error(e);
    }
}
//# sourceMappingURL=calls.js.map
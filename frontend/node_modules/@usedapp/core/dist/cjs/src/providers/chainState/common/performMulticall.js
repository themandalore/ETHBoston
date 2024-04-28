"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performMulticall = void 0;
const devtools_1 = require("../../devtools");
function performMulticall(provider, multicallExecutor, multicallAddress, blockNumber, uniqueCalls, dispatchState, chainId, reportError) {
    if (uniqueCalls.length === 0) {
        return;
    }
    const start = Date.now();
    multicallExecutor(provider, multicallAddress, blockNumber, uniqueCalls)
        .then((state) => {
        dispatchState({ type: 'FETCH_SUCCESS', blockNumber, chainId, state });
        (0, devtools_1.notifyDevtools)({
            type: 'MULTICALL_SUCCESS',
            duration: Date.now() - start,
            chainId,
            blockNumber,
            multicallAddress,
            state,
        });
    })
        .catch((error) => {
        reportError(error);
        dispatchState({ type: 'FETCH_ERROR', blockNumber, chainId, error });
        (0, devtools_1.notifyDevtools)({
            type: 'MULTICALL_ERROR',
            duration: Date.now() - start,
            chainId,
            blockNumber,
            multicallAddress,
            calls: uniqueCalls,
            error,
        });
    });
}
exports.performMulticall = performMulticall;
//# sourceMappingURL=performMulticall.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDevtoolsReporting = void 0;
const react_1 = require("react");
const hooks_1 = require("../../../hooks");
const devtools_1 = require("../../devtools");
function useDevtoolsReporting(uniqueCallsJSON, uniqueCalls, blockNumber, multicallAddresses) {
    const { chainId, account, error } = (0, hooks_1.useEthers)();
    const multicall = chainId !== undefined ? multicallAddresses[chainId] : undefined;
    (0, react_1.useEffect)(() => {
        (0, devtools_1.notifyDevtools)({ type: 'NETWORK_CHANGED', chainId, multicallAddress: multicall });
    }, [chainId, multicall]);
    (0, react_1.useEffect)(() => {
        (0, devtools_1.notifyDevtools)({ type: 'ACCOUNT_CHANGED', address: account !== null && account !== void 0 ? account : undefined });
    }, [account]);
    (0, react_1.useEffect)(() => {
        (0, devtools_1.notifyDevtools)({ type: 'CALLS_CHANGED', chainId, calls: uniqueCalls });
    }, [uniqueCallsJSON]);
    (0, react_1.useEffect)(() => {
        if (chainId !== undefined && blockNumber !== undefined) {
            (0, devtools_1.notifyDevtools)({ type: 'BLOCK_NUMBER_CHANGED', chainId, blockNumber });
        }
    }, [blockNumber, chainId]);
    (0, react_1.useEffect)(() => {
        if (error !== undefined) {
            (0, devtools_1.notifyDevtools)({ type: 'GENERIC_ERROR', error });
        }
    }, [error]);
}
exports.useDevtoolsReporting = useDevtoolsReporting;
//# sourceMappingURL=useDevtoolsReporting.js.map
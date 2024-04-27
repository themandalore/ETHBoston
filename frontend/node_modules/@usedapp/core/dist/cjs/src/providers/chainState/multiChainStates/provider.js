"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiChainStateProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hooks_1 = require("../../../hooks");
const context_1 = require("./context");
const __1 = require("../../..");
const network_1 = require("../../network");
const fromEntries_1 = require("../../../helpers/fromEntries");
const performMulticall_1 = require("../common/performMulticall");
const common_1 = require("../common");
const helpers_1 = require("../../../helpers");
const useDevtoolsReporting_1 = require("../common/useDevtoolsReporting");
const useChainId_1 = require("../../../hooks/useChainId");
const context_2 = require("../../window/context");
const context_3 = require("../../network/readonlyNetworks/context");
function composeChainState(networks, state, multicallAddresses) {
    return (0, fromEntries_1.fromEntries)(Object.keys(networks).map((chainId) => [
        Number(chainId),
        {
            value: state[Number(chainId)],
            multicallAddress: multicallAddresses[Number(chainId)],
        },
    ]));
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripCall = ({ isStatic, lastUpdatedBlockNumber, ...strippedCall }) => strippedCall;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function MultiChainStateProvider({ children, multicallAddresses }) {
    const { multicallVersion, fastMulticallEncoding } = (0, __1.useConfig)();
    const networks = (0, network_1.useReadonlyNetworks)();
    const blockNumbers = (0, hooks_1.useBlockNumbers)();
    const dispatchNetworksState = (0, context_3.useUpdateNetworksState)();
    const isActive = (0, context_2.useWindow)();
    const [calls, dispatchCalls] = (0, react_1.useReducer)(common_1.callsReducer, []);
    const [state, dispatchState] = (0, react_1.useReducer)(common_1.chainStateReducer, {});
    const { reportError } = (0, network_1.useConnector)();
    const multicall = (multicallVersion === 1 ? common_1.multicall1Factory : common_1.multicall2Factory)(fastMulticallEncoding !== null && fastMulticallEncoding !== void 0 ? fastMulticallEncoding : false);
    const [debouncedCalls, debouncedNetworks] = (0, hooks_1.useDebouncePair)(calls, networks, 50);
    const uniqueCalls = (0, react_1.useMemo)(() => (0, helpers_1.getUniqueActiveCalls)(debouncedCalls), [debouncedCalls]);
    // used for deep equality in hook dependencies
    const uniqueCallsJSON = JSON.stringify(debouncedCalls.map(stripCall));
    const chainId = (0, useChainId_1.useChainId)();
    (0, useDevtoolsReporting_1.useDevtoolsReporting)(uniqueCallsJSON, uniqueCalls, chainId !== undefined ? blockNumbers[chainId] : undefined, multicallAddresses);
    function multicallForChain(chainId, provider) {
        if (!isActive) {
            return;
        }
        const blockNumber = blockNumbers[chainId];
        const multicallAddress = multicallAddresses[chainId];
        if (!provider || !blockNumber) {
            return;
        }
        if (debouncedNetworks !== networks) {
            // Wait for debounce to catch up.
            return;
        }
        const updatedCalls = (0, helpers_1.getCallsForUpdate)(debouncedCalls, { chainId, blockNumber });
        const callsOnThisChain = (0, helpers_1.getUniqueActiveCalls)(updatedCalls);
        if (callsOnThisChain.length > 0 && !multicallAddress) {
            reportError(new Error(`Missing multicall address for chain id ${chainId}`));
            return;
        }
        (0, performMulticall_1.performMulticall)(provider, multicall, multicallAddress, blockNumber, callsOnThisChain, dispatchState, chainId, (error) => {
            dispatchNetworksState({
                type: 'ADD_ERROR',
                chainId,
                error,
            });
        });
        dispatchCalls({ type: 'UPDATE_CALLS', calls, updatedCalls, blockNumber, chainId });
    }
    (0, react_1.useEffect)(() => {
        var _a, _b;
        for (const [_chainId, provider] of Object.entries(networks)) {
            const chainId = Number(_chainId);
            // chainId is in provider is not the same as the chainId in the state wait for chainId to catch up
            if (chainId === ((_a = provider.network) === null || _a === void 0 ? void 0 : _a.chainId) || chainId === ((_b = provider._network) === null || _b === void 0 ? void 0 : _b.chainId)) {
                multicallForChain(chainId, provider);
            }
        }
    }, [networks, multicallAddresses, uniqueCallsJSON, blockNumbers]);
    const chains = (0, react_1.useMemo)(() => composeChainState(networks, state, multicallAddresses), [
        state,
        multicallAddresses,
        networks,
    ]);
    const provided = { chains, dispatchCalls };
    return (0, jsx_runtime_1.jsx)(context_1.MultiChainStatesContext.Provider, { value: provided, children: children });
}
exports.MultiChainStateProvider = MultiChainStateProvider;
//# sourceMappingURL=provider.js.map
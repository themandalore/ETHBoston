"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadonlyNetworksProvider = exports.getProvidersFromConfig = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ethers_1 = require("ethers");
const hooks_1 = require("../../../hooks");
const context_1 = require("./context");
const fromEntries_1 = require("../../../helpers/fromEntries");
const reducer_1 = require("./reducer");
const window_1 = require("../../window");
const helpers_1 = require("../../../helpers");
const { Provider, StaticJsonRpcProvider } = ethers_1.providers;
const getProviderFromConfig = (urlOrProviderOrProviderFunction) => {
    if (Provider.isProvider(urlOrProviderOrProviderFunction)) {
        return urlOrProviderOrProviderFunction;
    }
    if (typeof urlOrProviderOrProviderFunction === 'function') {
        return urlOrProviderOrProviderFunction();
    }
    return new StaticJsonRpcProvider(urlOrProviderOrProviderFunction);
};
const getProvidersFromConfig = (readOnlyUrls) => (0, fromEntries_1.fromEntries)(Object.entries(readOnlyUrls).map(([chainId, urlOrProviderOrProviderFunction]) => [
    chainId,
    getProviderFromConfig(urlOrProviderOrProviderFunction),
]));
exports.getProvidersFromConfig = getProvidersFromConfig;
function ReadonlyNetworksProvider({ providerOverrides = {}, children }) {
    const { readOnlyUrls = {}, pollingInterval, pollingIntervals } = (0, hooks_1.useConfig)();
    const isActive = (0, window_1.useWindow)();
    const [providers, setProviders] = (0, react_1.useState)(() => ({
        ...(0, exports.getProvidersFromConfig)(readOnlyUrls),
        ...providerOverrides,
    }));
    const [networkStates, dispatchNetworkState] = (0, react_1.useReducer)(reducer_1.networkStatesReducer, {
        ...(0, fromEntries_1.fromEntries)(Object.keys({ ...readOnlyUrls, ...providerOverrides }).map((chainId) => [chainId, { errors: [] }])),
    });
    const getPollingInterval = (0, react_1.useCallback)((chainId) => { var _a; return (_a = pollingIntervals === null || pollingIntervals === void 0 ? void 0 : pollingIntervals[chainId]) !== null && _a !== void 0 ? _a : pollingInterval; }, [
        pollingInterval,
        pollingIntervals,
    ]);
    (0, react_1.useEffect)(() => {
        setProviders({ ...(0, exports.getProvidersFromConfig)(readOnlyUrls), ...providerOverrides });
    }, Object.entries(readOnlyUrls).flat());
    (0, react_1.useEffect)(() => {
        for (const [chainId] of Object.entries(readOnlyUrls)) {
            const provider = providers[chainId];
            if (provider && !(0, helpers_1.isWebSocketProvider)(provider)) {
                provider.polling = isActive;
            }
        }
    }, [isActive, providers, readOnlyUrls]);
    (0, react_1.useEffect)(() => {
        for (const [chainId, provider] of Object.entries(providers)) {
            if (!(0, helpers_1.isWebSocketProvider)(provider)) {
                provider.pollingInterval = getPollingInterval(Number(chainId));
            }
        }
    }, [providers, getPollingInterval]);
    const networks = (0, react_1.useMemo)(() => ({
        providers,
        updateNetworkState: dispatchNetworkState,
        networkStates,
    }), [providers, dispatchNetworkState, networkStates]);
    return (0, jsx_runtime_1.jsx)(context_1.ReadonlyNetworksContext.Provider, { value: networks, children: children });
}
exports.ReadonlyNetworksProvider = ReadonlyNetworksProvider;
//# sourceMappingURL=provider.js.map
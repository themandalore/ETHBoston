import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { providers } from 'ethers';
import { useConfig } from '../../../hooks';
import { ReadonlyNetworksContext } from './context';
import { fromEntries } from '../../../helpers/fromEntries';
import { networkStatesReducer } from './reducer';
import { useWindow } from '../../window';
import { isWebSocketProvider } from '../../../helpers';
const { Provider, StaticJsonRpcProvider } = providers;
const getProviderFromConfig = (urlOrProviderOrProviderFunction) => {
    if (Provider.isProvider(urlOrProviderOrProviderFunction)) {
        return urlOrProviderOrProviderFunction;
    }
    if (typeof urlOrProviderOrProviderFunction === 'function') {
        return urlOrProviderOrProviderFunction();
    }
    return new StaticJsonRpcProvider(urlOrProviderOrProviderFunction);
};
export const getProvidersFromConfig = (readOnlyUrls) => fromEntries(Object.entries(readOnlyUrls).map(([chainId, urlOrProviderOrProviderFunction]) => [
    chainId,
    getProviderFromConfig(urlOrProviderOrProviderFunction),
]));
export function ReadonlyNetworksProvider({ providerOverrides = {}, children }) {
    const { readOnlyUrls = {}, pollingInterval, pollingIntervals } = useConfig();
    const isActive = useWindow();
    const [providers, setProviders] = useState(() => (Object.assign(Object.assign({}, getProvidersFromConfig(readOnlyUrls)), providerOverrides)));
    const [networkStates, dispatchNetworkState] = useReducer(networkStatesReducer, Object.assign({}, fromEntries(Object.keys(Object.assign(Object.assign({}, readOnlyUrls), providerOverrides)).map((chainId) => [chainId, { errors: [] }]))));
    const getPollingInterval = useCallback((chainId) => { var _a; return (_a = pollingIntervals === null || pollingIntervals === void 0 ? void 0 : pollingIntervals[chainId]) !== null && _a !== void 0 ? _a : pollingInterval; }, [
        pollingInterval,
        pollingIntervals,
    ]);
    useEffect(() => {
        setProviders(Object.assign(Object.assign({}, getProvidersFromConfig(readOnlyUrls)), providerOverrides));
    }, Object.entries(readOnlyUrls).flat());
    useEffect(() => {
        for (const [chainId] of Object.entries(readOnlyUrls)) {
            const provider = providers[chainId];
            if (provider && !isWebSocketProvider(provider)) {
                provider.polling = isActive;
            }
        }
    }, [isActive, providers, readOnlyUrls]);
    useEffect(() => {
        for (const [chainId, provider] of Object.entries(providers)) {
            if (!isWebSocketProvider(provider)) {
                provider.pollingInterval = getPollingInterval(Number(chainId));
            }
        }
    }, [providers, getPollingInterval]);
    const networks = useMemo(() => ({
        providers,
        updateNetworkState: dispatchNetworkState,
        networkStates,
    }), [providers, dispatchNetworkState, networkStates]);
    return _jsx(ReadonlyNetworksContext.Provider, Object.assign({ value: networks }, { children: children }));
}
//# sourceMappingURL=provider.js.map
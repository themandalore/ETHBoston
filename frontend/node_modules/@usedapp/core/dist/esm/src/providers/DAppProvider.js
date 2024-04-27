import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ConfigProvider } from './config';
import { MultiChainStateProvider } from './chainState';
import { useConfig } from '../hooks';
import { NotificationsProvider } from './notifications/provider';
import { TransactionProvider } from './transactions/provider';
import { LocalMulticallProvider } from './LocalMulticallProvider';
import { ReadonlyNetworksProvider } from './network';
import { BlockNumbersProvider } from './blockNumber/blockNumbers';
import { WindowProvider } from './window';
import { ConnectorContextProvider } from './network/connectors/context';
/**
 * Provides basic services for a DApp.
 * @public
 */
export function DAppProvider({ config, children }) {
    return (_jsx(ConfigProvider, Object.assign({ config: config }, { children: _jsx(DAppProviderWithConfig, { children: children }) })));
}
const getMulticallAddresses = (networks) => {
    const result = {};
    networks === null || networks === void 0 ? void 0 : networks.forEach((network) => (result[network.chainId] = network.multicallAddress));
    return result;
};
const getMulticall2Addresses = (networks) => {
    const result = {};
    networks === null || networks === void 0 ? void 0 : networks.forEach((network) => {
        if (network.multicall2Address) {
            result[network.chainId] = network.multicall2Address;
        }
    });
    return result;
};
function DAppProviderWithConfig({ children }) {
    const { multicallAddresses, networks, multicallVersion } = useConfig();
    const defaultAddresses = useMemo(() => (multicallVersion === 1 ? getMulticallAddresses(networks) : getMulticall2Addresses(networks)), [networks, multicallVersion]);
    const multicallAddressesMerged = useMemo(() => (Object.assign(Object.assign({}, defaultAddresses), multicallAddresses)), [
        defaultAddresses,
        multicallAddresses,
    ]);
    return (_jsx(WindowProvider, { children: _jsx(ReadonlyNetworksProvider, { children: _jsx(ConnectorContextProvider, { children: _jsx(BlockNumbersProvider, { children: _jsx(LocalMulticallProvider, { children: _jsx(MultiChainStateProvider, Object.assign({ multicallAddresses: multicallAddressesMerged }, { children: _jsx(NotificationsProvider, { children: _jsx(TransactionProvider, { children: children }) }) })) }) }) }) }) }));
}
//# sourceMappingURL=DAppProvider.js.map
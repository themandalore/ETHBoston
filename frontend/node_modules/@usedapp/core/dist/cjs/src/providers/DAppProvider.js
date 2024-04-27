"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAppProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const config_1 = require("./config");
const chainState_1 = require("./chainState");
const hooks_1 = require("../hooks");
const provider_1 = require("./notifications/provider");
const provider_2 = require("./transactions/provider");
const LocalMulticallProvider_1 = require("./LocalMulticallProvider");
const network_1 = require("./network");
const blockNumbers_1 = require("./blockNumber/blockNumbers");
const window_1 = require("./window");
const context_1 = require("./network/connectors/context");
/**
 * Provides basic services for a DApp.
 * @public
 */
function DAppProvider({ config, children }) {
    return ((0, jsx_runtime_1.jsx)(config_1.ConfigProvider, { config: config, children: (0, jsx_runtime_1.jsx)(DAppProviderWithConfig, { children: children }) }));
}
exports.DAppProvider = DAppProvider;
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
    const { multicallAddresses, networks, multicallVersion } = (0, hooks_1.useConfig)();
    const defaultAddresses = (0, react_1.useMemo)(() => (multicallVersion === 1 ? getMulticallAddresses(networks) : getMulticall2Addresses(networks)), [networks, multicallVersion]);
    const multicallAddressesMerged = (0, react_1.useMemo)(() => ({ ...defaultAddresses, ...multicallAddresses }), [
        defaultAddresses,
        multicallAddresses,
    ]);
    return ((0, jsx_runtime_1.jsx)(window_1.WindowProvider, { children: (0, jsx_runtime_1.jsx)(network_1.ReadonlyNetworksProvider, { children: (0, jsx_runtime_1.jsx)(context_1.ConnectorContextProvider, { children: (0, jsx_runtime_1.jsx)(blockNumbers_1.BlockNumbersProvider, { children: (0, jsx_runtime_1.jsx)(LocalMulticallProvider_1.LocalMulticallProvider, { children: (0, jsx_runtime_1.jsx)(chainState_1.MultiChainStateProvider, { multicallAddresses: multicallAddressesMerged, children: (0, jsx_runtime_1.jsx)(provider_1.NotificationsProvider, { children: (0, jsx_runtime_1.jsx)(provider_2.TransactionProvider, { children: children }) }) }) }) }) }) }) }));
}
//# sourceMappingURL=DAppProvider.js.map
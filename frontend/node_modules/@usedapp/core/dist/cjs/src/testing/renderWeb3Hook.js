"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWeb3Hook = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hooks_1 = require("@testing-library/react-hooks");
const providers_1 = require("../providers");
const utils_1 = require("./utils");
const blockNumbers_1 = require("../providers/blockNumber/blockNumbers");
const network_1 = require("../providers/network");
/**
 * A utility function for testing React hooks in useDApp ecosystem.
 *
 * It wraps a `renderHook` from `@testing-library/react-hooks`,
 * adding functionality related to:
 * - initializing web3 providers,
 * - auto-deploying multicall,
 * - adding helpers such as `mineBlock`,
 * - adding necessary useDApp context providers.
 *
 * @public
 * @param hook Hook under test
 * @param options Optional options, same as in `renderHook`
 * @returns Same as in `renderHook`, with additions of helper functions.
 */
const renderWeb3Hook = async (hook, options) => {
    var _a, _b, _c, _d;
    const providers = {};
    const multicallAddresses = {};
    const addSingleProvider = async (currentProvider) => {
        const { chainId } = await currentProvider.getNetwork();
        providers[chainId] = currentProvider;
        const multicallDeployer = (options === null || options === void 0 ? void 0 : options.multicallVersion) === 2 ? utils_1.deployMulticall2 : utils_1.deployMulticall;
        const mockMulticallAddresses = await multicallDeployer(chainId, currentProvider.getAdminWallet());
        multicallAddresses[chainId] = mockMulticallAddresses[chainId];
        // In some occasions the block number lags behind.
        // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
        // and it results in a failed call. So we force the provider to catch up on the block number here.
        await currentProvider.getBlockNumber();
    };
    const defaultProvider = (options === null || options === void 0 ? void 0 : options.mockProvider) || new utils_1.MockProvider();
    await addSingleProvider(defaultProvider);
    const readOnlyProviders = (_a = options === null || options === void 0 ? void 0 : options.readonlyMockProviders) !== null && _a !== void 0 ? _a : {};
    for (const chainIdString in readOnlyProviders) {
        const chainId = Number(chainIdString);
        await addSingleProvider(readOnlyProviders[chainId]);
    }
    if (Object.keys(readOnlyProviders).length === 0) {
        const defaultReadOnlyProvider = new utils_1.MockProvider();
        await addSingleProvider(defaultReadOnlyProvider);
        const { chainId } = await defaultReadOnlyProvider.getNetwork();
        readOnlyProviders[chainId] = defaultReadOnlyProvider;
    }
    const UserWrapper = (_c = (_b = options === null || options === void 0 ? void 0 : options.renderHook) === null || _b === void 0 ? void 0 : _b.wrapper) !== null && _c !== void 0 ? _c : utils_1.IdentityWrapper;
    const { result, waitForNextUpdate, rerender, unmount } = (0, react_hooks_1.renderHook)(hook, {
        wrapper: (wrapperProps) => {
            var _a, _b;
            return ((0, jsx_runtime_1.jsx)(providers_1.ConfigProvider, { config: {
                    readOnlyUrls: readOnlyProviders,
                    pollingInterval: (_b = (_a = options === null || options === void 0 ? void 0 : options.mockProviderOptions) === null || _a === void 0 ? void 0 : _a.pollingInterval) !== null && _b !== void 0 ? _b : 200,
                    multicallVersion: options === null || options === void 0 ? void 0 : options.multicallVersion,
                }, children: (0, jsx_runtime_1.jsx)(network_1.ConnectorContextProvider, { children: (0, jsx_runtime_1.jsx)(network_1.ReadonlyNetworksProvider, { providerOverrides: readOnlyProviders, children: (0, jsx_runtime_1.jsx)(blockNumbers_1.BlockNumbersProvider, { children: (0, jsx_runtime_1.jsx)(providers_1.MultiChainStateProvider, { multicallAddresses: multicallAddresses, children: (0, jsx_runtime_1.jsx)(UserWrapper, { ...wrapperProps }) }) }) }) }) }));
        },
        initialProps: (_d = options === null || options === void 0 ? void 0 : options.renderHook) === null || _d === void 0 ? void 0 : _d.initialProps,
    });
    return {
        result,
        defaultProvider,
        mineBlock: async () => {
            await Promise.all([defaultProvider, ...Object.values(readOnlyProviders)].map((provider) => (0, utils_1.mineBlock)(provider.getAdminWallet())));
        },
        rerender,
        unmount,
        // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
        waitForNextUpdate,
        ...(0, utils_1.getWaitUtils)(result),
    };
};
exports.renderWeb3Hook = renderWeb3Hook;
//# sourceMappingURL=renderWeb3Hook.js.map
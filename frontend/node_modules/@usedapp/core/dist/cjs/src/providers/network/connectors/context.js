"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnector = exports.ConnectorContextProvider = exports.ConnectorContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const react_1 = require("react");
const hooks_1 = require("../../../hooks");
const context_1 = require("../readonlyNetworks/context");
const connectorController_1 = require("./connectorController");
const implementations_1 = require("./implementations");
const Provider = ethers_1.providers.Provider;
const getAccount = (connector) => {
    if (connector === null || connector === void 0 ? void 0 : connector.accounts[0]) {
        return (0, utils_1.getAddress)(connector.accounts[0]);
    }
    return undefined;
};
exports.ConnectorContext = (0, react_1.createContext)({
    connector: undefined,
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    activate: async () => { },
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    deactivate: () => { },
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    activateBrowserWallet: () => { },
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    reportError: () => { },
    isLoading: true,
    setError: () => {
        throw new Error('Function not implemented.');
    },
    active: false,
    switchNetwork: () => {
        throw new Error('Function not implemented.');
    },
});
function ConnectorContextProvider({ children }) {
    var _a;
    const [controller, setController] = (0, react_1.useState)();
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    const config = (0, hooks_1.useConfig)();
    const { connectors, autoConnect } = config;
    const [autoConnectTag, setAutoConnectTag] = (0, hooks_1.useLocalStorage)('usedapp:autoConnectTag');
    const activate = (0, react_1.useCallback)(async (providerOrConnector, { silently, onSuccess } = { silently: false }) => {
        let controller;
        if ('activate' in providerOrConnector) {
            controller = new connectorController_1.ConnectorController(providerOrConnector, config);
        }
        else {
            const wrappedProvider = Provider.isProvider(providerOrConnector)
                ? providerOrConnector
                : new ethers_1.providers.Web3Provider(providerOrConnector);
            controller = new connectorController_1.ConnectorController(new implementations_1.InjectedConnector(wrappedProvider), config);
        }
        setLoading(true);
        setController(controller);
        try {
            if (silently) {
                await controller.activate((connector) => connector.connectEagerly());
            }
            else {
                await controller.activate();
            }
            setLoading(false);
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        }
        catch (error) {
            controller.reportError(error);
        }
        finally {
            setLoading(false);
        }
    }, [setController, setLoading]);
    const activateBrowserWallet = (0, react_1.useCallback)(async (options) => {
        // done for backward compatibility.
        // If the options object looks like an event object or is undefined,
        // it's not a valid option and will be ignored
        if (!options || typeof options.preventDefault === 'function') {
            options = { type: 'metamask' };
        }
        const { type } = options;
        if (!connectors[type]) {
            throw new Error(`Connector ${type} is not configured`);
        }
        await activate(connectors[type], {
            onSuccess: () => {
                setAutoConnectTag(type);
            },
        });
    }, [activate, setAutoConnectTag, connectors]);
    const deactivate = (0, react_1.useCallback)(async () => {
        setAutoConnectTag(undefined);
        setLoading(true);
        setController(undefined);
        await (controller === null || controller === void 0 ? void 0 : controller.deactivate());
        setLoading(false);
    }, [controller]);
    const reportError = (0, react_1.useCallback)((err) => {
        controller === null || controller === void 0 ? void 0 : controller.reportError(err);
    }, [controller]);
    const switchNetwork = (0, react_1.useCallback)(async (chainId) => {
        await (controller === null || controller === void 0 ? void 0 : controller.switchNetwork(chainId));
    }, [controller]);
    const setErrorDeprecated = (0, react_1.useCallback)(() => {
        throw new Error('setError is deprecated');
    }, []);
    const ethersActivate = (0, react_1.useCallback)(async (providerOrConnector) => {
        if ('getProvider' in providerOrConnector) {
            console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.');
            await providerOrConnector.activate();
            return activate(await providerOrConnector.getProvider());
        }
        return activate(providerOrConnector);
    }, []);
    (0, react_1.useEffect)(() => {
        if (autoConnect && autoConnectTag && connectors[autoConnectTag]) {
            void activate(connectors[autoConnectTag], {
                silently: true,
            });
        }
        else {
            setLoading(false);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        controller === null || controller === void 0 ? void 0 : controller.updateConfig(config);
    }, [controller, config]);
    const readonlyNetwork = (0, hooks_1.useReadonlyNetwork)();
    const [errors, setErrors] = (0, react_1.useState)((_a = controller === null || controller === void 0 ? void 0 : controller.errors) !== null && _a !== void 0 ? _a : []);
    const [account, setAccount] = (0, react_1.useState)(getAccount(controller));
    const [provider, setProvider] = (0, react_1.useState)(controller === null || controller === void 0 ? void 0 : controller.getProvider());
    const [chainId, setChainId] = (0, react_1.useState)(controller === null || controller === void 0 ? void 0 : controller.chainId);
    (0, react_1.useEffect)(() => {
        if (!(controller === null || controller === void 0 ? void 0 : controller.getProvider())) {
            setAccount(undefined);
            setProvider(readonlyNetwork === null || readonlyNetwork === void 0 ? void 0 : readonlyNetwork.provider);
            setChainId(readonlyNetwork === null || readonlyNetwork === void 0 ? void 0 : readonlyNetwork.chainId);
            setErrors([]);
        }
        else {
            setChainId(controller.chainId);
            setErrors(controller.errors);
            setProvider(controller.getProvider());
            setAccount(getAccount(controller));
        }
        return controller === null || controller === void 0 ? void 0 : controller.updated.on(({ chainId, errors, accounts }) => {
            if (chainId) {
                setChainId(chainId);
                setProvider(controller.getProvider());
                if (accounts[0]) {
                    setAccount((0, utils_1.getAddress)(accounts[0]));
                }
                else {
                    setAccount(undefined);
                }
            }
            setErrors([...errors]);
        });
    }, [controller, controller === null || controller === void 0 ? void 0 : controller.getProvider(), readonlyNetwork]);
    const { networks, readOnlyUrls } = (0, hooks_1.useConfig)();
    const [error, setError] = (0, react_1.useState)(undefined);
    const networkStates = (0, context_1.useReadonlyNetworkStates)();
    const configuredChainIds = Object.keys(readOnlyUrls || {}).map((chainId) => parseInt(chainId, 10));
    const supportedChainIds = networks === null || networks === void 0 ? void 0 : networks.map((network) => network.chainId);
    (0, react_1.useEffect)(() => {
        const isNotConfiguredChainId = chainId && configuredChainIds && configuredChainIds.indexOf(chainId) < 0;
        const isUnsupportedChainId = chainId && supportedChainIds && supportedChainIds.indexOf(chainId) < 0;
        if (isUnsupportedChainId || isNotConfiguredChainId) {
            const chainIdError = new Error(`${isUnsupportedChainId ? 'Unsupported' : 'Not configured'} chain id: ${chainId}.`);
            chainIdError.name = 'ChainIdError';
            setError(chainIdError);
            return;
        }
        for (const networkState of Object.values(networkStates)) {
            if (networkState.errors.length > 0) {
                setError(networkState.errors[networkState.errors.length - 1]);
                return;
            }
        }
        setError(errors === null || errors === void 0 ? void 0 : errors[errors.length - 1]);
    }, [chainId, errors, networkStates]);
    return ((0, jsx_runtime_1.jsx)(exports.ConnectorContext.Provider, { value: {
            connector: controller,
            deactivate,
            reportError,
            activate: ethersActivate,
            activateBrowserWallet,
            isLoading,
            account,
            library: provider,
            chainId: (error === null || error === void 0 ? void 0 : error.name) === 'ChainIdError' ? undefined : provider !== undefined ? chainId : readonlyNetwork === null || readonlyNetwork === void 0 ? void 0 : readonlyNetwork.chainId,
            error,
            active: !!provider,
            switchNetwork,
            setError: setErrorDeprecated,
        }, children: children }));
}
exports.ConnectorContextProvider = ConnectorContextProvider;
const useConnector = () => (0, react_1.useContext)(exports.ConnectorContext);
exports.useConnector = useConnector;
//# sourceMappingURL=context.js.map
import { jsx as _jsx } from "react/jsx-runtime";
import { providers } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useConfig, useLocalStorage, useReadonlyNetwork } from '../../../hooks';
import { useReadonlyNetworkStates } from '../readonlyNetworks/context';
import { ConnectorController } from './connectorController';
import { InjectedConnector } from './implementations';
const Provider = providers.Provider;
const getAccount = (connector) => {
    if (connector === null || connector === void 0 ? void 0 : connector.accounts[0]) {
        return getAddress(connector.accounts[0]);
    }
    return undefined;
};
export const ConnectorContext = createContext({
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
export function ConnectorContextProvider({ children }) {
    var _a;
    const [controller, setController] = useState();
    const [isLoading, setLoading] = useState(true);
    const config = useConfig();
    const { connectors, autoConnect } = config;
    const [autoConnectTag, setAutoConnectTag] = useLocalStorage('usedapp:autoConnectTag');
    const activate = useCallback(async (providerOrConnector, { silently, onSuccess } = { silently: false }) => {
        let controller;
        if ('activate' in providerOrConnector) {
            controller = new ConnectorController(providerOrConnector, config);
        }
        else {
            const wrappedProvider = Provider.isProvider(providerOrConnector)
                ? providerOrConnector
                : new providers.Web3Provider(providerOrConnector);
            controller = new ConnectorController(new InjectedConnector(wrappedProvider), config);
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
    const activateBrowserWallet = useCallback(async (options) => {
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
    const deactivate = useCallback(async () => {
        setAutoConnectTag(undefined);
        setLoading(true);
        setController(undefined);
        await (controller === null || controller === void 0 ? void 0 : controller.deactivate());
        setLoading(false);
    }, [controller]);
    const reportError = useCallback((err) => {
        controller === null || controller === void 0 ? void 0 : controller.reportError(err);
    }, [controller]);
    const switchNetwork = useCallback(async (chainId) => {
        await (controller === null || controller === void 0 ? void 0 : controller.switchNetwork(chainId));
    }, [controller]);
    const setErrorDeprecated = useCallback(() => {
        throw new Error('setError is deprecated');
    }, []);
    const ethersActivate = useCallback(async (providerOrConnector) => {
        if ('getProvider' in providerOrConnector) {
            console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.');
            await providerOrConnector.activate();
            return activate(await providerOrConnector.getProvider());
        }
        return activate(providerOrConnector);
    }, []);
    useEffect(() => {
        if (autoConnect && autoConnectTag && connectors[autoConnectTag]) {
            void activate(connectors[autoConnectTag], {
                silently: true,
            });
        }
        else {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        controller === null || controller === void 0 ? void 0 : controller.updateConfig(config);
    }, [controller, config]);
    const readonlyNetwork = useReadonlyNetwork();
    const [errors, setErrors] = useState((_a = controller === null || controller === void 0 ? void 0 : controller.errors) !== null && _a !== void 0 ? _a : []);
    const [account, setAccount] = useState(getAccount(controller));
    const [provider, setProvider] = useState(controller === null || controller === void 0 ? void 0 : controller.getProvider());
    const [chainId, setChainId] = useState(controller === null || controller === void 0 ? void 0 : controller.chainId);
    useEffect(() => {
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
                    setAccount(getAddress(accounts[0]));
                }
                else {
                    setAccount(undefined);
                }
            }
            setErrors([...errors]);
        });
    }, [controller, controller === null || controller === void 0 ? void 0 : controller.getProvider(), readonlyNetwork]);
    const { networks, readOnlyUrls } = useConfig();
    const [error, setError] = useState(undefined);
    const networkStates = useReadonlyNetworkStates();
    const configuredChainIds = Object.keys(readOnlyUrls || {}).map((chainId) => parseInt(chainId, 10));
    const supportedChainIds = networks === null || networks === void 0 ? void 0 : networks.map((network) => network.chainId);
    useEffect(() => {
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
    return (_jsx(ConnectorContext.Provider, Object.assign({ value: {
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
        } }, { children: children })));
}
export const useConnector = () => useContext(ConnectorContext);
//# sourceMappingURL=context.js.map
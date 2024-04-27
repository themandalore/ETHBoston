import { providers } from 'ethers';
import { ReactNode } from 'react';
import { Connector } from './connector';
import { ConnectorController } from './connectorController';
declare type JsonRpcProvider = providers.JsonRpcProvider;
declare type ExternalProvider = providers.ExternalProvider;
declare type FallBackProvider = providers.FallbackProvider;
export declare type ActivateBrowserWallet = (arg?: {
    type: string;
}) => void;
declare type MaybePromise<T> = Promise<T> | T;
declare type SupportedProviders = JsonRpcProvider | ExternalProvider | {
    getProvider: () => MaybePromise<JsonRpcProvider | ExternalProvider>;
    activate: () => Promise<any>;
} | Connector;
export declare type Web3Ethers = {
    activate: (provider: SupportedProviders) => Promise<void>;
    /**
     * @deprecated
     */
    setError: (error: Error) => void;
    deactivate: () => void;
    chainId?: number;
    account?: string;
    error?: Error;
    library?: JsonRpcProvider | FallBackProvider;
    active: boolean;
    activateBrowserWallet: ActivateBrowserWallet;
    isLoading: boolean;
    /**
     * Switch to a different network.
     */
    switchNetwork: (chainId: number) => Promise<void>;
};
interface ConnectorContextValue extends Web3Ethers {
    connector: ConnectorController | undefined;
    deactivate: () => void;
    activateBrowserWallet: ActivateBrowserWallet;
    reportError: (error: Error) => void;
    isLoading: boolean;
}
export declare const ConnectorContext: import("react").Context<ConnectorContextValue>;
export interface ConnectorContextProviderProps {
    children?: ReactNode;
}
export interface ActivateOptions {
    silently?: boolean;
    onSuccess?: () => void;
}
export declare function ConnectorContextProvider({ children }: ConnectorContextProviderProps): JSX.Element;
export declare const useConnector: () => ConnectorContextValue;
export {};
//# sourceMappingURL=context.d.ts.map
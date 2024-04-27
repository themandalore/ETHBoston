import { providers } from 'ethers';
import { Connector, ConnectorUpdateData } from '../connector';
import { Event } from '../../../../helpers/event';
export declare class InjectedConnector implements Connector {
    provider?: providers.Web3Provider | providers.JsonRpcProvider;
    readonly name = "Injected";
    readonly update: Event<ConnectorUpdateData>;
    constructor(provider: providers.ExternalProvider | providers.Web3Provider | providers.JsonRpcProvider);
    connectEagerly(): Promise<void>;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
}
//# sourceMappingURL=injected.d.ts.map
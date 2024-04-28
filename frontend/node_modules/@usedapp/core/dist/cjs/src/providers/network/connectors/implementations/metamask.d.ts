import { Connector, ConnectorUpdateData } from '../connector';
import { providers } from 'ethers';
import { Event } from '../../../../helpers/event';
export declare function getMetamaskProvider(): Promise<providers.Web3Provider | undefined>;
export declare class MetamaskConnector implements Connector {
    provider?: providers.Web3Provider;
    readonly name = "Metamask";
    readonly update: Event<ConnectorUpdateData>;
    private init;
    connectEagerly(): Promise<void>;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
}
//# sourceMappingURL=metamask.d.ts.map
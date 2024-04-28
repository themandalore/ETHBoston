import { Connector, ConnectorUpdateData } from '../connector';
import { providers } from 'ethers';
import { Event } from '../../../../helpers/event';
export declare function getCoinbaseProvider(): Promise<providers.Web3Provider | undefined>;
export declare class CoinbaseWalletConnector implements Connector {
    provider?: providers.Web3Provider;
    readonly name = "CoinbaseWallet";
    readonly update: Event<ConnectorUpdateData>;
    private init;
    connectEagerly(): Promise<void>;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
}
//# sourceMappingURL=coinbase.d.ts.map
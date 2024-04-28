import { providers } from 'ethers';
import { FullConfig } from '../../../constants';
import { Event } from '../../../helpers/event';
import { Connector } from './connector';
export interface ControllerUpdateInfo {
    active: ConnectorController['active'];
    accounts: ConnectorController['accounts'];
    chainId: ConnectorController['chainId'];
    blockNumber: ConnectorController['blockNumber'];
    errors: ConnectorController['errors'];
}
export declare class ConnectorController {
    readonly connector: Connector;
    readonly updated: Event<ControllerUpdateInfo>;
    readonly newBlock: Event<number>;
    active: boolean;
    accounts: string[];
    chainId: number | undefined;
    blockNumber: number | undefined;
    errors: Error[];
    private _config;
    private _connectorUnsubscribe;
    private emitUpdate;
    updateConfig(config: Partial<FullConfig>): void;
    private removeBlockEffect?;
    private clearSubscriptions?;
    constructor(connector: Connector, config?: FullConfig);
    getProvider(): providers.Web3Provider | providers.JsonRpcProvider | undefined;
    activate(connectorActivator?: (connector: Connector) => Promise<void>): Promise<void>;
    deactivate(): Promise<void>;
    switchNetwork(chainId: number): Promise<void>;
    reportError(error: Error): void;
}
//# sourceMappingURL=connectorController.d.ts.map
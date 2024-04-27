import { Connector, ConnectorUpdateData } from '../providers/network/connectors';
export declare function subscribeToProviderEvents(connector: Connector, onUpdate: (update: Partial<ConnectorUpdateData>) => void, onDisconnectListener: () => void): () => void;
//# sourceMappingURL=eip1193.d.ts.map
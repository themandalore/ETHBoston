"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToProviderEvents = void 0;
function subscribeToProviderEvents(connector, onUpdate, onDisconnectListener) {
    const provider = connector.provider.provider;
    if (provider === null || provider === void 0 ? void 0 : provider.on) {
        const onConnectListener = () => {
            void connector.activate();
        };
        provider.on('connect', onConnectListener);
        provider.on('disconnect', onDisconnectListener);
        const onChainChangedListener = (chainId) => {
            onUpdate({ chainId: parseInt(chainId) });
        };
        provider.on('chainChanged', onChainChangedListener);
        const onAccountsChangedListener = (accounts) => {
            onUpdate({ accounts });
        };
        provider.on('accountsChanged', onAccountsChangedListener);
        return () => {
            provider.removeListener('connect', onConnectListener);
            provider.removeListener('disconnect', onDisconnectListener);
            provider.removeListener('chainChanged', onChainChangedListener);
            provider.removeListener('accountsChanged', onAccountsChangedListener);
        };
    }
    return () => undefined;
}
exports.subscribeToProviderEvents = subscribeToProviderEvents;
//# sourceMappingURL=eip1193.js.map
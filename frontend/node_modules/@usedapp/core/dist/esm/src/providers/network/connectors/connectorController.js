import { DEFAULT_SUPPORTED_CHAINS } from '../../../constants';
import { subscribeToProviderEvents } from '../../../helpers';
import { Event } from '../../../helpers/event';
import { getAddNetworkParams } from '../../../helpers/getAddNetworkParams';
import { validateArguments } from '../../../helpers/validateArgument';
import { DEFAULT_CONFIG } from '../../../model/config/default';
import { MetamaskConnector } from './implementations';
export class ConnectorController {
    constructor(connector, config = DEFAULT_CONFIG) {
        this.connector = connector;
        this.updated = new Event();
        this.newBlock = new Event();
        this.active = false;
        this.accounts = [];
        this.errors = [];
        this._config = Object.assign({}, config);
        this._connectorUnsubscribe = connector.update.on(({ chainId, accounts }) => {
            this.chainId = chainId;
            this.accounts = accounts;
            this.emitUpdate();
        });
    }
    emitUpdate() {
        this.updated.emit({
            active: this.active,
            chainId: this.chainId,
            accounts: this.accounts,
            blockNumber: this.blockNumber,
            errors: this.errors,
        });
    }
    updateConfig(config) {
        this._config = Object.assign(Object.assign({}, this._config), config);
    }
    getProvider() {
        return this.connector.provider;
    }
    async activate(connectorActivator = (connector) => connector.activate()) {
        await connectorActivator(this.connector);
        const provider = this.getProvider();
        if (!provider) {
            throw new Error('Failed to activate connector');
        }
        this.clearSubscriptions = subscribeToProviderEvents(this.connector, ({ chainId, accounts }) => {
            if (chainId !== undefined) {
                this.chainId = chainId;
            }
            if (accounts !== undefined) {
                this.accounts = accounts;
            }
            this.emitUpdate();
        }, () => {
            if (this.connector instanceof MetamaskConnector && this._config.noMetamaskDeactivate) {
                return;
            }
            void this.deactivate();
        });
        this.blockNumber = await provider.getBlockNumber();
        this.newBlock.emit(this.blockNumber);
        this.removeBlockEffect = this.newBlock.addEffect(() => {
            const listener = (blockNumber) => {
                this.blockNumber = blockNumber;
                this.newBlock.emit(blockNumber);
                this.emitUpdate();
            };
            provider.on('block', listener);
            return () => {
                provider.off('block', listener);
            };
        });
        this.active = true;
        this.emitUpdate();
    }
    async deactivate() {
        var _a, _b, _c;
        this.active = false;
        (_a = this.removeBlockEffect) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.clearSubscriptions) === null || _b === void 0 ? void 0 : _b.call(this);
        (_c = this._connectorUnsubscribe) === null || _c === void 0 ? void 0 : _c.call(this);
        await this.connector.deactivate();
        this.chainId = undefined;
        this.accounts = [];
        this.blockNumber = undefined;
        this.errors = [];
        this.emitUpdate();
    }
    async switchNetwork(chainId) {
        var _a;
        const provider = this.getProvider();
        validateArguments({ chainId }, { chainId: 'number' });
        if (!provider) {
            throw new Error('Connector not initialized');
        }
        try {
            await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${chainId.toString(16)}` }]);
        }
        catch (error) {
            const errChainNotAddedYet = 4902; // Metamask error code
            if (error.code === errChainNotAddedYet) {
                const chain = ((_a = this._config.networks) !== null && _a !== void 0 ? _a : DEFAULT_SUPPORTED_CHAINS).find((chain) => chain.chainId === chainId);
                if (!chain)
                    throw new Error(`ChainId "${chainId}" not found in config.networks. See https://usedapp-docs.netlify.app/docs/Guides/Transactions/Switching%20Networks`);
                if (!chain.rpcUrl)
                    throw new Error(`ChainId "${chainId}" does not have RPC url configured by default. See https://usedapp-docs.netlify.app/docs/Guides/Transactions/Switching%20Networks`);
                await provider.send('wallet_addEthereumChain', [getAddNetworkParams(chain)]);
            }
            else {
                throw error;
            }
        }
    }
    reportError(error) {
        this.errors.push(error);
        this.emitUpdate();
    }
}
//# sourceMappingURL=connectorController.js.map
import { providers } from 'ethers';
import { Event } from '../../../../helpers/event';
export class InjectedConnector {
    constructor(provider) {
        this.name = 'Injected';
        this.update = new Event();
        this.provider = providers.Provider.isProvider(provider) ? provider : new providers.Web3Provider(provider);
    }
    async connectEagerly() {
        if (!this.provider) {
            return;
        }
        try {
            const chainId = await this.provider.send('eth_chainId', []);
            const accounts = await this.provider.send('eth_accounts', []);
            this.update.emit({ chainId: parseInt(chainId), accounts });
        }
        catch (error) {
            console.debug(error);
        }
    }
    async activate() {
        if (!this.provider) {
            throw new Error('Could not activate connector');
        }
        try {
            const chainId = await this.provider.send('eth_chainId', []);
            const accounts = await this.provider.send('eth_accounts', []);
            this.update.emit({ chainId: parseInt(chainId), accounts });
        }
        catch (error) {
            console.log(error);
            throw new Error('Could not activate connector');
        }
    }
    async deactivate() {
        this.provider = undefined;
    }
}
//# sourceMappingURL=injected.js.map
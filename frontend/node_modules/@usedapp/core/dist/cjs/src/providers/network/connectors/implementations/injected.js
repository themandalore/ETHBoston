"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedConnector = void 0;
const ethers_1 = require("ethers");
const event_1 = require("../../../../helpers/event");
class InjectedConnector {
    constructor(provider) {
        this.name = 'Injected';
        this.update = new event_1.Event();
        this.provider = ethers_1.providers.Provider.isProvider(provider) ? provider : new ethers_1.providers.Web3Provider(provider);
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
exports.InjectedConnector = InjectedConnector;
//# sourceMappingURL=injected.js.map
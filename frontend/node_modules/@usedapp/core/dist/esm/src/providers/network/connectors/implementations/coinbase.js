import { providers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { Event } from '../../../../helpers/event';
const GET_COINBASE_LINK = 'https://www.coinbase.com/wallet';
export async function getCoinbaseProvider() {
    var _a;
    if (!window.ethereum) {
        window.open(GET_COINBASE_LINK);
        return undefined;
    }
    const injectedProviders = (window === null || window === void 0 ? void 0 : window.ethereum.providers) || [];
    const injectedProvider = (_a = injectedProviders.find((provider) => {
        var _a;
        return (_a = provider.isWalletLink) !== null && _a !== void 0 ? _a : false;
    })) !== null && _a !== void 0 ? _a : (await detectEthereumProvider());
    if (!injectedProvider || !injectedProvider.isWalletLink) {
        console.log(`Coinbase wallet is not installed - you can get it under ${GET_COINBASE_LINK}`);
        return undefined;
    }
    const provider = new providers.Web3Provider(injectedProvider, 'any');
    return provider;
}
export class CoinbaseWalletConnector {
    constructor() {
        this.name = 'CoinbaseWallet';
        this.update = new Event();
    }
    async init() {
        if (this.provider)
            return;
        const metamask = await getCoinbaseProvider();
        if (!metamask) {
            return;
        }
        this.provider = metamask;
    }
    async connectEagerly() {
        await this.init();
        if (!this.provider) {
            return;
        }
        try {
            const chainId = await this.provider.send('eth_chainId', []);
            const accounts = await this.provider.send('eth_accounts', []);
            this.update.emit({ chainId: parseInt(chainId), accounts });
        }
        catch (e) {
            console.debug(e);
        }
    }
    async activate() {
        var _a;
        await this.init();
        if (!this.provider) {
            throw new Error('Could not activate connector');
        }
        try {
            const chainId = await this.provider.send('eth_chainId', []);
            const accounts = await this.provider.send('eth_requestAccounts', []);
            this.update.emit({ chainId: parseInt(chainId), accounts });
        }
        catch (e) {
            console.log(e);
            throw new Error('Could not activate connector: ' + ((_a = e.message) !== null && _a !== void 0 ? _a : ''));
        }
    }
    async deactivate() {
        this.provider = undefined;
    }
}
//# sourceMappingURL=coinbase.js.map
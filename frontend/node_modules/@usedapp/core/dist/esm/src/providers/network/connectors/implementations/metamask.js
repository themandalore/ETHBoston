import { providers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { Event } from '../../../../helpers/event';
const GET_METAMASK_LINK = 'https://metamask.io/download.html';
export async function getMetamaskProvider() {
    var _a;
    if (!window.ethereum) {
        window.open(GET_METAMASK_LINK);
        return undefined;
    }
    const injectedProviders = (window === null || window === void 0 ? void 0 : window.ethereum.providers) || [];
    const injectedProvider = (_a = injectedProviders.find((provider) => {
        var _a;
        return (_a = provider.isMetaMask) !== null && _a !== void 0 ? _a : false;
    })) !== null && _a !== void 0 ? _a : (await detectEthereumProvider());
    if (!injectedProvider) {
        console.log(`Metamask is not installed - you can get it under ${GET_METAMASK_LINK}`);
        return undefined;
    }
    const provider = new providers.Web3Provider(injectedProvider, 'any');
    return provider;
}
export class MetamaskConnector {
    constructor() {
        this.name = 'Metamask';
        this.update = new Event();
    }
    async init() {
        if (this.provider)
            return;
        const metamask = await getMetamaskProvider();
        if (!metamask) {
            return;
        }
        this.provider = metamask;
    }
    async connectEagerly() {
        await this.init();
        if (!this.provider || (await this.provider.send('wallet_getPermissions', [])).length === 0) {
            this.provider = undefined;
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
//# sourceMappingURL=metamask.js.map
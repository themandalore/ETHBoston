"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetamaskConnector = exports.getMetamaskProvider = void 0;
const ethers_1 = require("ethers");
const detect_provider_1 = __importDefault(require("@metamask/detect-provider"));
const event_1 = require("../../../../helpers/event");
const GET_METAMASK_LINK = 'https://metamask.io/download.html';
async function getMetamaskProvider() {
    var _a;
    if (!window.ethereum) {
        window.open(GET_METAMASK_LINK);
        return undefined;
    }
    const injectedProviders = (window === null || window === void 0 ? void 0 : window.ethereum.providers) || [];
    const injectedProvider = (_a = injectedProviders.find((provider) => {
        var _a;
        return (_a = provider.isMetaMask) !== null && _a !== void 0 ? _a : false;
    })) !== null && _a !== void 0 ? _a : (await (0, detect_provider_1.default)());
    if (!injectedProvider) {
        console.log(`Metamask is not installed - you can get it under ${GET_METAMASK_LINK}`);
        return undefined;
    }
    const provider = new ethers_1.providers.Web3Provider(injectedProvider, 'any');
    return provider;
}
exports.getMetamaskProvider = getMetamaskProvider;
class MetamaskConnector {
    constructor() {
        this.name = 'Metamask';
        this.update = new event_1.Event();
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
exports.MetamaskConnector = MetamaskConnector;
//# sourceMappingURL=metamask.js.map
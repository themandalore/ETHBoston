"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectedProvider = void 0;
const detect_provider_1 = __importDefault(require("@metamask/detect-provider"));
const ethers_1 = require("ethers");
const isWebSocketProvider_1 = require("./isWebSocketProvider");
const GET_METAMASK_LINK = 'https://metamask.io/download.html';
async function getInjectedProvider(getPollingInterval) {
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
        window.open(GET_METAMASK_LINK);
        return undefined;
    }
    const provider = new ethers_1.providers.Web3Provider(injectedProvider, 'any');
    const chainId = await provider.send('eth_chainId', []);
    if (!(0, isWebSocketProvider_1.isWebSocketProvider)(provider)) {
        provider.pollingInterval = getPollingInterval(chainId);
    }
    return provider;
}
exports.getInjectedProvider = getInjectedProvider;
//# sourceMappingURL=injectedProvider.js.map
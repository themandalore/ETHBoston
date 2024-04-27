"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const react_1 = require("react");
const model_1 = require("../model");
const testing_1 = require("../testing");
const useEthers_1 = require("./useEthers");
const ganache_1 = __importDefault(require("ganache"));
describe('useEthers', () => {
    let network1;
    let network2;
    let config;
    const receiver = ethers_1.Wallet.createRandom().address;
    before(async () => {
        ;
        ({ config, network1, network2 } = await (0, testing_1.setupTestingConfig)());
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
        await network2.wallets[1].sendTransaction({ to: receiver, value: 200 });
    });
    it('returns no wallets and readonly provider when not connected', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEthers_1.useEthers)(), { config });
        await waitForCurrent((val) => !val.isLoading);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.error).to.be.undefined;
        (0, chai_1.expect)(result.current.activate).to.be.a('function');
        (0, chai_1.expect)(result.current.deactivate).to.be.a('function');
        (0, chai_1.expect)(result.current.activateBrowserWallet).to.be.a('function');
        (0, chai_1.expect)(result.current.chainId).to.eq(model_1.Mainnet.chainId);
        (0, chai_1.expect)(result.current.account).to.be.undefined;
        (0, chai_1.expect)(result.current.error).to.be.undefined;
        (0, chai_1.expect)(result.current.library).to.eq(network1.provider);
        (0, chai_1.expect)(result.current.active).to.be.true;
        (0, chai_1.expect)(result.current.isLoading).to.be.false;
    });
    it('throws error if trying to use unsupported network', async () => {
        var _a;
        const configWithUnsupportedNetworks = {
            ...config,
            networks: [model_1.Mainnet],
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const { activate } = (0, useEthers_1.useEthers)();
            (0, react_1.useEffect)(() => {
                void activate(network2.provider);
            }, []);
            return (0, useEthers_1.useEthers)();
        }, { config: configWithUnsupportedNetworks });
        await waitForCurrent((val) => !!val.error);
        (0, chai_1.expect)(result.current.error).not.to.be.undefined;
        (0, chai_1.expect)((_a = result.current.error) === null || _a === void 0 ? void 0 : _a.toString()).to.include(`Unsupported chain id: ${network2.chainId}`);
    });
    it('throws error if trying to use not configured network', async () => {
        var _a;
        const configWithNotConfiguredNetworks = {
            ...config,
            readOnlyUrls: {
                [network1.chainId]: network1.provider,
            },
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const { activate } = (0, useEthers_1.useEthers)();
            (0, react_1.useEffect)(() => {
                void activate(network2.provider);
            }, []);
            return (0, useEthers_1.useEthers)();
        }, { config: configWithNotConfiguredNetworks });
        await waitForCurrent((val) => !!val.error);
        (0, chai_1.expect)(result.current.error).not.to.be.undefined;
        (0, chai_1.expect)((_a = result.current.error) === null || _a === void 0 ? void 0 : _a.toString()).to.include(`Not configured chain id: ${network2.chainId}`);
    });
    it('returns correct provider after activation', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const { activate } = (0, useEthers_1.useEthers)();
            (0, react_1.useEffect)(() => {
                void activate(network2.provider);
            }, []);
            return (0, useEthers_1.useEthers)();
        }, { config });
        await waitForCurrent((val) => !val.isLoading && val.chainId === network2.provider.network.chainId);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.error).to.be.undefined;
        (0, chai_1.expect)(result.current.activate).to.be.a('function');
        (0, chai_1.expect)(result.current.deactivate).to.be.a('function');
        (0, chai_1.expect)(result.current.activateBrowserWallet).to.be.a('function');
        (0, chai_1.expect)(result.current.chainId).to.eq(network2.provider.network.chainId);
        (0, chai_1.expect)(result.current.account).to.eq(network2.provider.getWallets()[0].address);
        (0, chai_1.expect)(result.current.error).to.be.undefined;
        (0, chai_1.expect)(result.current.library).to.eq(network2.provider);
        (0, chai_1.expect)(result.current.active).to.be.true;
        (0, chai_1.expect)(result.current.isLoading).to.be.false;
    });
    it('return signer if library is type of JsonRpcProvider', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const { activate, library, error, isLoading } = (0, useEthers_1.useEthers)();
            (0, react_1.useEffect)(() => {
                void activate(network1.provider);
            }, []);
            return { library, error, isLoading };
        }, { config });
        await waitForCurrent((val) => !val.isLoading);
        const provider = result.current.library;
        const signer = provider && 'getSigner' in provider ? provider.getSigner() : undefined;
        (0, chai_1.expect)(result.current.error).to.be.undefined;
        (0, chai_1.expect)(result.current.library).to.be.instanceOf(testing_1.MockProvider);
        (0, chai_1.expect)(signer).to.be.instanceOf(ethers_1.providers.JsonRpcSigner);
    });
    it('cannot get signer if library is type of FallbackProvider', async () => {
        const configWithFallbackProvider = {
            ...config,
            readOnlyUrls: {
                [network1.chainId]: new ethers_1.providers.FallbackProvider([network1.provider]),
            },
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(useEthers_1.useEthers, { config: configWithFallbackProvider });
        await waitForCurrent((val) => {
            return val.library instanceof ethers_1.providers.FallbackProvider;
        });
        const provider = result.current.library;
        const signer = provider && 'getSigner' in provider ? provider.getSigner() : undefined;
        (0, chai_1.expect)(result.current.error).to.be.undefined;
        (0, chai_1.expect)(result.current.library).to.be.instanceOf(ethers_1.providers.FallbackProvider);
        (0, chai_1.expect)(signer).to.be.undefined;
    });
    describe('Sets error if user rejects request', () => {
        before(() => {
            ;
            window.ethereum = {
                request: async () => {
                    // 100ms delay to simulate a real provider
                    await (0, testing_1.sleep)(100);
                    throw {
                        code: 4001,
                        message: 'User rejected the request.',
                    };
                },
            }; // @metamask/detect-provider declares (window as any).ethereum as an incorrect type
        });
        after(() => {
            delete window.ethereum;
            window.localStorage.clear();
        });
        it('Sets error if user rejects request', async () => {
            var _a;
            const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
                const { activateBrowserWallet, error } = (0, useEthers_1.useEthers)();
                (0, react_1.useEffect)(() => {
                    setTimeout(() => {
                        // 100ms delay to simulate a user interaction
                        activateBrowserWallet();
                    }, 100);
                }, []);
                return error;
            }, { config });
            await waitForCurrent((val) => !!val);
            (0, chai_1.expect)(result.current).to.be.instanceOf(Error);
            (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.message).to.eq('Could not activate connector: User rejected the request.');
        });
    });
    describe('Websocket provider', () => {
        let ganacheServer;
        let provider;
        const wsPort = 18845;
        const wsUrl = `ws://localhost:${wsPort}`;
        before(async () => {
            ganacheServer = ganache_1.default.server({ server: { ws: true }, logging: { quiet: true } });
            await ganacheServer.listen(wsPort);
            provider = new ethers_1.providers.WebSocketProvider(wsUrl);
        });
        after(async () => {
            await ganacheServer.close();
            // disrupting the connection forcefully so websocket server can be properly shutdown
            await provider.destroy();
        });
        it('works with a websocket provider', async () => {
            const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEthers_1.useEthers)(), {
                config: {
                    readOnlyChainId: model_1.Mumbai.chainId,
                    readOnlyUrls: {
                        [model_1.Mumbai.chainId]: provider,
                    },
                },
            });
            await waitForCurrent((val) => !val.isLoading);
            (0, chai_1.expect)(result.error).to.be.undefined;
        });
    });
});
//# sourceMappingURL=useEthers.test.js.map
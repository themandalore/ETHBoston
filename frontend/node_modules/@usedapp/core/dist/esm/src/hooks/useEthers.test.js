import { expect } from 'chai';
import { providers, Wallet } from 'ethers';
import { useEffect } from 'react';
import { Mainnet, Mumbai } from '../model';
import { MockProvider, renderDAppHook, setupTestingConfig, sleep } from '../testing';
import { useEthers } from './useEthers';
import Ganache from 'ganache';
describe('useEthers', () => {
    let network1;
    let network2;
    let config;
    const receiver = Wallet.createRandom().address;
    before(async () => {
        ;
        ({ config, network1, network2 } = await setupTestingConfig());
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
        await network2.wallets[1].sendTransaction({ to: receiver, value: 200 });
    });
    it('returns no wallets and readonly provider when not connected', async () => {
        const { result, waitForCurrent } = await renderDAppHook(() => useEthers(), { config });
        await waitForCurrent((val) => !val.isLoading);
        expect(result.error).to.be.undefined;
        expect(result.current.error).to.be.undefined;
        expect(result.current.activate).to.be.a('function');
        expect(result.current.deactivate).to.be.a('function');
        expect(result.current.activateBrowserWallet).to.be.a('function');
        expect(result.current.chainId).to.eq(Mainnet.chainId);
        expect(result.current.account).to.be.undefined;
        expect(result.current.error).to.be.undefined;
        expect(result.current.library).to.eq(network1.provider);
        expect(result.current.active).to.be.true;
        expect(result.current.isLoading).to.be.false;
    });
    it('throws error if trying to use unsupported network', async () => {
        var _a;
        const configWithUnsupportedNetworks = Object.assign(Object.assign({}, config), { networks: [Mainnet] });
        const { result, waitForCurrent } = await renderDAppHook(() => {
            const { activate } = useEthers();
            useEffect(() => {
                void activate(network2.provider);
            }, []);
            return useEthers();
        }, { config: configWithUnsupportedNetworks });
        await waitForCurrent((val) => !!val.error);
        expect(result.current.error).not.to.be.undefined;
        expect((_a = result.current.error) === null || _a === void 0 ? void 0 : _a.toString()).to.include(`Unsupported chain id: ${network2.chainId}`);
    });
    it('throws error if trying to use not configured network', async () => {
        var _a;
        const configWithNotConfiguredNetworks = Object.assign(Object.assign({}, config), { readOnlyUrls: {
                [network1.chainId]: network1.provider,
            } });
        const { result, waitForCurrent } = await renderDAppHook(() => {
            const { activate } = useEthers();
            useEffect(() => {
                void activate(network2.provider);
            }, []);
            return useEthers();
        }, { config: configWithNotConfiguredNetworks });
        await waitForCurrent((val) => !!val.error);
        expect(result.current.error).not.to.be.undefined;
        expect((_a = result.current.error) === null || _a === void 0 ? void 0 : _a.toString()).to.include(`Not configured chain id: ${network2.chainId}`);
    });
    it('returns correct provider after activation', async () => {
        const { result, waitForCurrent } = await renderDAppHook(() => {
            const { activate } = useEthers();
            useEffect(() => {
                void activate(network2.provider);
            }, []);
            return useEthers();
        }, { config });
        await waitForCurrent((val) => !val.isLoading && val.chainId === network2.provider.network.chainId);
        expect(result.error).to.be.undefined;
        expect(result.current.error).to.be.undefined;
        expect(result.current.activate).to.be.a('function');
        expect(result.current.deactivate).to.be.a('function');
        expect(result.current.activateBrowserWallet).to.be.a('function');
        expect(result.current.chainId).to.eq(network2.provider.network.chainId);
        expect(result.current.account).to.eq(network2.provider.getWallets()[0].address);
        expect(result.current.error).to.be.undefined;
        expect(result.current.library).to.eq(network2.provider);
        expect(result.current.active).to.be.true;
        expect(result.current.isLoading).to.be.false;
    });
    it('return signer if library is type of JsonRpcProvider', async () => {
        const { result, waitForCurrent } = await renderDAppHook(() => {
            const { activate, library, error, isLoading } = useEthers();
            useEffect(() => {
                void activate(network1.provider);
            }, []);
            return { library, error, isLoading };
        }, { config });
        await waitForCurrent((val) => !val.isLoading);
        const provider = result.current.library;
        const signer = provider && 'getSigner' in provider ? provider.getSigner() : undefined;
        expect(result.current.error).to.be.undefined;
        expect(result.current.library).to.be.instanceOf(MockProvider);
        expect(signer).to.be.instanceOf(providers.JsonRpcSigner);
    });
    it('cannot get signer if library is type of FallbackProvider', async () => {
        const configWithFallbackProvider = Object.assign(Object.assign({}, config), { readOnlyUrls: {
                [network1.chainId]: new providers.FallbackProvider([network1.provider]),
            } });
        const { result, waitForCurrent } = await renderDAppHook(useEthers, { config: configWithFallbackProvider });
        await waitForCurrent((val) => {
            return val.library instanceof providers.FallbackProvider;
        });
        const provider = result.current.library;
        const signer = provider && 'getSigner' in provider ? provider.getSigner() : undefined;
        expect(result.current.error).to.be.undefined;
        expect(result.current.library).to.be.instanceOf(providers.FallbackProvider);
        expect(signer).to.be.undefined;
    });
    describe('Sets error if user rejects request', () => {
        before(() => {
            ;
            window.ethereum = {
                request: async () => {
                    // 100ms delay to simulate a real provider
                    await sleep(100);
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
            const { result, waitForCurrent } = await renderDAppHook(() => {
                const { activateBrowserWallet, error } = useEthers();
                useEffect(() => {
                    setTimeout(() => {
                        // 100ms delay to simulate a user interaction
                        activateBrowserWallet();
                    }, 100);
                }, []);
                return error;
            }, { config });
            await waitForCurrent((val) => !!val);
            expect(result.current).to.be.instanceOf(Error);
            expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.message).to.eq('Could not activate connector: User rejected the request.');
        });
    });
    describe('Websocket provider', () => {
        let ganacheServer;
        let provider;
        const wsPort = 18845;
        const wsUrl = `ws://localhost:${wsPort}`;
        before(async () => {
            ganacheServer = Ganache.server({ server: { ws: true }, logging: { quiet: true } });
            await ganacheServer.listen(wsPort);
            provider = new providers.WebSocketProvider(wsUrl);
        });
        after(async () => {
            await ganacheServer.close();
            // disrupting the connection forcefully so websocket server can be properly shutdown
            await provider.destroy();
        });
        it('works with a websocket provider', async () => {
            const { result, waitForCurrent } = await renderDAppHook(() => useEthers(), {
                config: {
                    readOnlyChainId: Mumbai.chainId,
                    readOnlyUrls: {
                        [Mumbai.chainId]: provider,
                    },
                },
            });
            await waitForCurrent((val) => !val.isLoading);
            expect(result.error).to.be.undefined;
        });
    });
});
//# sourceMappingURL=useEthers.test.js.map
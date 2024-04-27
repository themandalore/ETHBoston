import { expect } from 'chai';
import { doublerContractABI, reverterContractABI } from '../constants';
import multicall2ABI from '../constants/abi/MultiCall2.json';
import { useBlockMeta, useCall, useEthers } from '../hooks';
import { renderDAppHook, setupTestingConfig, sleep } from '../testing';
import { constants, providers, Wallet } from 'ethers';
import Ganache from 'ganache';
import { deployContract } from '../testing/utils/deployContract';
describe('useCall Resilency tests', () => {
    for (const multicallVersion of [1, 2]) {
        for (const fastMulticallEncoding of [false, true]) {
            describe(`Multicall v${multicallVersion} configured: fastMulticallEncoding=${fastMulticallEncoding}`, () => {
                it('Other hooks work when one call reverts', async function () {
                    var _a, _b, _c, _d, _e;
                    if (multicallVersion === 1)
                        this.skip(); // This cannot work in multicall 1 as the whole batch reverts.
                    const { config, network1 } = await setupTestingConfig({ multicallVersion });
                    const revertContract = await deployContract(network1.deployer, reverterContractABI);
                    const doublerContract = await deployContract(network1.deployer, doublerContractABI);
                    const { result, waitForCurrent } = await renderDAppHook(() => {
                        const revertResult = useCall({
                            contract: revertContract,
                            method: 'doRevert',
                            args: [],
                        });
                        const doubleResult = useCall({
                            contract: doublerContract,
                            method: 'double',
                            args: [3],
                        });
                        return { revertResult, doubleResult };
                    }, {
                        config: Object.assign(Object.assign({}, config), { fastMulticallEncoding }),
                    });
                    await waitForCurrent((val) => val.doubleResult !== undefined && val.revertResult !== undefined);
                    expect((_a = result.current.revertResult) === null || _a === void 0 ? void 0 : _a.error).to.not.be.undefined;
                    expect((_b = result.current.doubleResult) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
                    expect((_e = (_d = (_c = result.current.doubleResult) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.eq(6)).to.be.true;
                });
                it('Continues to work when one call stops reverting', async () => {
                    var _a, _b, _c, _d, _e, _f;
                    const { config, network1 } = await setupTestingConfig({ multicallVersion });
                    const revertContract = await deployContract(network1.deployer, reverterContractABI);
                    const doublerContract = await deployContract(network1.deployer, doublerContractABI);
                    const { result, waitForCurrent, rerender } = await renderDAppHook((num) => {
                        const revertResult = useCall({
                            contract: revertContract,
                            method: 'revertOnOdd',
                            args: [num],
                        });
                        const doubleResult = useCall({
                            contract: doublerContract,
                            method: 'double',
                            args: [num],
                        });
                        return { revertResult, doubleResult };
                    }, {
                        config,
                        renderHook: {
                            initialProps: 5,
                        },
                    });
                    await waitForCurrent((val) => val.doubleResult !== undefined && val.revertResult !== undefined);
                    if (multicallVersion !== 1) {
                        // This cannot work in multicall 1 as the whole batch reverts.
                        expect((_c = (_b = (_a = result.current.doubleResult) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.eq(10)).to.be.true;
                    }
                    expect((_d = result.current.revertResult) === null || _d === void 0 ? void 0 : _d.error).to.not.be.undefined;
                    rerender(4);
                    await waitForCurrent((val) => { var _a, _b, _c; return (_c = (_b = (_a = val.doubleResult) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.eq(8); });
                    expect((_e = result.current.doubleResult) === null || _e === void 0 ? void 0 : _e.error).to.be.undefined;
                    expect((_f = result.current.revertResult) === null || _f === void 0 ? void 0 : _f.error).to.be.undefined;
                });
                describe('Multichain with RPC servers', () => {
                    let ganacheServers;
                    let miners;
                    let config;
                    const balance = '0x1ED09BEAD87C0378D8E6400000000'; // 10^34
                    const privateKeys = [
                        '0x29f3edee0ad3abf8e2699402e0e28cd6492c9be7eaab00d732a791c33552f797',
                        '0x5c8b9227cd5065c7e3f6b73826b8b42e198c4497f6688e3085d5ab3a6d520e74',
                        '0x50c8b3fc81e908501c8cd0a60911633acaca1a567d1be8e769c5ae7007b34b23',
                        '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c5',
                    ];
                    const defaultAccounts = privateKeys.map((secretKey) => ({ balance, secretKey }));
                    beforeEach(async () => {
                        ganacheServers = [
                            Ganache.server({
                                chain: { chainId: 1337 },
                                logging: { quiet: true },
                                wallet: { accounts: defaultAccounts },
                            }),
                            Ganache.server({
                                chain: { chainId: 31337 },
                                logging: { quiet: true },
                                wallet: { accounts: defaultAccounts },
                            }),
                        ];
                        await ganacheServers[0].listen(18800);
                        await ganacheServers[1].listen(18801);
                        const provider1 = new providers.StaticJsonRpcProvider('http://localhost:18800');
                        const provider2 = new providers.StaticJsonRpcProvider('http://localhost:18801');
                        miners = [
                            new Wallet(defaultAccounts[0].secretKey, provider1),
                            new Wallet(defaultAccounts[0].secretKey, provider2),
                        ];
                        const multicall0 = await deployContract(miners[0], multicall2ABI);
                        const multicall1 = await deployContract(miners[1], multicall2ABI);
                        config = {
                            readOnlyChainId: 1337,
                            readOnlyUrls: {
                                [1337]: provider1,
                                [31337]: provider2,
                            },
                            pollingInterval: 200,
                            multicallAddresses: {
                                [1337]: multicall0.address,
                                [31337]: multicall1.address,
                            },
                        };
                    });
                    afterEach(async () => {
                        try {
                            await ganacheServers[0].close();
                        }
                        catch (_a) { } // eslint-disable-line no-empty
                        try {
                            await ganacheServers[1].close();
                        }
                        catch (_b) { } // eslint-disable-line no-empty
                    });
                    it('Continues to work when *secondary* RPC endpoint fails', async () => {
                        var _a, _b;
                        const { result, waitForCurrent } = await renderDAppHook(() => {
                            const { chainId, error } = useEthers();
                            const { blockNumber: firstChainBlockNumber } = useBlockMeta({ chainId: 1337 });
                            const { blockNumber: secondChainBlockNumber } = useBlockMeta({ chainId: 31337 });
                            return { chainId, secondChainBlockNumber, firstChainBlockNumber, error };
                        }, {
                            config,
                        });
                        await waitForCurrent((val) => val.chainId !== undefined &&
                            val.secondChainBlockNumber !== undefined &&
                            val.firstChainBlockNumber !== undefined);
                        expect(result.current.chainId).to.be.equal(1337);
                        expect(result.current.secondChainBlockNumber).to.be.equal(1);
                        expect(result.current.firstChainBlockNumber).to.be.equal(1);
                        await ganacheServers[1].close(); // Secondary, as in NOT the `readOnlyChainId` one.
                        await miners[0].sendTransaction({ to: constants.AddressZero });
                        await waitForCurrent((val) => val.firstChainBlockNumber === 2);
                        await waitForCurrent((val) => !!val.error);
                        expect(result.current.firstChainBlockNumber).to.be.equal(2);
                        expect(result.current.secondChainBlockNumber).to.be.equal(1);
                        expect(result.current.chainId).to.be.equal(1337);
                        expect((_b = (_a = result.current.error) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.code).to.eq('SERVER_ERROR');
                    });
                    it('Continues to work when *primary* RPC endpoint fails', async () => {
                        const { result, waitForCurrent } = await renderDAppHook(() => {
                            const { chainId, error } = useEthers();
                            const { blockNumber: firstChainBlockNumber } = useBlockMeta({ chainId: 1337 });
                            const { blockNumber: secondChainBlockNumber } = useBlockMeta({ chainId: 31337 });
                            return { chainId, secondChainBlockNumber, firstChainBlockNumber, error };
                        }, {
                            config,
                        });
                        await waitForCurrent((val) => val.chainId !== undefined &&
                            val.secondChainBlockNumber !== undefined &&
                            val.firstChainBlockNumber !== undefined);
                        expect(result.current.chainId).to.be.equal(1337);
                        expect(result.current.secondChainBlockNumber).to.be.equal(1);
                        expect(result.current.firstChainBlockNumber).to.be.equal(1);
                        await ganacheServers[0].close(); // Primary, as in the `readOnlyChainId` one.
                        await miners[1].sendTransaction({ to: constants.AddressZero });
                        await waitForCurrent((val) => val.secondChainBlockNumber === 2);
                        await waitForCurrent((val) => !!val.error);
                        expect(result.current.firstChainBlockNumber).to.be.equal(1);
                        expect(result.current.secondChainBlockNumber).to.be.equal(2);
                        expect(result.current.chainId).to.be.equal(1337);
                    });
                    it('Does not do duplicate polls for data', async () => {
                        const { result, waitForCurrent, rerender } = await renderDAppHook(() => {
                            const { chainId, error } = useEthers();
                            const { blockNumber: firstChainBlockNumber } = useBlockMeta({ chainId: 1337 });
                            return { chainId, firstChainBlockNumber, error };
                        }, {
                            config: {
                                readOnlyChainId: config.readOnlyChainId,
                                readOnlyUrls: {
                                    [1337]: config.readOnlyUrls[1337],
                                },
                                multicallAddresses: {
                                    [1337]: config.multicallAddresses[1337],
                                },
                                pollingInterval: 500,
                            },
                        });
                        await waitForCurrent((val) => val.chainId !== undefined && val.firstChainBlockNumber !== undefined);
                        expect(result.error).to.be.undefined;
                        const calls = [];
                        const originalCall = config.readOnlyUrls[1337].call;
                        config.readOnlyUrls[1337].call = async function (...args) {
                            if (args[1] === 2) {
                                // In this test, let's take a look at calls made for blockNumber 2.
                                calls.push(JSON.stringify(args));
                            }
                            return await originalCall.apply(config.readOnlyUrls[1337], args);
                        };
                        await miners[0].sendTransaction({ to: constants.AddressZero });
                        rerender();
                        await sleep(1000);
                        await miners[0].sendTransaction({ to: constants.AddressZero });
                        rerender();
                        await sleep(1000);
                        expect(calls.length).to.eq(1);
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=useCallResilency.test.js.map
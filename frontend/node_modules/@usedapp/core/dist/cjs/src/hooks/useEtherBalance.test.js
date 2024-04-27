"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const react_1 = require("react");
const model_1 = require("../model");
const testing_1 = require("../testing");
const useEtherBalance_1 = require("./useEtherBalance");
const useEthers_1 = require("./useEthers");
describe('useEtherBalance', () => {
    let network1;
    let network2;
    let config;
    const receiver = ethers_1.Wallet.createRandom().address;
    beforeEach(async () => {
        ;
        ({ config, network1, network2 } = await (0, testing_1.setupTestingConfig)());
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
        await network2.wallets[1].sendTransaction({ to: receiver, value: 200 });
    });
    it('returns 0 for random wallet', async () => {
        const { address } = ethers_1.Wallet.createRandom();
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(address), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(0);
    });
    it('default readonly chain', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
    });
    it('does not change static value when changing ether value', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver, { isStatic: true }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
    });
    it('does change non-static value when changing ether value', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver, { isStatic: false }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await (0, testing_1.sleep)(1000);
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
        await (0, testing_1.sleep)(1000);
        await waitForCurrent((val) => (val === null || val === void 0 ? void 0 : val.toString()) === '200');
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(200);
    });
    it('defaults to active read-write provider chain id', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const { activate } = (0, useEthers_1.useEthers)();
            (0, react_1.useEffect)(() => {
                void activate(network2.provider);
            }, []);
            return (0, useEtherBalance_1.useEtherBalance)(receiver);
        }, { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(200);
    });
    it('explicitly mainnet', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver, { chainId: model_1.Mainnet.chainId }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
    });
    it('explicitly specified chain id', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver, { chainId: network2.chainId }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(200);
    });
});
//# sourceMappingURL=useEtherBalance.test.js.map
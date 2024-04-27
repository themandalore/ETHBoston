"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const __1 = require("..");
const testing_1 = require("../testing");
describe('useBlockMeta', () => {
    let network1;
    let config;
    const receiver = ethers_1.Wallet.createRandom().address;
    beforeEach(async () => {
        ;
        ({ config, network1 } = await (0, testing_1.setupTestingConfig)());
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
    });
    it('retrieves block timestamp and difficulty', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(__1.useBlockMeta, { config });
        await waitForCurrent((val) => (val === null || val === void 0 ? void 0 : val.timestamp) !== undefined && (val === null || val === void 0 ? void 0 : val.difficulty) !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.timestamp).to.be.a('date');
        (0, chai_1.expect)(result.current.difficulty).to.not.be.undefined;
    });
    it('updates the block timestamp when a transaction gets mined', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(__1.useBlockMeta, { config });
        await waitForCurrent((val) => val.timestamp !== undefined && val.difficulty !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        const firstTimestamp = result.current.timestamp;
        await (0, testing_1.sleep)(1000);
        await network1.mineBlock();
        await waitForCurrent((val) => { var _a; return ((_a = val.timestamp) === null || _a === void 0 ? void 0 : _a.getTime()) !== (firstTimestamp === null || firstTimestamp === void 0 ? void 0 : firstTimestamp.getTime()); });
        if (!firstTimestamp)
            throw new Error('firstTimestamp is undefined');
        (0, chai_1.expect)(result.current.timestamp).to.be.greaterThan(firstTimestamp);
    });
    it('updates the block timestamp when a transaction gets mined qith dappHook', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(__1.useBlockMeta, { config });
        await waitForCurrent((val) => val.timestamp !== undefined && val.difficulty !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        const firstTimestamp = result.current.timestamp;
        await (0, testing_1.sleep)(1000);
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
        await (0, testing_1.sleep)(1000);
        await waitForCurrent((val) => { var _a; return ((_a = val.timestamp) === null || _a === void 0 ? void 0 : _a.getTime()) !== (firstTimestamp === null || firstTimestamp === void 0 ? void 0 : firstTimestamp.getTime()); });
        if (!firstTimestamp)
            throw new Error('firstTimestamp is undefined');
        (0, chai_1.expect)(result.current.timestamp).to.be.greaterThan(firstTimestamp);
    });
    it('updates the block number when a transaction gets mined', async () => {
        const { config, network1 } = await (0, testing_1.setupTestingConfig)();
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(__1.useBlockMeta, { config });
        const blockNumberFromProvider = await network1.provider.getBlockNumber();
        await waitForCurrent(({ blockNumber }) => blockNumber === blockNumberFromProvider);
        await network1.mineBlock();
        await waitForCurrent(({ blockNumber }) => blockNumber === blockNumberFromProvider + 1);
        (0, chai_1.expect)(result.error).to.be.undefined;
    });
    it('updates the block number when a transaction gets mined on another chain', async () => {
        const { config, network2 } = await (0, testing_1.setupTestingConfig)();
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, __1.useBlockMeta)({ chainId: network2.chainId }), {
            config,
        });
        const blockNumberFromProvider = await network2.provider.getBlockNumber();
        await waitForCurrent(({ blockNumber }) => blockNumber === blockNumberFromProvider);
        await network2.mineBlock();
        await waitForCurrent(({ blockNumber }) => blockNumber === blockNumberFromProvider + 1);
        (0, chai_1.expect)(result.error).to.be.undefined;
    });
});
//# sourceMappingURL=useBlockMeta.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../../src");
const testing_1 = require("../../src/testing");
describe('useBlockNumber', () => {
    it('retrieves block number', async () => {
        const { config } = await (0, testing_1.setupTestingConfig)();
        const { result, waitForCurrentEqual } = await (0, testing_1.renderDAppHook)(src_1.useBlockNumber, { config });
        await waitForCurrentEqual(1);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.be.equal(1);
    });
    it('updates the block number when a transaction gets mined', async () => {
        const { config, network1 } = await (0, testing_1.setupTestingConfig)();
        const { result, waitForCurrentEqual } = await (0, testing_1.renderDAppHook)(src_1.useBlockNumber, { config });
        const blockNumberFromProvider = await network1.provider.getBlockNumber();
        await waitForCurrentEqual(blockNumberFromProvider);
        await network1.mineBlock();
        await waitForCurrentEqual(blockNumberFromProvider + 1);
        (0, chai_1.expect)(result.error).to.be.undefined;
    });
});
//# sourceMappingURL=useBlockNumber.test.js.map
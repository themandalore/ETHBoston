"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const testing_1 = require("../testing");
const useEtherBalance_1 = require("./useEtherBalance");
const waitUntil_1 = require("../testing/utils/waitUntil");
describe('useEtherBalance with refreshing', () => {
    let network1;
    let config;
    const receiver = ethers_1.Wallet.createRandom().address;
    const mineBlock = async () => {
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
        await (0, waitUntil_1.sleep)(1000); // block needs time to be mined
    };
    beforeEach(async () => {
        ;
        ({ config, network1 } = await (0, testing_1.setupTestingConfig)());
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
    });
    it('does not change value with never refreshing with global config', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver), {
            config: {
                ...config,
                refresh: 'never',
            },
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
    });
    it('does not change value with never refreshing with query param', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver, {
            refresh: 'never',
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
    });
    it('does change value every block', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver), {
            config: {
                ...config,
                refresh: 'everyBlock',
            },
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        await waitForCurrent((val) => (val === null || val === void 0 ? void 0 : val.toString()) === '200');
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(200);
    });
    it('overrides global config with query param', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver, {
            refresh: 'everyBlock',
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        await waitForCurrent((val) => (val === null || val === void 0 ? void 0 : val.toString()) === '200');
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(200);
    });
    it('does change value after specified number of blocks with global config', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver), {
            config: {
                ...config,
                refresh: 2,
            },
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        await waitForCurrent((val) => (val === null || val === void 0 ? void 0 : val.toString()) === '300');
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(300);
    });
    it('does change value after specified number of blocks with query param', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useEtherBalance_1.useEtherBalance)(receiver, {
            refresh: 2,
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
        await mineBlock();
        await waitForCurrent((val) => (val === null || val === void 0 ? void 0 : val.toString()) === '300');
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(300);
    });
});
//# sourceMappingURL=refreshing.test.js.map
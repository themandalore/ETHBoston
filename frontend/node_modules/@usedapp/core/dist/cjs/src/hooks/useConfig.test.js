"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const useConfig_1 = require("./useConfig");
const testing_1 = require("../../src/testing");
const model_1 = require("../model");
describe('useConfig', () => {
    it('default', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(useConfig_1.useConfig, {
            config: {},
        });
        await waitForCurrent((val) => val != undefined);
        (0, chai_1.expect)(result.current['pollingInterval']).to.eq(15000);
    });
    it('custom value', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(useConfig_1.useConfig, {
            config: { readOnlyChainId: 1 },
        });
        await waitForCurrent((val) => val != undefined);
        (0, chai_1.expect)(result.current['readOnlyChainId']).to.eq(1);
    });
    it('default testing config', async () => {
        var _a, _b, _c;
        const setup = await (0, testing_1.setupTestingConfig)();
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useConfig_1.useConfig)(), { config: setup.config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current.networks) === null || _a === void 0 ? void 0 : _a.length).to.eq(68);
        (0, chai_1.expect)((_b = result.current.notifications) === null || _b === void 0 ? void 0 : _b.checkInterval).to.eq(500);
        (0, chai_1.expect)((_c = result.current.notifications) === null || _c === void 0 ? void 0 : _c.expirationPeriod).to.eq(5000);
    });
    it('merged defaults and custom values', async () => {
        var _a, _b, _c;
        const setup = await (0, testing_1.setupTestingConfig)();
        const config = {
            ...setup.config,
            notifications: {
                checkInterval: 101,
                expirationPeriod: undefined, // Expecting to be filled by defaults.
            },
            networks: [model_1.Kovan], // Expecting NOT to be filled by default networks.
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useConfig_1.useConfig)(), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current.networks) === null || _a === void 0 ? void 0 : _a.length).to.eq(1);
        (0, chai_1.expect)((_b = result.current.notifications) === null || _b === void 0 ? void 0 : _b.checkInterval).to.eq(101);
        (0, chai_1.expect)((_c = result.current.notifications) === null || _c === void 0 ? void 0 : _c.expirationPeriod).to.eq(5000);
    });
});
describe('useUpdateConfig', () => {
    it('updates config', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const config = (0, useConfig_1.useConfig)();
            const updateConfig = (0, useConfig_1.useUpdateConfig)();
            return { config, updateConfig };
        }, {
            config: { readOnlyChainId: 1 },
        });
        await waitForCurrent((val) => val != undefined);
        (0, chai_1.expect)(result.current.config['pollingInterval']).to.eq(15000);
        result.current.updateConfig({ pollingInterval: 10 });
        await waitForCurrent((val) => val.config.pollingInterval != 15000);
        (0, chai_1.expect)(result.current.config['pollingInterval']).to.eq(10);
    });
    it('deep updates', async () => {
        const multicallAddresses = { 1: '0x1', 2: '0x2' };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => {
            const config = (0, useConfig_1.useConfig)();
            const updateConfig = (0, useConfig_1.useUpdateConfig)();
            return { config, updateConfig };
        }, {
            config: { readOnlyChainId: 1, multicallAddresses },
        });
        await waitForCurrent((val) => val != undefined);
        (0, chai_1.expect)(result.current.config['multicallAddresses']).to.deep.eq(multicallAddresses);
        result.current.updateConfig({ pollingInterval: 10, multicallAddresses: { 3: '0x3' } });
        await waitForCurrent((val) => val.config.pollingInterval != 15000);
        (0, chai_1.expect)(result.current.config['multicallAddresses']).to.deep.eq({ ...multicallAddresses, 3: '0x3' });
    });
});
//# sourceMappingURL=useConfig.test.js.map
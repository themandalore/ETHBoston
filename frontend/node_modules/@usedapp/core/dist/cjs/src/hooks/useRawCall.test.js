"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const testing_1 = require("../testing");
const useRawCalls_1 = require("./useRawCalls");
describe('useRawCall', () => {
    let token;
    let secondToken;
    let config;
    let network1;
    let network2;
    beforeEach(async () => {
        ;
        ({ config, network1, network2 } = await (0, testing_1.setupTestingConfig)());
        token = await (0, testing_1.deployMockToken)(network1.deployer);
        secondToken = await (0, testing_1.deployMockToken)(network2.deployer, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('can query ERC20 balance', async () => {
        const call = {
            address: token.address,
            data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address]),
            chainId: network1.chainId,
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawCalls_1.useRawCall)(call), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.success).to.eq(true);
        (0, chai_1.expect)(result.current.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('Works for a different combinations of address casing', async () => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const calls = [
            {
                address: token.address.toLowerCase(),
                data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address.toLowerCase()]),
                chainId: network1.chainId,
            },
            {
                address: token.address.toLowerCase(),
                data: token.interface.encodeFunctionData('balanceOf', [ethers_1.utils.getAddress(network1.deployer.address)]),
                chainId: network1.chainId,
            },
            {
                address: ethers_1.utils.getAddress(token.address),
                data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address.toLowerCase()]),
                chainId: network1.chainId,
            },
            {
                address: ethers_1.utils.getAddress(token.address),
                data: token.interface.encodeFunctionData('balanceOf', [ethers_1.utils.getAddress(network1.deployer.address)]),
                chainId: network1.chainId,
            },
        ];
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawCalls_1.useRawCalls)(calls), {
            config,
        });
        await waitForCurrent((val) => val !== undefined && val.every((x) => x === null || x === void 0 ? void 0 : x.success));
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.length).to.eq(4);
        (0, chai_1.expect)((_a = result.current[0]) === null || _a === void 0 ? void 0 : _a.success).to.be.true;
        (0, chai_1.expect)((_b = result.current[0]) === null || _b === void 0 ? void 0 : _b.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
        (0, chai_1.expect)((_c = result.current[1]) === null || _c === void 0 ? void 0 : _c.success).to.be.true;
        (0, chai_1.expect)((_d = result.current[1]) === null || _d === void 0 ? void 0 : _d.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
        (0, chai_1.expect)((_e = result.current[2]) === null || _e === void 0 ? void 0 : _e.success).to.be.true;
        (0, chai_1.expect)((_f = result.current[2]) === null || _f === void 0 ? void 0 : _f.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
        (0, chai_1.expect)((_g = result.current[3]) === null || _g === void 0 ? void 0 : _g.success).to.be.true;
        (0, chai_1.expect)((_h = result.current[3]) === null || _h === void 0 ? void 0 : _h.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('returns correct initial balance for mainnet', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawCalls_1.useRawCall)({
            address: token.address,
            data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address]),
            chainId: network1.chainId,
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.success).to.eq(true);
        (0, chai_1.expect)(result.current.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('returns correct initial balance for other chain', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawCalls_1.useRawCall)({
            address: secondToken.address,
            data: secondToken.interface.encodeFunctionData('balanceOf', [network2.deployer.address]),
            chainId: network2.chainId,
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current.success).to.eq(true);
        (0, chai_1.expect)(result.current.value).to.eq(testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('should not throw error when call is Falsy', async () => {
        const { result } = await (0, testing_1.renderDAppHook)(() => (0, useRawCalls_1.useRawCall)(null));
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.be.undefined;
    });
});
//# sourceMappingURL=useRawCall.test.js.map
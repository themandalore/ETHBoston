"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const chai_1 = require("chai");
const testing_1 = require("../testing");
describe('useToken', async () => {
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
    it('returns correct token constants', async () => {
        await testMultiChainUseToken(token);
    });
    it('setting chainId on query params returns correct token constants from non-default chain', async () => {
        await testMultiChainUseToken(secondToken, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE, network2.chainId);
    });
    it('should not throw error when token address is Falsy', async () => {
        const { result } = await (0, testing_1.renderDAppHook)(() => (0, __1.useToken)(null), {
            config,
        });
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.be.undefined;
    });
    const testMultiChainUseToken = async (contract, totalSupply = testing_1.MOCK_TOKEN_INITIAL_BALANCE, chainId) => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, __1.useToken)(contract.address, { chainId }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        const res = {
            name: 'MOCKToken',
            symbol: 'MOCK',
            decimals: 18,
            totalSupply,
        };
        (0, chai_1.expect)(JSON.parse(JSON.stringify(result.current))).to.deep.equal(JSON.parse(JSON.stringify(res)));
    };
});
//# sourceMappingURL=useToken.test.js.map
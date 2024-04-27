"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testing_1 = require("../testing");
const useTokenAllowance_1 = require("./useTokenAllowance");
const ethers_1 = require("ethers");
describe('useTokenAllowance', () => {
    let token;
    let secondToken;
    let config;
    let network1;
    let network2;
    let deployer;
    let spender;
    let secondDeployer;
    let secondSpender;
    beforeEach(async () => {
        ;
        ({ config, network1, network2 } = await (0, testing_1.setupTestingConfig)());
        token = await (0, testing_1.deployMockToken)(network1.deployer);
        secondToken = await (0, testing_1.deployMockToken)(network2.deployer, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE);
        deployer = network1.deployer;
        spender = network1.wallets[0];
        secondDeployer = network2.deployer;
        secondSpender = network2.wallets[0];
    });
    it('returns 0 when spender is not yet approved', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useTokenAllowance_1.useTokenAllowance)(token.address, deployer.address, spender.address), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(0);
    });
    it('returns current allowance', async () => {
        await token.approve(spender.address, ethers_1.utils.parseEther('1'));
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useTokenAllowance_1.useTokenAllowance)(token.address, deployer.address, spender.address), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(ethers_1.utils.parseEther('1'));
    });
    it('multichain calls return correct initial balances', async () => {
        await testMultiChainUseTokenAllowance(token, deployer.address, spender.address, network1.chainId, testing_1.MOCK_TOKEN_INITIAL_BALANCE.toString());
        await testMultiChainUseTokenAllowance(secondToken, secondDeployer.address, secondSpender.address, network2.chainId, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE.toString());
    });
    const testMultiChainUseTokenAllowance = async (contract, user, spenderUser, chainId, allowance) => {
        await contract.approve(spenderUser, ethers_1.utils.parseEther(allowance));
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useTokenAllowance_1.useTokenAllowance)(contract.address, user, spenderUser, { chainId }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(ethers_1.utils.parseEther(allowance));
    };
});
//# sourceMappingURL=useTokenAllowance.test.js.map
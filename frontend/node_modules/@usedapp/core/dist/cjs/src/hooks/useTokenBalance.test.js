"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const model_1 = require("../model");
const testing_1 = require("../testing");
const useTokenBalance_1 = require("./useTokenBalance");
describe('useTokenBalance', () => {
    let network1;
    let network2;
    let config;
    let token1;
    let token2;
    const receiver = ethers_1.Wallet.createRandom().address;
    before(async () => {
        ;
        ({ config, network1, network2 } = await (0, testing_1.setupTestingConfig)());
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 });
        await network2.wallets[1].sendTransaction({ to: receiver, value: 200 });
        const [deployer] = network1.wallets;
        const [secondDeployer] = network2.wallets;
        token1 = await (0, testing_1.deployMockToken)(deployer);
        token2 = await (0, testing_1.deployMockToken)(secondDeployer);
        await token1.transfer(receiver, 100);
        await token2.transfer(receiver, 200);
    });
    it('returns balance for default readonly chain', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useTokenBalance_1.useTokenBalance)(token1.address, receiver), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
    });
    it('returns balance for explicitly mainnet', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useTokenBalance_1.useTokenBalance)(token1.address, receiver, { chainId: model_1.Mainnet.chainId }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(100);
    });
    it('returns balance for explicitly another chain', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useTokenBalance_1.useTokenBalance)(token2.address, receiver, { chainId: network2.chainId }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(200);
    });
});
//# sourceMappingURL=useTokenBalance.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const testing_1 = require("../../src/testing");
const renderDAppHook_1 = require("../testing/renderDAppHook");
const CONTRACT_FUNCTION_COST = 52441; // mock transfer transaction cost
describe('useContractFunction', () => {
    let token;
    let config;
    let network1;
    let wallet1;
    let wallet2;
    let spender;
    beforeEach(async () => {
        ;
        ({ config, network1 } = await (0, testing_1.setupTestingConfig)());
        token = await (0, testing_1.deployMockToken)(network1.deployer);
        spender = network1.wallets[1];
        wallet2 = network1.wallets[1];
        wallet1 = ethers_1.ethers.Wallet.fromMnemonic('radar blur cabbage chef fix engine embark joy scheme fiction master release').connect(network1.provider);
        await network1.wallets[1].sendTransaction({ to: wallet1.address, value: 100000 });
        await token.transfer(wallet1.address, 1000);
    });
    it('success', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'approve', { transactionName: 'Approve' }), {
            config,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 200);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)(await token.allowance(network1.deployer.address, spender.address)).to.eq(200);
        (0, chai_1.expect)(result.current.state.transactionName).to.eq('Approve');
    });
    it('events', async () => {
        var _a, _b, _c, _d, _e;
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'approve', { transactionName: 'Approve' }), {
            config,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 200);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)((_b = (_a = result.current) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.length).to.eq(1);
        const event = (_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.events) === null || _d === void 0 ? void 0 : _d[0];
        (0, chai_1.expect)(event === null || event === void 0 ? void 0 : event.name).to.eq('Approval');
        (0, chai_1.expect)(event === null || event === void 0 ? void 0 : event.args['owner']).to.eq(network1.deployer.address);
        (0, chai_1.expect)(event === null || event === void 0 ? void 0 : event.args['spender']).to.eq(spender.address);
        (0, chai_1.expect)(event === null || event === void 0 ? void 0 : event.args['value']).to.eq(ethers_1.BigNumber.from(200));
        (0, chai_1.expect)((_e = result.current) === null || _e === void 0 ? void 0 : _e.state.transactionName).to.eq('Approve');
    });
    it('exception (bad arguments)', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'approve', { transactionName: 'Approve' }), {
            config,
        });
        await waitForNextUpdate();
        await (0, chai_1.expect)(result.current.send()).to.be.rejectedWith('Invalid number of arguments for function "approve".');
        await waitForCurrent((val) => val.state !== undefined);
    });
    it('exception (bad arguments with opts)', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'approve'), {
            config,
        });
        await waitForNextUpdate();
        await (0, chai_1.expect)(result.current.send({
            gasLimit: 100000,
        })).to.be.rejectedWith('Invalid number of arguments for function "approve".');
        await waitForCurrent((val) => val.state !== undefined);
    });
    it('exception (when transaction reverts)', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(
        // { gasLimitBufferPercentage: -10 } - to cause out of gas error
        () => (0, src_1.useContractFunction)(token, 'transfer', { gasLimitBufferPercentage: -10, transactionName: 'Approve' }), {
            config,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 10);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Fail');
        (0, chai_1.expect)(result.current.state.transactionName).to.eq('Approve');
        (0, chai_1.expect)(result.current.state.errorMessage).to.eq('transaction failed');
    });
    it('should not throw error when contract is Falsy', async () => {
        const { result, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(null, 'approve'), {
            config,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 200);
    });
    it('transfer amount with limit', async () => {
        var _a;
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'transfer'), {
            config: {
                ...config,
                gasLimitBufferPercentage: 100,
            },
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 200);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)((_a = result.current.state.transaction) === null || _a === void 0 ? void 0 : _a.gasLimit.toNumber()).to.be.closeTo(2 * CONTRACT_FUNCTION_COST, 100);
    });
    it('transfer amount with limit in args', async () => {
        var _a;
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'transfer', { gasLimitBufferPercentage: 100 }), {
            config,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 200);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)((_a = result.current.state.transaction) === null || _a === void 0 ? void 0 : _a.gasLimit.toNumber()).to.be.closeTo(2 * CONTRACT_FUNCTION_COST, 100);
    });
    it('success with correct receipt', async () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'approve'), {
            config,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 200);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        (0, chai_1.expect)(await token.allowance(network1.deployer.address, spender.address)).to.eq(200);
        (0, chai_1.expect)(result.current.state.receipt).to.not.be.undefined;
        (0, chai_1.expect)((_a = result.current.state.receipt) === null || _a === void 0 ? void 0 : _a.to).to.eq(token.address);
        (0, chai_1.expect)((_b = result.current.state.receipt) === null || _b === void 0 ? void 0 : _b.from).to.eq(network1.deployer.address);
        (0, chai_1.expect)((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.gasUsed).to.be.gt(0);
        (0, chai_1.expect)((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.status).to.eq(1);
        (0, chai_1.expect)((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.blockHash).to.match(/^0x/);
        (0, chai_1.expect)((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.transactionHash).to.match(/^0x/);
        (0, chai_1.expect)((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.gasUsed).to.be.gt(0);
    });
    it('transfer amount with just private key', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'transfer', { chainId: 1, privateKey: wallet1.privateKey }), {
            config,
        });
        await waitForNextUpdate();
        const startingBalance = await token.balanceOf(wallet2.address);
        await result.current.send(wallet2.address, 100);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        const finalBalance = await token.balanceOf(wallet2.address);
        (0, chai_1.expect)(finalBalance).to.equal(startingBalance.add(100));
    });
    it('transfer amount with just mnemonic phrase', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'transfer', { chainId: 1, mnemonicPhrase: wallet1.mnemonic.phrase }), {
            config,
        });
        await waitForNextUpdate();
        const startingBalance = await token.balanceOf(wallet2.address);
        await result.current.send(wallet2.address, 100);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        const finalBalance = await token.balanceOf(wallet2.address);
        (0, chai_1.expect)(finalBalance).to.equal(startingBalance.add(100));
    });
    it('transfer amount with just encrypted json', async () => {
        const json = await wallet1.encrypt('test');
        const { result, waitForCurrent, waitForNextUpdate } = await (0, renderDAppHook_1.renderDAppHook)(() => (0, src_1.useContractFunction)(token, 'transfer', {
            chainId: 1,
            json,
            password: 'test',
        }), {
            config,
        });
        await waitForNextUpdate();
        const startingBalance = await token.balanceOf(wallet2.address);
        await result.current.send(wallet2.address, 100);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        const finalBalance = await token.balanceOf(wallet2.address);
        (0, chai_1.expect)(finalBalance).to.equal(startingBalance.add(100));
    });
});
//# sourceMappingURL=useContractFunction.test.js.map
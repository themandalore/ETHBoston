"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const chai_1 = require("chai");
const ethers_2 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const constants_1 = require("../constants");
const testing_1 = require("../testing");
const useLogs_1 = require("./useLogs");
const useSendTransaction_1 = require("./useSendTransaction");
const AddressZero = ethers_1.constants.AddressZero;
describe('useLogs', () => {
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
    async function sendToken(signer, to, amount) {
        const { result, waitForCurrent, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(() => (0, useSendTransaction_1.useSendTransaction)({
            signer,
        }), { config });
        await waitForNextUpdate();
        const txData = constants_1.ERC20MockInterface.encodeFunctionData('transfer(address,uint)', [to, amount]);
        const tx = {
            to: token.address,
            value: ethers_2.BigNumber.from(0),
            data: txData,
        };
        await result.current.sendTransaction(tx);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
        return result.current.state;
    }
    it('Can get only the recent token transfer log', async () => {
        var _a, _b, _c, _d;
        const blockNumber = await network1.provider.getBlockNumber();
        const from = network1.deployer;
        const to = network1.wallets[0];
        const fromAddress = from.address;
        const toAddress = to.address;
        const amount = ethers_2.BigNumber.from(1);
        await sendToken(from, toAddress, amount);
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: token,
            event: 'Transfer',
            args: [],
        }, {
            fromBlock: blockNumber + 1,
            toBlock: blockNumber + 2,
        }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.not.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
        (0, chai_1.expect)((_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length).to.equal(1, 'Number of logs');
        const log = result.current.value[0];
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['from'])).to.equal((0, utils_1.getAddress)(fromAddress), 'From');
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['to'])).to.equal((0, utils_1.getAddress)(toAddress), 'To');
        (0, chai_1.expect)(log.data['value']).to.equal(amount, 'Amount');
    });
    it('Can get all token transfer logs using the default log query parameters', async () => {
        var _a, _b, _c, _d;
        const from = network1.deployer;
        const to = network1.wallets[0];
        const fromAddress = from.address;
        const toAddress = to.address;
        const amount = ethers_2.BigNumber.from(1);
        await sendToken(from, toAddress, amount);
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: token,
            event: 'Transfer',
            args: [],
        }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.not.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
        (0, chai_1.expect)((_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length).to.equal(2, 'Number of logs');
        // Mint transfer event
        const log1 = result.current.value[0];
        (0, chai_1.expect)((0, utils_1.getAddress)(log1.data['from'])).to.equal((0, utils_1.getAddress)(AddressZero), 'From');
        (0, chai_1.expect)((0, utils_1.getAddress)(log1.data['to'])).to.equal((0, utils_1.getAddress)(network1.deployer.address), 'To');
        (0, chai_1.expect)(log1.data['value']).to.equal(testing_1.MOCK_TOKEN_INITIAL_BALANCE, 'Amount');
        // Recent transfer transaction log
        const log = result.current.value[1];
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['from'])).to.equal((0, utils_1.getAddress)(fromAddress), 'From');
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['to'])).to.equal((0, utils_1.getAddress)(toAddress), 'To');
        (0, chai_1.expect)(log.data['value']).to.equal(amount, 'Amount');
    });
    it('Can get the mint transfer log', async () => {
        var _a, _b, _c, _d;
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: token,
            event: 'Transfer',
            args: [],
        }, {
            fromBlock: 0,
            toBlock: 'latest',
        }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.not.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
        (0, chai_1.expect)((_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length).to.equal(1, 'Number of logs');
        const log = result.current.value[0];
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['from'])).to.equal((0, utils_1.getAddress)(AddressZero), 'From');
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['to'])).to.equal((0, utils_1.getAddress)(network1.deployer.address), 'To');
        (0, chai_1.expect)(log.data['value']).to.equal(testing_1.MOCK_TOKEN_INITIAL_BALANCE, 'Amount');
    });
    it('Can get the mint transfer log on the alternative chain', async () => {
        var _a, _b, _c, _d;
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: secondToken,
            event: 'Transfer',
            args: [],
        }, {
            fromBlock: 0,
            toBlock: 'latest',
            chainId: network2.chainId,
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.not.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
        (0, chai_1.expect)((_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length).to.equal(1, 'Number of logs');
        const log = result.current.value[0];
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['from'])).to.equal((0, utils_1.getAddress)(AddressZero), 'From');
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['to'])).to.equal((0, utils_1.getAddress)(network2.deployer.address), 'To');
        (0, chai_1.expect)(log.data['value']).to.equal(testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE, 'Amount');
    });
    it('Works if there are no logs', async () => {
        var _a, _b, _c, _d;
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: secondToken,
            event: 'Transfer',
            args: [],
        }, {
            fromBlock: 0,
            toBlock: 'latest',
        }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.not.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
        (0, chai_1.expect)((_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length).to.equal(0, 'Number of logs');
    });
    it('Can query mint transfer logs by sender', async () => {
        var _a, _b, _c, _d;
        // Send to emit another Transfer token that our filter should filter out
        await sendToken(network1.deployer, network1.wallets[1].address, ethers_2.BigNumber.from(1));
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: token,
            event: 'Transfer',
            args: [AddressZero],
        }, {
            fromBlock: 0,
            toBlock: 'latest',
        }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.not.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
        (0, chai_1.expect)((_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length).to.equal(1, 'Number of logs');
        const log = result.current.value[0];
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['from'])).to.equal((0, utils_1.getAddress)(AddressZero), 'From');
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['to'])).to.equal((0, utils_1.getAddress)(network1.deployer.address), 'To');
        (0, chai_1.expect)(log.data['value']).to.equal(testing_1.MOCK_TOKEN_INITIAL_BALANCE, 'Amount');
    });
    it('Can query mint transfer logs by receiver', async () => {
        var _a, _b, _c, _d;
        // Send to emit another Transfer token that our filter should filter out
        await sendToken(network1.deployer, network1.wallets[1].address, ethers_2.BigNumber.from(1));
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: token,
            event: 'Transfer',
            args: [null, network1.deployer.address],
        }, {
            fromBlock: 0,
            toBlock: 'latest',
        }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.not.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
        (0, chai_1.expect)((_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length).to.equal(1, 'Number of logs');
        const log = result.current.value[0];
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['from'])).to.equal((0, utils_1.getAddress)(AddressZero), 'From');
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['to'])).to.equal((0, utils_1.getAddress)(network1.deployer.address), 'To');
        (0, chai_1.expect)(log.data['value']).to.equal(testing_1.MOCK_TOKEN_INITIAL_BALANCE, 'Amount');
    });
    it('We get an error when we query by un-indexed values', async () => {
        var _a, _b;
        // Send to emit another Transfer token that our filter should filter out
        await sendToken(network1.deployer, network1.wallets[0].address, ethers_2.BigNumber.from(1));
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: token,
            event: 'Transfer',
            args: [null, null, testing_1.MOCK_TOKEN_INITIAL_BALANCE],
        }, {
            fromBlock: 0,
            toBlock: 'latest',
        }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.not.be.undefined;
    });
    it('Can query by block hash', async () => {
        var _a, _b, _c, _d;
        // Send to emit another Transfer token that our filter should filter out
        const { receipt } = await sendToken(network1.deployer, network1.wallets[0].address, ethers_2.BigNumber.from(1));
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useLogs_1.useLogs)({
            contract: token,
            event: 'Transfer',
            args: [],
        }, {
            blockHash: receipt === null || receipt === void 0 ? void 0 : receipt.blockHash,
        }), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.value).to.not.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b.error).to.be.undefined;
        (0, chai_1.expect)((_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length).to.equal(1, 'Number of logs');
        const log = result.current.value[0];
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['from'])).to.equal((0, utils_1.getAddress)(network1.deployer.address), 'From');
        (0, chai_1.expect)((0, utils_1.getAddress)(log.data['to'])).to.equal((0, utils_1.getAddress)(network1.wallets[0].address), 'To');
        (0, chai_1.expect)(log.data['value']).to.equal(ethers_2.BigNumber.from(1), 'Amount');
        (0, chai_1.expect)(log.blockHash).to.equal(receipt === null || receipt === void 0 ? void 0 : receipt.blockHash, 'Block hash');
        (0, chai_1.expect)(log.blockNumber).to.equal(receipt === null || receipt === void 0 ? void 0 : receipt.blockNumber, 'Block number');
        (0, chai_1.expect)(log.transactionHash).to.equal(receipt === null || receipt === void 0 ? void 0 : receipt.transactionHash, 'Transaction hash');
        (0, chai_1.expect)(log.transactionIndex).to.equal(receipt === null || receipt === void 0 ? void 0 : receipt.transactionIndex, 'Transaction index');
    });
});
//# sourceMappingURL=useLogs.test.js.map
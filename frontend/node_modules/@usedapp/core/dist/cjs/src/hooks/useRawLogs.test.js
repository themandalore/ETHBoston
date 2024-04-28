"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const chai_1 = require("chai");
const constants_1 = require("../constants");
const testing_1 = require("../testing");
const useRawLogs_1 = require("./useRawLogs");
const useSendTransaction_1 = require("./useSendTransaction");
const AddressZero = ethers_1.constants.AddressZero;
const { defaultAbiCoder, getAddress, hexStripZeros } = ethers_1.utils;
describe('useRawLogs', () => {
    let token;
    let secondToken;
    let config;
    let network1;
    let network2;
    const eventTopic = ethers_1.ethers.utils.id('Transfer(address,address,uint256)');
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
            value: ethers_1.BigNumber.from(0),
            data: txData,
        };
        await result.current.sendTransaction(tx);
        await waitForCurrent((val) => val.state !== undefined);
        (0, chai_1.expect)(result.current.state.status).to.eq('Success');
    }
    function extractAddress(address) {
        let result;
        result = hexStripZeros(address);
        while (result.length != 42)
            result = '0x0' + result.substring(2);
        return result;
    }
    it('Can get only the recent token transfer log', async () => {
        var _a;
        const blockNumber = await network1.provider.getBlockNumber();
        const from = network1.deployer;
        const to = network1.wallets[0];
        const fromAddress = from.address;
        const toAddress = to.address;
        const amount = ethers_1.BigNumber.from(1);
        await sendToken(from, toAddress, amount);
        const filter = {
            address: token.address,
            fromBlock: blockNumber + 1,
            toBlock: blockNumber + 2,
            topics: [eventTopic],
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawLogs_1.useRawLogs)(filter), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.length).to.equal(1, 'Number of logs');
        const log = result.current[0];
        (0, chai_1.expect)(log.topics[0]).to.equal(eventTopic, 'Event topic');
        (0, chai_1.expect)(getAddress(extractAddress(log.topics[1]))).to.equal(getAddress(fromAddress), 'From');
        (0, chai_1.expect)(getAddress(extractAddress(log.topics[2]))).to.equal(getAddress(toAddress), 'To');
        const decodedData = defaultAbiCoder.decode(['uint'], log.data);
        (0, chai_1.expect)(decodedData[0]).to.equal(amount, 'Amount');
    });
    it('Can get all token transfer logs', async () => {
        var _a;
        const from = network1.deployer;
        const to = network1.wallets[0];
        const fromAddress = from.address;
        const toAddress = to.address;
        const amount = ethers_1.BigNumber.from(1);
        await sendToken(from, toAddress, amount);
        const filter = {
            address: token.address,
            fromBlock: 0,
            toBlock: 'latest',
            topics: [eventTopic],
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawLogs_1.useRawLogs)(filter), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.length).to.equal(2, 'Number of logs');
        // Mint transfer event
        const log1 = result.current[0];
        (0, chai_1.expect)(log1.topics[0]).to.equal(eventTopic, 'Event topic');
        (0, chai_1.expect)(getAddress(extractAddress(log1.topics[1]))).to.equal(getAddress(AddressZero), 'From');
        (0, chai_1.expect)(getAddress(extractAddress(log1.topics[2]))).to.equal(getAddress(network1.deployer.address), 'To');
        const decodedData1 = defaultAbiCoder.decode(['uint'], log1.data);
        (0, chai_1.expect)(decodedData1[0]).to.equal(testing_1.MOCK_TOKEN_INITIAL_BALANCE, 'Amount');
        // Recent transfer transaction log
        const log = result.current[1];
        (0, chai_1.expect)(log.topics[0]).to.equal(eventTopic, 'Event topic');
        (0, chai_1.expect)(getAddress(extractAddress(log.topics[1]))).to.equal(getAddress(fromAddress), 'From');
        (0, chai_1.expect)(getAddress(extractAddress(log.topics[2]))).to.equal(getAddress(toAddress), 'To');
        const decodedData = defaultAbiCoder.decode(['uint'], log.data);
        (0, chai_1.expect)(decodedData[0]).to.equal(amount, 'Amount');
    });
    it('Can get the mint transfer log', async () => {
        var _a;
        const filter = {
            address: token.address,
            fromBlock: 0,
            toBlock: 'latest',
            topics: [eventTopic],
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawLogs_1.useRawLogs)(filter), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.length).to.equal(1, 'Number of logs');
        const log = result.current[0];
        (0, chai_1.expect)(log.topics[0]).to.equal(eventTopic, 'Event topic');
        (0, chai_1.expect)(getAddress(extractAddress(log.topics[1]))).to.equal(getAddress(AddressZero), 'From');
        (0, chai_1.expect)(getAddress(extractAddress(log.topics[2]))).to.equal(getAddress(network1.deployer.address), 'To');
        const decodedData = defaultAbiCoder.decode(['uint'], log.data);
        (0, chai_1.expect)(decodedData[0]).to.equal(testing_1.MOCK_TOKEN_INITIAL_BALANCE, 'Amount');
    });
    it('Can get the mint transfer log on the alternative chain', async () => {
        var _a;
        const filter = {
            address: secondToken.address,
            fromBlock: 0,
            toBlock: 'latest',
            topics: [eventTopic],
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawLogs_1.useRawLogs)(filter), {
            config: {
                ...config,
                readOnlyChainId: network2.chainId,
            },
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.length).to.equal(1, 'Number of logs');
        const log = result.current[0];
        (0, chai_1.expect)(log.topics[0]).to.equal(eventTopic, 'Event topic');
        (0, chai_1.expect)(getAddress(extractAddress(log.topics[1]))).to.equal(getAddress(AddressZero), 'From');
        (0, chai_1.expect)(getAddress(extractAddress(log.topics[2]))).to.equal(getAddress(network2.deployer.address), 'To');
        const decodedData = defaultAbiCoder.decode(['uint'], log.data);
        (0, chai_1.expect)(decodedData[0]).to.equal(testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE, 'Amount');
    });
    it('Works if there are no logs', async () => {
        var _a;
        const filter = {
            address: secondToken.address,
            fromBlock: 0,
            toBlock: 'latest',
            topics: [eventTopic],
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useRawLogs_1.useRawLogs)(filter), { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.length).to.equal(0, 'Number of logs');
    });
});
//# sourceMappingURL=useRawLogs.test.js.map
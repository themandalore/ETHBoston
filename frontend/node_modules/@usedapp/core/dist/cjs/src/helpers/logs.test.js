"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const chai_1 = require("chai");
const ethers_2 = require("ethers");
const testing_1 = require("../testing");
const logs_1 = require("./logs");
const AddressZero = ethers_1.constants.AddressZero;
describe('encodeFilterData', () => {
    const mockProvider = new testing_1.MockProvider();
    const [deployer] = mockProvider.getWallets();
    let token;
    beforeEach(async () => {
        token = await (0, testing_1.deployMockToken)(deployer);
    });
    it('Returns undefined if the filter is undefined', () => {
        (0, chai_1.expect)((0, logs_1.encodeFilterData)(undefined)).to.be.undefined;
    });
    it('Returns FilterByBlockHash when blockHash is valid', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [],
        };
        const encodedFilterData = (0, logs_1.encodeFilterData)(filter, undefined, undefined, '0x0');
        (0, chai_1.expect)(encodedFilterData['blockHash']).to.not.be.undefined;
    });
    it('Returns FilterByBlockHash when blockHash, toBlock, and fromBlock are valid', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [],
        };
        const encodedFilterData = (0, logs_1.encodeFilterData)(filter, 0, 'latest', '0x0');
        (0, chai_1.expect)(encodedFilterData['blockHash']).to.not.be.undefined;
    });
    it('Returns Filter when toBlock and fromBlock are valid but blockHash is invalid', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [],
        };
        const encodedFilterData = (0, logs_1.encodeFilterData)(filter, 0, 'latest', undefined);
        (0, chai_1.expect)(encodedFilterData['toBlock']).to.not.be.undefined;
    });
    it('Returns an error when passed a non-existant event', () => {
        const filter = {
            contract: token,
            event: 'Transfer2',
            args: [],
        };
        const encodedFilterData = (0, logs_1.encodeFilterData)(filter, 0, 'latest');
        (0, chai_1.expect)(encodedFilterData).to.be.a('Error');
    });
    it('Returns an error when passed an arg for an un-indexed parameter', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [AddressZero, AddressZero, 10],
        };
        const encodedFilterData = (0, logs_1.encodeFilterData)(filter, 0, 'latest');
        (0, chai_1.expect)(encodedFilterData).to.be.a('Error');
    });
    it('Returns an error when passed too many args', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [AddressZero, AddressZero, null, AddressZero],
        };
        const encodedFilterData = (0, logs_1.encodeFilterData)(filter, 0, 'latest');
        (0, chai_1.expect)(encodedFilterData).to.be.a('Error');
    });
});
describe('decodeLogs', () => {
    const mockProvider = new testing_1.MockProvider();
    const [deployer] = mockProvider.getWallets();
    let token;
    beforeEach(async () => {
        token = await (0, testing_1.deployMockToken)(deployer);
    });
    it('Returns undefined if the filter and result are undefined', () => {
        (0, chai_1.expect)((0, logs_1.decodeLogs)(undefined, undefined)).to.be.undefined;
    });
    it('Returns undefined if the result is undefined', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [],
        };
        (0, chai_1.expect)((0, logs_1.decodeLogs)(filter, undefined)).to.be.undefined;
    });
    it('Returns undefined if the filter is undefined', () => {
        (0, chai_1.expect)((0, logs_1.decodeLogs)(undefined, [])).to.be.undefined;
    });
    it('Returns an error if passed an error as the result', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [],
        };
        const error = Error('');
        const decodedLogs = (0, logs_1.decodeLogs)(filter, error);
        (0, chai_1.expect)(decodedLogs === null || decodedLogs === void 0 ? void 0 : decodedLogs.error).to.equal(error);
        (0, chai_1.expect)(decodedLogs === null || decodedLogs === void 0 ? void 0 : decodedLogs.value).to.be.undefined;
    });
    it('Returns an empty array when passed an empty array of logs', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [],
        };
        const logs = [];
        const decodedLogs = (0, logs_1.decodeLogs)(filter, logs);
        (0, chai_1.expect)(decodedLogs === null || decodedLogs === void 0 ? void 0 : decodedLogs.error).to.be.undefined;
        (0, chai_1.expect)(decodedLogs === null || decodedLogs === void 0 ? void 0 : decodedLogs.value).to.be.empty;
    });
    it('Returns an error when the event topic is a mismatch', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [],
        };
        const logs = [
            {
                address: token.address,
                topics: [
                    ethers_2.ethers.utils.id('Transfer2(address,address,uint256)'),
                    ethers_2.ethers.utils.hexZeroPad(AddressZero, 32),
                    ethers_2.ethers.utils.hexZeroPad(AddressZero, 32),
                ],
                data: ethers_2.ethers.utils.hexZeroPad(AddressZero, 32),
                blockHash: '0x0',
                blockNumber: 0,
                logIndex: 0,
                transactionIndex: 0,
                transactionHash: '0x0',
                removed: false,
            },
        ];
        const decodedLogs = (0, logs_1.decodeLogs)(filter, logs);
        (0, chai_1.expect)(decodedLogs === null || decodedLogs === void 0 ? void 0 : decodedLogs.value).to.be.undefined;
        (0, chai_1.expect)(decodedLogs === null || decodedLogs === void 0 ? void 0 : decodedLogs.error).to.be.a('Error');
    });
    it('Works when passed valid logs', () => {
        const filter = {
            contract: token,
            event: 'Transfer',
            args: [],
        };
        const from = AddressZero;
        const to = deployer.address;
        const value = ethers_2.BigNumber.from(1);
        const blockHash = '0x0';
        const blockNumber = 1;
        const logIndex = 2;
        const transactionIndex = 3;
        const removed = true;
        const transactionHash = '0x11';
        const logs = [
            {
                address: token.address,
                topics: [
                    ethers_2.ethers.utils.id('Transfer(address,address,uint256)'),
                    ethers_2.ethers.utils.hexZeroPad(from, 32),
                    ethers_2.ethers.utils.hexZeroPad(to, 32),
                ],
                data: ethers_2.ethers.utils.hexZeroPad(ethers_2.ethers.utils.hexlify(value), 32),
                blockHash,
                blockNumber,
                logIndex,
                transactionIndex,
                transactionHash,
                removed,
            },
            {
                address: token.address,
                topics: [
                    ethers_2.ethers.utils.id('Transfer(address,address,uint256)'),
                    ethers_2.ethers.utils.hexZeroPad(from, 32),
                    ethers_2.ethers.utils.hexZeroPad(to, 32),
                ],
                data: ethers_2.ethers.utils.hexZeroPad(ethers_2.ethers.utils.hexlify(value), 32),
                blockHash,
                blockNumber,
                logIndex,
                transactionIndex,
                transactionHash,
                removed,
            },
        ];
        const decodedLogs = (0, logs_1.decodeLogs)(filter, logs);
        (0, chai_1.expect)(decodedLogs === null || decodedLogs === void 0 ? void 0 : decodedLogs.error).to.be.undefined;
        const theLogs = decodedLogs;
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value).to.have.length(2);
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value[0].blockHash).to.equal(blockHash);
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value[0].blockNumber).to.equal(blockNumber);
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value[0].removed).to.equal(removed);
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value[0].transactionIndex).to.equal(transactionIndex);
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value[0].transactionHash).to.equal(transactionHash);
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value[0].data.from).to.equal(from);
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value[0].data.to).to.equal(to);
        (0, chai_1.expect)(theLogs === null || theLogs === void 0 ? void 0 : theLogs.value[0].data.value).to.equal(value);
    });
});
//# sourceMappingURL=logs.test.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const chai_1 = __importStar(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const __1 = require("../../..");
const ethers_2 = require("ethers");
const sendEmptyTx_1 = require("../../../testing/utils/sendEmptyTx");
const multicall_1 = require("./multicall");
const testing_1 = require("../../../testing");
const deployContract_1 = require("../../../testing/utils/deployContract");
chai_1.default.use(chai_as_promised_1.default);
const Interface = ethers_1.utils.Interface;
describe('Multicall', () => {
    const mockProvider = new testing_1.MockProvider();
    const [deployer] = mockProvider.getWallets();
    let tokenContract;
    let multicallContract;
    beforeEach(async () => {
        const args = ['MOCKToken', 'MOCK', deployer.address, '10000'];
        tokenContract = await (0, deployContract_1.deployContract)(deployer, __1.ERC20Mock, args);
        multicallContract = await (0, deployContract_1.deployContract)(deployer, __1.MultiCall);
    });
    for (const fastEncoding of [false, true]) {
        describe(fastEncoding ? 'Fast encoding' : 'Ethers encoding', () => {
            const multicall = (0, multicall_1.multicall1Factory)(fastEncoding);
            it('Retrieves token balance using aggregate', async () => {
                const data = new Interface(__1.ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]);
                const call = {
                    address: tokenContract.address,
                    data,
                    chainId: mockProvider._network.chainId,
                };
                const blockNumber = await mockProvider.getBlockNumber();
                const result = await multicall(mockProvider, multicallContract.address, blockNumber, [call]);
                const unwrappedResult = result[tokenContract.address][data];
                (0, chai_1.expect)(ethers_2.BigNumber.from(unwrappedResult === null || unwrappedResult === void 0 ? void 0 : unwrappedResult.value)).to.eq('10000');
            });
            it('Fails to retrieve data on block number in the future', async () => {
                const data = new Interface(__1.ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]);
                const call = {
                    address: tokenContract.address,
                    data,
                    chainId: mockProvider._network.chainId,
                };
                const blockNumber = (await mockProvider.getBlockNumber()) + 1;
                await (0, chai_1.expect)(multicall(mockProvider, multicallContract.address, blockNumber, [call])).to.be.eventually.rejected;
            });
            it('Does not fail when retrieving data on block number from the past', async () => {
                const data = new Interface(__1.ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]);
                const call = {
                    address: tokenContract.address,
                    data,
                    chainId: mockProvider._network.chainId,
                };
                await (0, sendEmptyTx_1.sendEmptyTx)(deployer);
                const blockNumber = (await mockProvider.getBlockNumber()) - 1;
                const result = await multicall(mockProvider, multicallContract.address, blockNumber, [call]);
                const unwrappedResult = result[tokenContract.address][data];
                (0, chai_1.expect)(ethers_2.BigNumber.from(unwrappedResult === null || unwrappedResult === void 0 ? void 0 : unwrappedResult.value)).to.eq('10000');
            });
            it('Does not fail when doing multiple calls at once', async () => {
                const data = new Interface(__1.ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]);
                const call = {
                    address: tokenContract.address,
                    data,
                    chainId: mockProvider._network.chainId,
                };
                const blockNumber = await mockProvider.getBlockNumber();
                await Promise.all([
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                    multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                ]);
            });
        });
    }
});
//# sourceMappingURL=multicall.test.js.map
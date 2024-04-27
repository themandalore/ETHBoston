"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployMockToken = exports.SECOND_MOCK_TOKEN_INITIAL_BALANCE = exports.SECOND_TEST_CHAIN_ID = exports.MOCK_TOKEN_INITIAL_BALANCE = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const deployContract_1 = require("./deployContract");
exports.MOCK_TOKEN_INITIAL_BALANCE = ethers_1.utils.parseEther('10');
exports.SECOND_TEST_CHAIN_ID = 31337;
exports.SECOND_MOCK_TOKEN_INITIAL_BALANCE = ethers_1.BigNumber.from(2000);
async function deployMockToken(deployer, initialBalance) {
    const args = ['MOCKToken', 'MOCK', deployer.address, initialBalance !== null && initialBalance !== void 0 ? initialBalance : exports.MOCK_TOKEN_INITIAL_BALANCE];
    return await (0, deployContract_1.deployContract)(deployer, constants_1.ERC20Mock, args);
}
exports.deployMockToken = deployMockToken;
//# sourceMappingURL=deployMockToken.js.map
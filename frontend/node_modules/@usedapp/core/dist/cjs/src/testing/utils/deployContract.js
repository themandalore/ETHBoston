"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployContract = void 0;
const ethers_1 = require("ethers");
const deployContract = async (deployer, { abi, bytecode }, args = []) => {
    const contractFactory = new ethers_1.ContractFactory(abi, bytecode, deployer);
    const contract = await contractFactory.deploy(...args);
    await contract.deployed();
    return contract;
};
exports.deployContract = deployContract;
//# sourceMappingURL=deployContract.js.map
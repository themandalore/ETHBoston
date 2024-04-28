"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployContract = void 0;
const ethers_1 = require("ethers");
async function deployContract(contractAbi, signer) {
    const factory = new ethers_1.ContractFactory(contractAbi.abi, contractAbi.bytecode, signer);
    const contract = await factory.deploy();
    return await contract.deployTransaction.wait();
}
exports.deployContract = deployContract;
//# sourceMappingURL=contract.js.map
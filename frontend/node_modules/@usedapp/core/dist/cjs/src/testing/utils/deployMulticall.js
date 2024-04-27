"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployMulticall2 = exports.deployMulticall = void 0;
const constants_1 = require("../../constants");
const deployContract_1 = require("./deployContract");
const deployMulticall = async (chainId, deployer) => {
    return deployMulticallBase(constants_1.MultiCall, chainId, deployer);
};
exports.deployMulticall = deployMulticall;
const deployMulticall2 = async (chainId, deployer) => {
    return deployMulticallBase(constants_1.MultiCall2, chainId, deployer);
};
exports.deployMulticall2 = deployMulticall2;
const deployMulticallBase = async (contract, chainId, deployer) => {
    const multicall = await (0, deployContract_1.deployContract)(deployer, {
        bytecode: contract.bytecode,
        abi: contract.abi,
    });
    const multicallAddresses = { [chainId]: multicall.address };
    return multicallAddresses;
};
//# sourceMappingURL=deployMulticall.js.map
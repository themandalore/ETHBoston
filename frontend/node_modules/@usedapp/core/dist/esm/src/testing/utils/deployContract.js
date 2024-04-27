import { ContractFactory } from 'ethers';
export const deployContract = async (deployer, { abi, bytecode }, args = []) => {
    const contractFactory = new ContractFactory(abi, bytecode, deployer);
    const contract = await contractFactory.deploy(...args);
    await contract.deployed();
    return contract;
};
//# sourceMappingURL=deployContract.js.map
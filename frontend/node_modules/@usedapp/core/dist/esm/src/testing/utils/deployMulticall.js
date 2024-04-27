import { MultiCall, MultiCall2 } from '../../constants';
import { deployContract } from './deployContract';
export const deployMulticall = async (chainId, deployer) => {
    return deployMulticallBase(MultiCall, chainId, deployer);
};
export const deployMulticall2 = async (chainId, deployer) => {
    return deployMulticallBase(MultiCall2, chainId, deployer);
};
const deployMulticallBase = async (contract, chainId, deployer) => {
    const multicall = await deployContract(deployer, {
        bytecode: contract.bytecode,
        abi: contract.abi,
    });
    const multicallAddresses = { [chainId]: multicall.address };
    return multicallAddresses;
};
//# sourceMappingURL=deployMulticall.js.map
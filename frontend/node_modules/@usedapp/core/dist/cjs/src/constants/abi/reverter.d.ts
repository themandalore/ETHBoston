export declare const reverterContractSource = "\npragma solidity ^0.8.0;\n\ncontract ReverterContract {\n  function doRevert() public pure {\n    revert();\n  }\n\n  function revertOnOdd(uint num) public {\n      require(num % 2 == 0, \"Expected num to be even.\");\n  }\n}\n";
export declare const reverterContractABI: {
    contractName: string;
    abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    bytecode: string;
};
//# sourceMappingURL=reverter.d.ts.map
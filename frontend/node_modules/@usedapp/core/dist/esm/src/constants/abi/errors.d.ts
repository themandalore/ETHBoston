export declare const errorsContractSource = "\n  pragma solidity ^0.8.13;\n\n  error One(uint value, string msg, bytes32 encoded);\n  error Two(uint256[3] value, bytes32[2] encoded);\n\n  contract ErrorsContract {\n      function doThrow() public pure {\n        assert(false);\n      }\n\n      function doRevert() public pure {\n        revert(\"Revert cause\");\n      }\n\n      function doRevertWithoutMessage() public pure {\n        revert();\n      }\n\n      function doRequireFail() public pure {\n        require(false, \"Require cause\");\n      }\n\n      function doRequireFailWithoutMessage() public pure {\n        require(false);\n      }\n\n      function doPanic() public pure {\n        uint d = 0;\n        uint x = 1 / d;\n      }\n\n      function doRevertWithOne() public pure {\n        revert One(0, 'message', 0x00cFBbaF7DDB3a1476767101c12a0162e241fbAD2a0162e2410cFBbaF7162123);\n      }\n\n      function doRevertWithTwo() public pure {\n        revert Two(\n          [\n            uint256(1),\n            uint256(2),\n            uint256(3)\n          ],\n          [\n            bytes32(0x00cFBbaF7DDB3a1476767101c12a0162e241fbAD2a0162e2410cFBbaF7162123),\n            bytes32(0x00cFBbaF7DDB3a1476767101c12a0162e241fbAD2a0162e2410cFBbaF7162124)\n          ]\n        );\n      }\n  }\n";
export declare const errorsContractABI: {
    contractName: string;
    abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    })[];
    bytecode: string;
};
//# sourceMappingURL=errors.d.ts.map
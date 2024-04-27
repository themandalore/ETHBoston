"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const src_1 = require("../src");
const testCases = src_1.contractNames.map((contractName) => [
    ["lynx", 80001, contractName],
    ["tapir", 80001, contractName],
].flat());
(0, vitest_1.describe)("registry", () => {
    for (const testCase of testCases) {
        const [domain, chainId, contract] = testCase;
        (0, vitest_1.it)(`should for domain ${domain}, chainId ${chainId}, contract ${contract}`, () => {
            const contractAddress = (0, src_1.getContract)(domain, chainId, contract);
            (0, vitest_1.expect)(contractAddress).toBeDefined();
        });
    }
    (0, vitest_1.it)("should throw for invalid domain", () => {
        (0, vitest_1.expect)(() => (0, src_1.getContract)("invalid-domain", 80001, "Coordinator")).toThrow();
    });
    (0, vitest_1.it)("should throw for invalid chainId", () => {
        (0, vitest_1.expect)(() => (0, src_1.getContract)("lynx", 0, "Coordinator")).toThrow();
    });
    (0, vitest_1.it)("should throw for invalid contract", () => {
        (0, vitest_1.expect)(() => (0, src_1.getContract)("lynx", 80001, "InvalidContract")).toThrow();
    });
    (0, vitest_1.it)("should return the same contract address for the same domain, chainId, and contract", () => {
        const contractAddress1 = (0, src_1.getContract)("lynx", 80001, "Coordinator");
        const contractAddress2 = (0, src_1.getContract)("lynx", 80001, "Coordinator");
        (0, vitest_1.expect)(contractAddress1).toEqual(contractAddress2);
    });
    (0, vitest_1.it)("should return different contract addresses for different domains", () => {
        const contractAddress1 = (0, src_1.getContract)("lynx", 80001, "Coordinator");
        const contractAddress2 = (0, src_1.getContract)("tapir", 80001, "Coordinator");
        (0, vitest_1.expect)(contractAddress1).not.toEqual(contractAddress2);
    });
});

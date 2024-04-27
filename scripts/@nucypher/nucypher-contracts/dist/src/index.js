"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContract = exports.domainRegistry = exports.contractNames = void 0;
const lynx_json_1 = __importDefault(require("../deployment/artifacts/lynx.json"));
const mainnet_json_1 = __importDefault(require("../deployment/artifacts/mainnet.json"));
const tapir_json_1 = __importDefault(require("../deployment/artifacts/tapir.json"));
// Only expose contracts that are used in the SDK
exports.contractNames = ["Coordinator", "GlobalAllowList", "SubscriptionManager"];
exports.domainRegistry = {
    lynx: lynx_json_1.default,
    tapir: tapir_json_1.default,
    mainnet: mainnet_json_1.default,
};
const getContract = (domain, chainId, contract) => {
    if (!exports.contractNames.includes(contract)) {
        throw new Error(`Invalid contract name: ${contract}`);
    }
    const registry = exports.domainRegistry[domain];
    if (!registry) {
        throw new Error(`No contract registry found for domain: ${domain}`);
    }
    const contracts = registry[chainId];
    if (!contracts) {
        throw new Error(`No contracts found for chainId: ${chainId}`);
    }
    const deployedContract = contracts[contract];
    if (!deployedContract) {
        throw new Error(`No contract found for name: ${contract}`);
    }
    return deployedContract.address;
};
exports.getContract = getContract;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMulticall1ErrorMessage = exports.ethersAbi = void 0;
const ethers_1 = require("ethers");
const MultiCall_json_1 = __importDefault(require("../../constants/abi/MultiCall.json"));
exports.ethersAbi = new ethers_1.utils.Interface(MultiCall_json_1.default.abi);
exports.defaultMulticall1ErrorMessage = 'One of the calls reverted in Multicall v1. See https://usedapp-docs.netlify.app/docs/Guides/Troubleshooting for more details.';
//# sourceMappingURL=constants.js.map
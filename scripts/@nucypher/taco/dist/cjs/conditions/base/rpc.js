"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcCondition = exports.rpcConditionSchema = exports.RpcConditionType = void 0;
const zod_1 = require("zod");
const condition_1 = require("../condition");
const const_1 = require("../const");
const shared_1 = require("../shared");
const zod_2 = __importDefault(require("../zod"));
exports.RpcConditionType = 'rpc';
exports.rpcConditionSchema = zod_1.z.object({
    conditionType: zod_1.z.literal(exports.RpcConditionType).default(exports.RpcConditionType),
    chain: (0, zod_2.default)(const_1.SUPPORTED_CHAIN_IDS),
    method: zod_1.z.enum(['eth_getBalance']),
    parameters: zod_1.z.union([
        zod_1.z.array(shared_1.EthAddressOrUserAddressSchema).nonempty(),
        // Using tuple here because ordering matters
        zod_1.z.tuple([shared_1.EthAddressOrUserAddressSchema, shared_1.paramOrContextParamSchema]),
    ]),
    returnValueTest: shared_1.returnValueTestSchema, // Update to allow multiple return values after expanding supported methods
});
class RpcCondition extends condition_1.Condition {
    constructor(value) {
        super(exports.rpcConditionSchema, {
            conditionType: exports.RpcConditionType,
            ...value,
        });
    }
}
exports.RpcCondition = RpcCondition;
//# sourceMappingURL=rpc.js.map
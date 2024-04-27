"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeCondition = exports.timeConditionSchema = exports.TimeConditionMethod = exports.TimeConditionType = void 0;
const zod_1 = require("zod");
const condition_1 = require("../condition");
const rpc_1 = require("./rpc");
// TimeCondition is an RpcCondition with the method set to 'blocktime' and no parameters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { parameters: _, ...restShape } = rpc_1.rpcConditionSchema.shape;
exports.TimeConditionType = 'time';
exports.TimeConditionMethod = 'blocktime';
exports.timeConditionSchema = zod_1.z.object({
    ...restShape,
    conditionType: zod_1.z.literal(exports.TimeConditionType).default(exports.TimeConditionType),
    method: zod_1.z.literal(exports.TimeConditionMethod).default(exports.TimeConditionMethod),
});
class TimeCondition extends condition_1.Condition {
    constructor(value) {
        super(exports.timeConditionSchema, {
            conditionType: exports.TimeConditionType,
            ...value,
        });
    }
}
exports.TimeCondition = TimeCondition;
//# sourceMappingURL=time.js.map
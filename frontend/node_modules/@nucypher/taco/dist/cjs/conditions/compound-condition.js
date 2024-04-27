"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundCondition = exports.compoundConditionSchema = exports.CompoundConditionType = void 0;
const zod_1 = require("zod");
const contract_1 = require("./base/contract");
const rpc_1 = require("./base/rpc");
const time_1 = require("./base/time");
const condition_1 = require("./condition");
exports.CompoundConditionType = 'compound';
exports.compoundConditionSchema = zod_1.z
    .object({
    conditionType: zod_1.z
        .literal(exports.CompoundConditionType)
        .default(exports.CompoundConditionType),
    operator: zod_1.z.enum(['and', 'or', 'not']),
    operands: zod_1.z
        .array(zod_1.z.lazy(() => zod_1.z.union([
        rpc_1.rpcConditionSchema,
        time_1.timeConditionSchema,
        contract_1.contractConditionSchema,
        exports.compoundConditionSchema,
    ])))
        .min(1),
})
    .refine((condition) => {
    // 'and' and 'or' operators must have at least 2 operands
    if (['and', 'or'].includes(condition.operator)) {
        return condition.operands.length >= 2;
    }
    // 'not' operator must have exactly 1 operand
    if (condition.operator === 'not') {
        return condition.operands.length === 1;
    }
    // We test positive cases exhaustively, so we return false here:
    return false;
}, ({ operands, operator }) => ({
    message: `Invalid number of operands ${operands.length} for operator "${operator}"`,
    path: ['operands'],
}));
class CompoundCondition extends condition_1.Condition {
    constructor(value) {
        super(exports.compoundConditionSchema, {
            conditionType: exports.CompoundConditionType,
            ...value,
        });
    }
    static withOperator(operands, operator) {
        const asObjects = operands.map((operand) => {
            if (operand instanceof condition_1.Condition) {
                return operand.toObj();
            }
            return operand;
        });
        return new CompoundCondition({
            operator,
            operands: asObjects,
        });
    }
    static or(conditions) {
        return CompoundCondition.withOperator(conditions, 'or');
    }
    static and(conditions) {
        return CompoundCondition.withOperator(conditions, 'and');
    }
    static not(condition) {
        return CompoundCondition.withOperator([condition], 'not');
    }
}
exports.CompoundCondition = CompoundCondition;
//# sourceMappingURL=compound-condition.js.map
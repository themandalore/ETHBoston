"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCondition = exports.contractConditionSchema = exports.ContractConditionType = void 0;
const ethers_1 = require("ethers");
const zod_1 = require("zod");
const condition_1 = require("../condition");
const const_1 = require("../const");
const shared_1 = require("../shared");
const rpc_1 = require("./rpc");
// TODO: Consider replacing with `z.unknown`:
//    Since Solidity types are tied to Solidity version, we may not be able to accurately represent them in Zod.
//    Alternatively, find a TS Solidity type lib.
const EthBaseTypes = [
    'bool',
    'string',
    'address',
    ...Array.from({ length: 32 }, (_v, i) => `bytes${i + 1}`),
    'bytes',
    ...Array.from({ length: 32 }, (_v, i) => `uint${8 * (i + 1)}`),
    ...Array.from({ length: 32 }, (_v, i) => `int${8 * (i + 1)}`), // int8 through int256
];
const functionAbiVariableSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    type: zod_1.z.enum(EthBaseTypes),
    internalType: zod_1.z.enum(EthBaseTypes), // TODO: Do we need to validate this?
})
    .strict();
const functionAbiSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    type: zod_1.z.literal('function'),
    inputs: zod_1.z.array(functionAbiVariableSchema).min(0),
    outputs: zod_1.z.array(functionAbiVariableSchema).nonempty(),
    stateMutability: zod_1.z.union([zod_1.z.literal('view'), zod_1.z.literal('pure')]),
})
    .strict()
    .refine((functionAbi) => {
    let asInterface;
    try {
        // `stringify` here because ethers.utils.Interface doesn't accept a Zod schema
        asInterface = new ethers_1.ethers.utils.Interface(JSON.stringify([functionAbi]));
    }
    catch (e) {
        return false;
    }
    const functionsInAbi = Object.values(asInterface.functions || {});
    return functionsInAbi.length === 1;
}, {
    message: '"functionAbi" must contain a single function definition',
    path: ['functionAbi'],
})
    .refine((functionAbi) => {
    const asInterface = new ethers_1.ethers.utils.Interface(JSON.stringify([functionAbi]));
    const nrOfInputs = asInterface.fragments[0].inputs.length;
    return functionAbi.inputs.length === nrOfInputs;
}, {
    message: '"parameters" must have the same length as "functionAbi.inputs"',
    path: ['parameters'],
});
exports.ContractConditionType = 'contract';
exports.contractConditionSchema = rpc_1.rpcConditionSchema
    .extend({
    conditionType: zod_1.z
        .literal(exports.ContractConditionType)
        .default(exports.ContractConditionType),
    contractAddress: zod_1.z.string().regex(const_1.ETH_ADDRESS_REGEXP).length(42),
    standardContractType: zod_1.z.enum(['ERC20', 'ERC721']).optional(),
    method: zod_1.z.string(),
    functionAbi: functionAbiSchema.optional(),
    parameters: zod_1.z.array(shared_1.paramOrContextParamSchema),
})
    // Adding this custom logic causes the return type to be ZodEffects instead of ZodObject
    // https://github.com/colinhacks/zod/issues/2474
    .refine(
// A check to see if either 'standardContractType' or 'functionAbi' is set
(data) => Boolean(data.standardContractType) !== Boolean(data.functionAbi), {
    message: "At most one of the fields 'standardContractType' and 'functionAbi' must be defined",
    path: ['standardContractType'],
});
class ContractCondition extends condition_1.Condition {
    constructor(value) {
        super(exports.contractConditionSchema, {
            conditionType: exports.ContractConditionType,
            ...value,
        });
    }
}
exports.ContractCondition = ContractCondition;
//# sourceMappingURL=contract.js.map
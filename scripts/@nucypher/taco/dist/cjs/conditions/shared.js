"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthAddressOrUserAddressSchema = exports.returnValueTestSchema = exports.paramOrContextParamSchema = exports.plainStringSchema = exports.contextParamSchema = void 0;
const zod_1 = require("zod");
const const_1 = require("./const");
exports.contextParamSchema = zod_1.z.string().regex(const_1.CONTEXT_PARAM_REGEXP);
// We want to discriminate between ContextParams and plain strings
// If a string starts with `:`, it's a ContextParam
exports.plainStringSchema = zod_1.z.string().refine((str) => {
    return !str.startsWith(const_1.CONTEXT_PARAM_PREFIX);
}, {
    message: 'String must not be a context parameter i.e. not start with ":"',
});
const paramSchema = zod_1.z.union([exports.plainStringSchema, zod_1.z.boolean(), zod_1.z.number()]);
exports.paramOrContextParamSchema = zod_1.z.union([
    paramSchema,
    exports.contextParamSchema,
    zod_1.z.lazy(() => zod_1.z.array(exports.paramOrContextParamSchema)),
]);
exports.returnValueTestSchema = zod_1.z.object({
    index: zod_1.z.number().int().nonnegative().optional(),
    comparator: zod_1.z.enum(['==', '>', '<', '>=', '<=', '!=']),
    value: exports.paramOrContextParamSchema,
});
const EthAddressSchema = zod_1.z.string().regex(const_1.ETH_ADDRESS_REGEXP);
const UserAddressSchema = zod_1.z.literal(const_1.USER_ADDRESS_PARAM);
exports.EthAddressOrUserAddressSchema = zod_1.z.union([
    EthAddressSchema,
    UserAddressSchema,
]);
//# sourceMappingURL=shared.js.map
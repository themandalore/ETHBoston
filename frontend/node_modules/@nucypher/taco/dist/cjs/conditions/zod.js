"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Source: https://github.com/colinhacks/zod/issues/831#issuecomment-1063481764
const createUnion = (values) => {
    const zodLiterals = values.map((value) => zod_1.z.literal(value));
    return zod_1.z.union(zodLiterals);
};
function createUnionSchema(values) {
    if (values.length === 0) {
        return zod_1.z.never();
    }
    if (values.length === 1) {
        return zod_1.z.literal(values[0]);
    }
    return createUnion(values);
}
exports.default = createUnionSchema;
//# sourceMappingURL=zod.js.map
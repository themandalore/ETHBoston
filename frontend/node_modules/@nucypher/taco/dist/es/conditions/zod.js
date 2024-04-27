import { z } from 'zod';
// Source: https://github.com/colinhacks/zod/issues/831#issuecomment-1063481764
const createUnion = (values) => {
    const zodLiterals = values.map((value) => z.literal(value));
    return z.union(zodLiterals);
};
function createUnionSchema(values) {
    if (values.length === 0) {
        return z.never();
    }
    if (values.length === 1) {
        return z.literal(values[0]);
    }
    return createUnion(values);
}
export default createUnionSchema;
//# sourceMappingURL=zod.js.map
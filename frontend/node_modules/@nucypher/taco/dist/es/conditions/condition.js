import { objectEquals } from '@nucypher/shared';
import { USER_ADDRESS_PARAM } from './const';
const ERR_INVALID_CONDITION = (error) => `Invalid condition: ${JSON.stringify(error.issues)}`;
export class Condition {
    schema;
    value;
    constructor(schema, value) {
        this.schema = schema;
        this.value = value;
        const { data, error } = Condition.validate(schema, value);
        if (error) {
            throw new Error(ERR_INVALID_CONDITION(error));
        }
        this.value = data;
    }
    static validate(schema, value) {
        const result = schema.safeParse(value);
        if (result.success) {
            return { data: result.data };
        }
        return { error: result.error };
    }
    requiresSigner() {
        return JSON.stringify(this.value).includes(USER_ADDRESS_PARAM);
    }
    toObj() {
        const { data, error } = Condition.validate(this.schema, this.value);
        if (error) {
            throw new Error(ERR_INVALID_CONDITION(error));
        }
        return data;
    }
    equals(other) {
        return objectEquals(this.toObj(), other.toObj());
    }
}
//# sourceMappingURL=condition.js.map
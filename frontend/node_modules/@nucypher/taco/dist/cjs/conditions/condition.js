"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
const shared_1 = require("@nucypher/shared");
const const_1 = require("./const");
const ERR_INVALID_CONDITION = (error) => `Invalid condition: ${JSON.stringify(error.issues)}`;
class Condition {
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
        return JSON.stringify(this.value).includes(const_1.USER_ADDRESS_PARAM);
    }
    toObj() {
        const { data, error } = Condition.validate(this.schema, this.value);
        if (error) {
            throw new Error(ERR_INVALID_CONDITION(error));
        }
        return data;
    }
    equals(other) {
        return (0, shared_1.objectEquals)(this.toObj(), other.toObj());
    }
}
exports.Condition = Condition;
//# sourceMappingURL=condition.js.map
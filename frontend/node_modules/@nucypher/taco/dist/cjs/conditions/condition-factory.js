"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionFactory = void 0;
const contract_1 = require("./base/contract");
const rpc_1 = require("./base/rpc");
const time_1 = require("./base/time");
const compound_condition_1 = require("./compound-condition");
const ERR_INVALID_CONDITION_TYPE = (type) => `Invalid condition type: ${type}`;
class ConditionFactory {
    static conditionFromProps(props) {
        switch (props.conditionType) {
            case rpc_1.RpcConditionType:
                return new rpc_1.RpcCondition(props);
            case time_1.TimeConditionType:
                return new time_1.TimeCondition(props);
            case contract_1.ContractConditionType:
                return new contract_1.ContractCondition(props);
            case compound_condition_1.CompoundConditionType:
                return new compound_condition_1.CompoundCondition(props);
            default:
                throw new Error(ERR_INVALID_CONDITION_TYPE(props.conditionType));
        }
    }
}
exports.ConditionFactory = ConditionFactory;
//# sourceMappingURL=condition-factory.js.map
import { ContractCondition, ContractConditionType, } from './base/contract';
import { RpcCondition, RpcConditionType } from './base/rpc';
import { TimeCondition, TimeConditionType, } from './base/time';
import { CompoundCondition, CompoundConditionType, } from './compound-condition';
const ERR_INVALID_CONDITION_TYPE = (type) => `Invalid condition type: ${type}`;
export class ConditionFactory {
    static conditionFromProps(props) {
        switch (props.conditionType) {
            case RpcConditionType:
                return new RpcCondition(props);
            case TimeConditionType:
                return new TimeCondition(props);
            case ContractConditionType:
                return new ContractCondition(props);
            case CompoundConditionType:
                return new CompoundCondition(props);
            default:
                throw new Error(ERR_INVALID_CONDITION_TYPE(props.conditionType));
        }
    }
}
//# sourceMappingURL=condition-factory.js.map
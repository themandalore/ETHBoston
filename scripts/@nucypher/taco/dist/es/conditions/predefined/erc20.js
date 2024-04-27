import { ContractCondition, ContractConditionType, } from '../base/contract';
import { USER_ADDRESS_PARAM } from '../const';
const ERC20BalanceDefaults = {
    conditionType: ContractConditionType,
    method: 'balanceOf',
    parameters: [USER_ADDRESS_PARAM],
    standardContractType: 'ERC20',
};
export class ERC20Balance extends ContractCondition {
    constructor(value) {
        super({ ...ERC20BalanceDefaults, ...value });
    }
}
//# sourceMappingURL=erc20.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20Balance = void 0;
const contract_1 = require("../base/contract");
const const_1 = require("../const");
const ERC20BalanceDefaults = {
    conditionType: contract_1.ContractConditionType,
    method: 'balanceOf',
    parameters: [const_1.USER_ADDRESS_PARAM],
    standardContractType: 'ERC20',
};
class ERC20Balance extends contract_1.ContractCondition {
    constructor(value) {
        super({ ...ERC20BalanceDefaults, ...value });
    }
}
exports.ERC20Balance = ERC20Balance;
//# sourceMappingURL=erc20.js.map
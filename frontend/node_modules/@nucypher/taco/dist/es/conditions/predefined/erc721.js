import { ContractCondition, ContractConditionType, } from '../base/contract';
import { USER_ADDRESS_PARAM } from '../const';
const ERC721OwnershipDefaults = {
    conditionType: ContractConditionType,
    method: 'ownerOf',
    standardContractType: 'ERC721',
    returnValueTest: {
        comparator: '==',
        value: USER_ADDRESS_PARAM,
    },
};
export class ERC721Ownership extends ContractCondition {
    constructor(value) {
        super({ ...ERC721OwnershipDefaults, ...value });
    }
}
const ERC721BalanceDefaults = {
    conditionType: ContractConditionType,
    method: 'balanceOf',
    parameters: [USER_ADDRESS_PARAM],
    standardContractType: 'ERC721',
};
export class ERC721Balance extends ContractCondition {
    constructor(value) {
        super({ ...ERC721BalanceDefaults, ...value });
    }
}
//# sourceMappingURL=erc721.js.map
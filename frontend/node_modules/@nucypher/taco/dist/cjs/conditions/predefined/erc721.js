"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721Balance = exports.ERC721Ownership = void 0;
const contract_1 = require("../base/contract");
const const_1 = require("../const");
const ERC721OwnershipDefaults = {
    conditionType: contract_1.ContractConditionType,
    method: 'ownerOf',
    standardContractType: 'ERC721',
    returnValueTest: {
        comparator: '==',
        value: const_1.USER_ADDRESS_PARAM,
    },
};
class ERC721Ownership extends contract_1.ContractCondition {
    constructor(value) {
        super({ ...ERC721OwnershipDefaults, ...value });
    }
}
exports.ERC721Ownership = ERC721Ownership;
const ERC721BalanceDefaults = {
    conditionType: contract_1.ContractConditionType,
    method: 'balanceOf',
    parameters: [const_1.USER_ADDRESS_PARAM],
    standardContractType: 'ERC721',
};
class ERC721Balance extends contract_1.ContractCondition {
    constructor(value) {
        super({ ...ERC721BalanceDefaults, ...value });
    }
}
exports.ERC721Balance = ERC721Balance;
//# sourceMappingURL=erc721.js.map
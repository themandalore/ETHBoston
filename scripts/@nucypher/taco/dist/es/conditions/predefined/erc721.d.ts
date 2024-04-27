import { ContractCondition, ContractConditionProps } from '../base/contract';
type ERC721OwnershipFields = 'contractAddress' | 'chain' | 'parameters';
export declare class ERC721Ownership extends ContractCondition {
    constructor(value: Pick<ContractConditionProps, ERC721OwnershipFields>);
}
type ERC721BalanceFields = 'contractAddress' | 'chain' | 'returnValueTest';
export declare class ERC721Balance extends ContractCondition {
    constructor(value: Pick<ContractConditionProps, ERC721BalanceFields>);
}
export {};

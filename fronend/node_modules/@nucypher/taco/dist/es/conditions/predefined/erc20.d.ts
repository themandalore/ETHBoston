import { ContractCondition, ContractConditionProps } from '../base/contract';
type ERC20BalanceFields = 'contractAddress' | 'chain' | 'returnValueTest';
export declare class ERC20Balance extends ContractCondition {
    constructor(value: Pick<ContractConditionProps, ERC20BalanceFields>);
}
export {};

import { Conditions as WASMConditions } from '@nucypher/nucypher-core';
import { ethers } from 'ethers';
import { Condition } from './condition';
import { ConditionContext, CustomContextParam } from './context';
export type ConditionExpressionJSON = {
    version: string;
    condition: Record<string, unknown>;
};
export declare class ConditionExpression {
    readonly condition: Condition;
    readonly version: string;
    static version: string;
    constructor(condition: Condition, version?: string);
    toObj(): ConditionExpressionJSON;
    static fromObj(obj: ConditionExpressionJSON): ConditionExpression;
    toJson(): string;
    static fromJSON(json: string): ConditionExpression;
    toWASMConditions(): WASMConditions;
    static fromWASMConditions(conditions: WASMConditions): ConditionExpression;
    buildContext(provider: ethers.providers.Provider, customParameters?: Record<string, CustomContextParam>, signer?: ethers.Signer): ConditionContext;
    contextRequiresSigner(): boolean;
    equals(other: ConditionExpression): boolean;
}

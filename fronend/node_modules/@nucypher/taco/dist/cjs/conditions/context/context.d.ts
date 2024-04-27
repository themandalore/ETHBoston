import { Context, Conditions as WASMConditions } from '@nucypher/nucypher-core';
import { ethers } from 'ethers';
import { Condition } from '../condition';
import { TypedSignature } from './providers';
export type CustomContextParam = string | number | boolean;
export type ContextParam = CustomContextParam | TypedSignature;
export declare class ConditionContext {
    private readonly provider;
    private readonly condition;
    readonly customParameters: Record<string, CustomContextParam>;
    private readonly signer?;
    private readonly walletAuthProvider?;
    constructor(provider: ethers.providers.Provider, condition: Condition, customParameters?: Record<string, CustomContextParam>, signer?: ethers.Signer | undefined);
    private validate;
    toObj: () => Promise<Record<string, ContextParam>>;
    private fillContextParameters;
    private isContextParameter;
    private findRequestedParameters;
    toJson(): Promise<string>;
    withCustomParams(params: Record<string, CustomContextParam>): ConditionContext;
    toWASMContext(): Promise<Context>;
    static fromConditions(provider: ethers.providers.Provider, conditions: WASMConditions, signer?: ethers.Signer, customParameters?: Record<string, CustomContextParam>): ConditionContext;
}

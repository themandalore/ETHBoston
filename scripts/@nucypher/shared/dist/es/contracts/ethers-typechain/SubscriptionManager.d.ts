import type { EventFragment, FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { OnEvent, TypedEvent, TypedEventFilter, TypedListener } from './common';
export declare namespace SubscriptionManager {
    type PolicyStruct = {
        sponsor: string;
        startTimestamp: BigNumberish;
        endTimestamp: BigNumberish;
        size: BigNumberish;
        owner: string;
    };
    type PolicyStructOutput = [string, number, number, number, string] & {
        sponsor: string;
        startTimestamp: number;
        endTimestamp: number;
        size: number;
        owner: string;
    };
}
export interface SubscriptionManagerInterface extends utils.Interface {
    functions: {
        'DEFAULT_ADMIN_ROLE()': FunctionFragment;
        'SET_RATE_ROLE()': FunctionFragment;
        'WITHDRAW_ROLE()': FunctionFragment;
        'createPolicy(bytes16,address,uint16,uint32,uint32)': FunctionFragment;
        'feeRate()': FunctionFragment;
        'getPolicy(bytes16)': FunctionFragment;
        'getPolicyCost(uint16,uint32,uint32)': FunctionFragment;
        'getRoleAdmin(bytes32)': FunctionFragment;
        'grantRole(bytes32,address)': FunctionFragment;
        'hasRole(bytes32,address)': FunctionFragment;
        'initialize(uint256)': FunctionFragment;
        'isPolicyActive(bytes16)': FunctionFragment;
        'renounceRole(bytes32,address)': FunctionFragment;
        'revokeRole(bytes32,address)': FunctionFragment;
        'setFeeRate(uint256)': FunctionFragment;
        'supportsInterface(bytes4)': FunctionFragment;
        'sweep(address)': FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: 'DEFAULT_ADMIN_ROLE' | 'SET_RATE_ROLE' | 'WITHDRAW_ROLE' | 'createPolicy' | 'feeRate' | 'getPolicy' | 'getPolicyCost' | 'getRoleAdmin' | 'grantRole' | 'hasRole' | 'initialize' | 'isPolicyActive' | 'renounceRole' | 'revokeRole' | 'setFeeRate' | 'supportsInterface' | 'sweep'): FunctionFragment;
    encodeFunctionData(functionFragment: 'DEFAULT_ADMIN_ROLE', values?: undefined): string;
    encodeFunctionData(functionFragment: 'SET_RATE_ROLE', values?: undefined): string;
    encodeFunctionData(functionFragment: 'WITHDRAW_ROLE', values?: undefined): string;
    encodeFunctionData(functionFragment: 'createPolicy', values: [BytesLike, string, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: 'feeRate', values?: undefined): string;
    encodeFunctionData(functionFragment: 'getPolicy', values: [BytesLike]): string;
    encodeFunctionData(functionFragment: 'getPolicyCost', values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getRoleAdmin', values: [BytesLike]): string;
    encodeFunctionData(functionFragment: 'grantRole', values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: 'hasRole', values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: 'initialize', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'isPolicyActive', values: [BytesLike]): string;
    encodeFunctionData(functionFragment: 'renounceRole', values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: 'revokeRole', values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: 'setFeeRate', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string;
    encodeFunctionData(functionFragment: 'sweep', values: [string]): string;
    decodeFunctionResult(functionFragment: 'DEFAULT_ADMIN_ROLE', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'SET_RATE_ROLE', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'WITHDRAW_ROLE', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'createPolicy', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'feeRate', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getPolicy', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getPolicyCost', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getRoleAdmin', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'grantRole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'hasRole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isPolicyActive', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'renounceRole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'revokeRole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setFeeRate', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'sweep', data: BytesLike): Result;
    events: {
        'FeeRateUpdated(uint256,uint256)': EventFragment;
        'PolicyCreated(bytes16,address,address,uint16,uint32,uint32,uint256)': EventFragment;
        'RoleAdminChanged(bytes32,bytes32,bytes32)': EventFragment;
        'RoleGranted(bytes32,address,address)': EventFragment;
        'RoleRevoked(bytes32,address,address)': EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: 'FeeRateUpdated'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'PolicyCreated'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RoleAdminChanged'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RoleGranted'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RoleRevoked'): EventFragment;
}
export interface FeeRateUpdatedEventObject {
    oldFeeRate: BigNumber;
    newFeeRate: BigNumber;
}
export type FeeRateUpdatedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], FeeRateUpdatedEventObject>;
export type FeeRateUpdatedEventFilter = TypedEventFilter<FeeRateUpdatedEvent>;
export interface PolicyCreatedEventObject {
    policyId: string;
    sponsor: string;
    owner: string;
    size: number;
    startTimestamp: number;
    endTimestamp: number;
    cost: BigNumber;
}
export type PolicyCreatedEvent = TypedEvent<[
    string,
    string,
    string,
    number,
    number,
    number,
    BigNumber
], PolicyCreatedEventObject>;
export type PolicyCreatedEventFilter = TypedEventFilter<PolicyCreatedEvent>;
export interface RoleAdminChangedEventObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], RoleAdminChangedEventObject>;
export type RoleAdminChangedEventFilter = TypedEventFilter<RoleAdminChangedEvent>;
export interface RoleGrantedEventObject {
    role: string;
    account: string;
    sender: string;
}
export type RoleGrantedEvent = TypedEvent<[
    string,
    string,
    string
], RoleGrantedEventObject>;
export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;
export interface RoleRevokedEventObject {
    role: string;
    account: string;
    sender: string;
}
export type RoleRevokedEvent = TypedEvent<[
    string,
    string,
    string
], RoleRevokedEventObject>;
export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;
export interface SubscriptionManager extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SubscriptionManagerInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        SET_RATE_ROLE(overrides?: CallOverrides): Promise<[string]>;
        WITHDRAW_ROLE(overrides?: CallOverrides): Promise<[string]>;
        createPolicy(_policyId: BytesLike, _policyOwner: string, _size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        feeRate(overrides?: CallOverrides): Promise<[BigNumber]>;
        getPolicy(_policyID: BytesLike, overrides?: CallOverrides): Promise<[SubscriptionManager.PolicyStructOutput]>;
        getPolicyCost(_size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(_feeRate: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        isPolicyActive(_policyID: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setFeeRate(_ratePerSecond: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        sweep(recipient: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
    };
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    SET_RATE_ROLE(overrides?: CallOverrides): Promise<string>;
    WITHDRAW_ROLE(overrides?: CallOverrides): Promise<string>;
    createPolicy(_policyId: BytesLike, _policyOwner: string, _size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    feeRate(overrides?: CallOverrides): Promise<BigNumber>;
    getPolicy(_policyID: BytesLike, overrides?: CallOverrides): Promise<SubscriptionManager.PolicyStructOutput>;
    getPolicyCost(_size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
    grantRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
    initialize(_feeRate: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    isPolicyActive(_policyID: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setFeeRate(_ratePerSecond: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    sweep(recipient: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    callStatic: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        SET_RATE_ROLE(overrides?: CallOverrides): Promise<string>;
        WITHDRAW_ROLE(overrides?: CallOverrides): Promise<string>;
        createPolicy(_policyId: BytesLike, _policyOwner: string, _size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: CallOverrides): Promise<void>;
        feeRate(overrides?: CallOverrides): Promise<BigNumber>;
        getPolicy(_policyID: BytesLike, overrides?: CallOverrides): Promise<SubscriptionManager.PolicyStructOutput>;
        getPolicyCost(_size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
        grantRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
        initialize(_feeRate: BigNumberish, overrides?: CallOverrides): Promise<void>;
        isPolicyActive(_policyID: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        setFeeRate(_ratePerSecond: BigNumberish, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        sweep(recipient: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        'FeeRateUpdated(uint256,uint256)'(oldFeeRate?: null, newFeeRate?: null): FeeRateUpdatedEventFilter;
        FeeRateUpdated(oldFeeRate?: null, newFeeRate?: null): FeeRateUpdatedEventFilter;
        'PolicyCreated(bytes16,address,address,uint16,uint32,uint32,uint256)'(policyId?: BytesLike | null, sponsor?: string | null, owner?: string | null, size?: null, startTimestamp?: null, endTimestamp?: null, cost?: null): PolicyCreatedEventFilter;
        PolicyCreated(policyId?: BytesLike | null, sponsor?: string | null, owner?: string | null, size?: null, startTimestamp?: null, endTimestamp?: null, cost?: null): PolicyCreatedEventFilter;
        'RoleAdminChanged(bytes32,bytes32,bytes32)'(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        'RoleGranted(bytes32,address,address)'(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        RoleGranted(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        'RoleRevoked(bytes32,address,address)'(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        RoleRevoked(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
    };
    estimateGas: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        SET_RATE_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        WITHDRAW_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        createPolicy(_policyId: BytesLike, _policyOwner: string, _size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
        feeRate(overrides?: CallOverrides): Promise<BigNumber>;
        getPolicy(_policyID: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getPolicyCost(_size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(_feeRate: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        isPolicyActive(_policyID: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setFeeRate(_ratePerSecond: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        sweep(recipient: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        SET_RATE_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        WITHDRAW_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createPolicy(_policyId: BytesLike, _policyOwner: string, _size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        feeRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPolicy(_policyID: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPolicyCost(_size: BigNumberish, _startTimestamp: BigNumberish, _endTimestamp: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(_feeRate: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        isPolicyActive(_policyID: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setFeeRate(_ratePerSecond: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sweep(recipient: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
    };
}

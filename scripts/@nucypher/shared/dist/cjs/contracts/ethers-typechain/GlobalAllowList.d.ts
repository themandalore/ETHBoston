import type { EventFragment, FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { OnEvent, TypedEvent, TypedEventFilter, TypedListener } from './common';
export interface GlobalAllowListInterface extends utils.Interface {
    functions: {
        'authorize(uint32,address[])': FunctionFragment;
        'coordinator()': FunctionFragment;
        'deauthorize(uint32,address[])': FunctionFragment;
        'isAddressAuthorized(uint32,address)': FunctionFragment;
        'isAuthorized(uint32,bytes,bytes)': FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: 'authorize' | 'coordinator' | 'deauthorize' | 'isAddressAuthorized' | 'isAuthorized'): FunctionFragment;
    encodeFunctionData(functionFragment: 'authorize', values: [BigNumberish, string[]]): string;
    encodeFunctionData(functionFragment: 'coordinator', values?: undefined): string;
    encodeFunctionData(functionFragment: 'deauthorize', values: [BigNumberish, string[]]): string;
    encodeFunctionData(functionFragment: 'isAddressAuthorized', values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: 'isAuthorized', values: [BigNumberish, BytesLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: 'authorize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'coordinator', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'deauthorize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isAddressAuthorized', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isAuthorized', data: BytesLike): Result;
    events: {
        'AddressAuthorizationSet(uint32,address,bool)': EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: 'AddressAuthorizationSet'): EventFragment;
}
export interface AddressAuthorizationSetEventObject {
    ritualId: number;
    _address: string;
    isAuthorized: boolean;
}
export type AddressAuthorizationSetEvent = TypedEvent<[
    number,
    string,
    boolean
], AddressAuthorizationSetEventObject>;
export type AddressAuthorizationSetEventFilter = TypedEventFilter<AddressAuthorizationSetEvent>;
export interface GlobalAllowList extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: GlobalAllowListInterface;
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
        authorize(ritualId: BigNumberish, addresses: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        coordinator(overrides?: CallOverrides): Promise<[string]>;
        deauthorize(ritualId: BigNumberish, addresses: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        isAddressAuthorized(ritualId: BigNumberish, encryptor: string, overrides?: CallOverrides): Promise<[boolean]>;
        isAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
    };
    authorize(ritualId: BigNumberish, addresses: string[], overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    coordinator(overrides?: CallOverrides): Promise<string>;
    deauthorize(ritualId: BigNumberish, addresses: string[], overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    isAddressAuthorized(ritualId: BigNumberish, encryptor: string, overrides?: CallOverrides): Promise<boolean>;
    isAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        authorize(ritualId: BigNumberish, addresses: string[], overrides?: CallOverrides): Promise<void>;
        coordinator(overrides?: CallOverrides): Promise<string>;
        deauthorize(ritualId: BigNumberish, addresses: string[], overrides?: CallOverrides): Promise<void>;
        isAddressAuthorized(ritualId: BigNumberish, encryptor: string, overrides?: CallOverrides): Promise<boolean>;
        isAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        'AddressAuthorizationSet(uint32,address,bool)'(ritualId?: BigNumberish | null, _address?: string | null, isAuthorized?: null): AddressAuthorizationSetEventFilter;
        AddressAuthorizationSet(ritualId?: BigNumberish | null, _address?: string | null, isAuthorized?: null): AddressAuthorizationSetEventFilter;
    };
    estimateGas: {
        authorize(ritualId: BigNumberish, addresses: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        coordinator(overrides?: CallOverrides): Promise<BigNumber>;
        deauthorize(ritualId: BigNumberish, addresses: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        isAddressAuthorized(ritualId: BigNumberish, encryptor: string, overrides?: CallOverrides): Promise<BigNumber>;
        isAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        authorize(ritualId: BigNumberish, addresses: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        coordinator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deauthorize(ritualId: BigNumberish, addresses: string[], overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        isAddressAuthorized(ritualId: BigNumberish, encryptor: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}

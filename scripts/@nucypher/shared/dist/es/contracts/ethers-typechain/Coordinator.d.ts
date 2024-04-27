import type { EventFragment, FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { OnEvent, TypedEvent, TypedEventFilter, TypedListener } from './common';
export declare namespace BLS12381 {
    type G2PointStruct = {
        word0: BytesLike;
        word1: BytesLike;
        word2: BytesLike;
    };
    type G2PointStructOutput = [string, string, string] & {
        word0: string;
        word1: string;
        word2: string;
    };
    type G1PointStruct = {
        word0: BytesLike;
        word1: BytesLike;
    };
    type G1PointStructOutput = [string, string] & {
        word0: string;
        word1: string;
    };
}
export declare namespace Coordinator {
    type ParticipantStruct = {
        provider: string;
        aggregated: boolean;
        transcript: BytesLike;
        decryptionRequestStaticKey: BytesLike;
    };
    type ParticipantStructOutput = [string, boolean, string, string] & {
        provider: string;
        aggregated: boolean;
        transcript: string;
        decryptionRequestStaticKey: string;
    };
}
export interface CoordinatorInterface extends utils.Interface {
    functions: {
        'DEFAULT_ADMIN_ROLE()': FunctionFragment;
        'INITIATOR_ROLE()': FunctionFragment;
        'TREASURY_ROLE()': FunctionFragment;
        'acceptDefaultAdminTransfer()': FunctionFragment;
        'application()': FunctionFragment;
        'beginDefaultAdminTransfer(address)': FunctionFragment;
        'cancelDefaultAdminTransfer()': FunctionFragment;
        'changeDefaultAdminDelay(uint48)': FunctionFragment;
        'cohortFingerprint(address[])': FunctionFragment;
        'currency()': FunctionFragment;
        'defaultAdmin()': FunctionFragment;
        'defaultAdminDelay()': FunctionFragment;
        'defaultAdminDelayIncreaseWait()': FunctionFragment;
        'feeDeduction(uint256,uint256)': FunctionFragment;
        'feeRatePerSecond()': FunctionFragment;
        'getAuthority(uint32)': FunctionFragment;
        'getParticipant(uint32,address,bool)': FunctionFragment;
        'getParticipantFromProvider(uint32,address)': FunctionFragment;
        'getParticipants(uint32)': FunctionFragment;
        'getParticipants(uint32,uint256,uint256,bool)': FunctionFragment;
        'getProviderPublicKey(address,uint256)': FunctionFragment;
        'getProviders(uint32)': FunctionFragment;
        'getPublicKeyFromRitualId(uint32)': FunctionFragment;
        'getRitualIdFromPublicKey((bytes32,bytes16))': FunctionFragment;
        'getRitualInitiationCost(address[],uint32)': FunctionFragment;
        'getRitualState(uint32)': FunctionFragment;
        'getRoleAdmin(bytes32)': FunctionFragment;
        'getThresholdForRitualSize(uint16)': FunctionFragment;
        'grantRole(bytes32,address)': FunctionFragment;
        'hasRole(bytes32,address)': FunctionFragment;
        'initialize(uint32,uint16,address)': FunctionFragment;
        'initiateRitual(address[],address,uint32,address)': FunctionFragment;
        'isEncryptionAuthorized(uint32,bytes,bytes)': FunctionFragment;
        'isInitiationPublic()': FunctionFragment;
        'isParticipant(uint32,address)': FunctionFragment;
        'isProviderPublicKeySet(address)': FunctionFragment;
        'isRitualActive(uint32)': FunctionFragment;
        'makeInitiationPublic()': FunctionFragment;
        'maxDkgSize()': FunctionFragment;
        'numberOfRituals()': FunctionFragment;
        'owner()': FunctionFragment;
        'pendingDefaultAdmin()': FunctionFragment;
        'pendingDefaultAdminDelay()': FunctionFragment;
        'pendingFees(uint256)': FunctionFragment;
        'postAggregation(uint32,bytes,(bytes32,bytes16),bytes)': FunctionFragment;
        'postTranscript(uint32,bytes)': FunctionFragment;
        'processPendingFee(uint32)': FunctionFragment;
        'renounceRole(bytes32,address)': FunctionFragment;
        'revokeRole(bytes32,address)': FunctionFragment;
        'rituals(uint256)': FunctionFragment;
        'rollbackDefaultAdminDelay()': FunctionFragment;
        'setMaxDkgSize(uint16)': FunctionFragment;
        'setProviderPublicKey((bytes32,bytes32,bytes32))': FunctionFragment;
        'setReimbursementPool(address)': FunctionFragment;
        'setTimeout(uint32)': FunctionFragment;
        'supportsInterface(bytes4)': FunctionFragment;
        'timeout()': FunctionFragment;
        'totalPendingFees()': FunctionFragment;
        'transferRitualAuthority(uint32,address)': FunctionFragment;
        'withdrawTokens(address,uint256)': FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: 'DEFAULT_ADMIN_ROLE' | 'INITIATOR_ROLE' | 'TREASURY_ROLE' | 'acceptDefaultAdminTransfer' | 'application' | 'beginDefaultAdminTransfer' | 'cancelDefaultAdminTransfer' | 'changeDefaultAdminDelay' | 'cohortFingerprint' | 'currency' | 'defaultAdmin' | 'defaultAdminDelay' | 'defaultAdminDelayIncreaseWait' | 'feeDeduction' | 'feeRatePerSecond' | 'getAuthority' | 'getParticipant' | 'getParticipantFromProvider' | 'getParticipants(uint32)' | 'getParticipants(uint32,uint256,uint256,bool)' | 'getProviderPublicKey' | 'getProviders' | 'getPublicKeyFromRitualId' | 'getRitualIdFromPublicKey' | 'getRitualInitiationCost' | 'getRitualState' | 'getRoleAdmin' | 'getThresholdForRitualSize' | 'grantRole' | 'hasRole' | 'initialize' | 'initiateRitual' | 'isEncryptionAuthorized' | 'isInitiationPublic' | 'isParticipant' | 'isProviderPublicKeySet' | 'isRitualActive' | 'makeInitiationPublic' | 'maxDkgSize' | 'numberOfRituals' | 'owner' | 'pendingDefaultAdmin' | 'pendingDefaultAdminDelay' | 'pendingFees' | 'postAggregation' | 'postTranscript' | 'processPendingFee' | 'renounceRole' | 'revokeRole' | 'rituals' | 'rollbackDefaultAdminDelay' | 'setMaxDkgSize' | 'setProviderPublicKey' | 'setReimbursementPool' | 'setTimeout' | 'supportsInterface' | 'timeout' | 'totalPendingFees' | 'transferRitualAuthority' | 'withdrawTokens'): FunctionFragment;
    encodeFunctionData(functionFragment: 'DEFAULT_ADMIN_ROLE', values?: undefined): string;
    encodeFunctionData(functionFragment: 'INITIATOR_ROLE', values?: undefined): string;
    encodeFunctionData(functionFragment: 'TREASURY_ROLE', values?: undefined): string;
    encodeFunctionData(functionFragment: 'acceptDefaultAdminTransfer', values?: undefined): string;
    encodeFunctionData(functionFragment: 'application', values?: undefined): string;
    encodeFunctionData(functionFragment: 'beginDefaultAdminTransfer', values: [string]): string;
    encodeFunctionData(functionFragment: 'cancelDefaultAdminTransfer', values?: undefined): string;
    encodeFunctionData(functionFragment: 'changeDefaultAdminDelay', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'cohortFingerprint', values: [string[]]): string;
    encodeFunctionData(functionFragment: 'currency', values?: undefined): string;
    encodeFunctionData(functionFragment: 'defaultAdmin', values?: undefined): string;
    encodeFunctionData(functionFragment: 'defaultAdminDelay', values?: undefined): string;
    encodeFunctionData(functionFragment: 'defaultAdminDelayIncreaseWait', values?: undefined): string;
    encodeFunctionData(functionFragment: 'feeDeduction', values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: 'feeRatePerSecond', values?: undefined): string;
    encodeFunctionData(functionFragment: 'getAuthority', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getParticipant', values: [BigNumberish, string, boolean]): string;
    encodeFunctionData(functionFragment: 'getParticipantFromProvider', values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: 'getParticipants(uint32)', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getParticipants(uint32,uint256,uint256,bool)', values: [BigNumberish, BigNumberish, BigNumberish, boolean]): string;
    encodeFunctionData(functionFragment: 'getProviderPublicKey', values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getProviders', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getPublicKeyFromRitualId', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getRitualIdFromPublicKey', values: [BLS12381.G1PointStruct]): string;
    encodeFunctionData(functionFragment: 'getRitualInitiationCost', values: [string[], BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getRitualState', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'getRoleAdmin', values: [BytesLike]): string;
    encodeFunctionData(functionFragment: 'getThresholdForRitualSize', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'grantRole', values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: 'hasRole', values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: 'initialize', values: [BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: 'initiateRitual', values: [string[], string, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: 'isEncryptionAuthorized', values: [BigNumberish, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: 'isInitiationPublic', values?: undefined): string;
    encodeFunctionData(functionFragment: 'isParticipant', values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: 'isProviderPublicKeySet', values: [string]): string;
    encodeFunctionData(functionFragment: 'isRitualActive', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'makeInitiationPublic', values?: undefined): string;
    encodeFunctionData(functionFragment: 'maxDkgSize', values?: undefined): string;
    encodeFunctionData(functionFragment: 'numberOfRituals', values?: undefined): string;
    encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pendingDefaultAdmin', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pendingDefaultAdminDelay', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pendingFees', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'postAggregation', values: [BigNumberish, BytesLike, BLS12381.G1PointStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: 'postTranscript', values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: 'processPendingFee', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'renounceRole', values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: 'revokeRole', values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: 'rituals', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'rollbackDefaultAdminDelay', values?: undefined): string;
    encodeFunctionData(functionFragment: 'setMaxDkgSize', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'setProviderPublicKey', values: [BLS12381.G2PointStruct]): string;
    encodeFunctionData(functionFragment: 'setReimbursementPool', values: [string]): string;
    encodeFunctionData(functionFragment: 'setTimeout', values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string;
    encodeFunctionData(functionFragment: 'timeout', values?: undefined): string;
    encodeFunctionData(functionFragment: 'totalPendingFees', values?: undefined): string;
    encodeFunctionData(functionFragment: 'transferRitualAuthority', values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: 'withdrawTokens', values: [string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: 'DEFAULT_ADMIN_ROLE', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'INITIATOR_ROLE', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'TREASURY_ROLE', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'acceptDefaultAdminTransfer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'application', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'beginDefaultAdminTransfer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'cancelDefaultAdminTransfer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'changeDefaultAdminDelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'cohortFingerprint', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'currency', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'defaultAdmin', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'defaultAdminDelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'defaultAdminDelayIncreaseWait', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'feeDeduction', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'feeRatePerSecond', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getAuthority', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getParticipant', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getParticipantFromProvider', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getParticipants(uint32)', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getParticipants(uint32,uint256,uint256,bool)', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getProviderPublicKey', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getProviders', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getPublicKeyFromRitualId', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getRitualIdFromPublicKey', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getRitualInitiationCost', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getRitualState', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getRoleAdmin', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getThresholdForRitualSize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'grantRole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'hasRole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'initiateRitual', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isEncryptionAuthorized', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isInitiationPublic', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isParticipant', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isProviderPublicKeySet', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isRitualActive', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'makeInitiationPublic', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'maxDkgSize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'numberOfRituals', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pendingDefaultAdmin', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pendingDefaultAdminDelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pendingFees', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'postAggregation', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'postTranscript', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'processPendingFee', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'renounceRole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'revokeRole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'rituals', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'rollbackDefaultAdminDelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setMaxDkgSize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setProviderPublicKey', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setReimbursementPool', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setTimeout', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'timeout', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'totalPendingFees', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transferRitualAuthority', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'withdrawTokens', data: BytesLike): Result;
    events: {
        'AggregationPosted(uint32,address,bytes32)': EventFragment;
        'DefaultAdminDelayChangeCanceled()': EventFragment;
        'DefaultAdminDelayChangeScheduled(uint48,uint48)': EventFragment;
        'DefaultAdminTransferCanceled()': EventFragment;
        'DefaultAdminTransferScheduled(address,uint48)': EventFragment;
        'EndRitual(uint32,bool)': EventFragment;
        'Initialized(uint64)': EventFragment;
        'MaxDkgSizeChanged(uint16,uint16)': EventFragment;
        'ParticipantPublicKeySet(uint32,address,(bytes32,bytes32,bytes32))': EventFragment;
        'ReimbursementPoolSet(address)': EventFragment;
        'RitualAuthorityTransferred(uint32,address,address)': EventFragment;
        'RoleAdminChanged(bytes32,bytes32,bytes32)': EventFragment;
        'RoleGranted(bytes32,address,address)': EventFragment;
        'RoleRevoked(bytes32,address,address)': EventFragment;
        'StartAggregationRound(uint32)': EventFragment;
        'StartRitual(uint32,address,address[])': EventFragment;
        'TimeoutChanged(uint32,uint32)': EventFragment;
        'TranscriptPosted(uint32,address,bytes32)': EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: 'AggregationPosted'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'DefaultAdminDelayChangeCanceled'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'DefaultAdminDelayChangeScheduled'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'DefaultAdminTransferCanceled'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'DefaultAdminTransferScheduled'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'EndRitual'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Initialized'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'MaxDkgSizeChanged'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'ParticipantPublicKeySet'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'ReimbursementPoolSet'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RitualAuthorityTransferred'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RoleAdminChanged'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RoleGranted'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RoleRevoked'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'StartAggregationRound'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'StartRitual'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'TimeoutChanged'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'TranscriptPosted'): EventFragment;
}
export interface AggregationPostedEventObject {
    ritualId: number;
    node: string;
    aggregatedTranscriptDigest: string;
}
export type AggregationPostedEvent = TypedEvent<[
    number,
    string,
    string
], AggregationPostedEventObject>;
export type AggregationPostedEventFilter = TypedEventFilter<AggregationPostedEvent>;
export interface DefaultAdminDelayChangeCanceledEventObject {
}
export type DefaultAdminDelayChangeCanceledEvent = TypedEvent<[
], DefaultAdminDelayChangeCanceledEventObject>;
export type DefaultAdminDelayChangeCanceledEventFilter = TypedEventFilter<DefaultAdminDelayChangeCanceledEvent>;
export interface DefaultAdminDelayChangeScheduledEventObject {
    newDelay: number;
    effectSchedule: number;
}
export type DefaultAdminDelayChangeScheduledEvent = TypedEvent<[
    number,
    number
], DefaultAdminDelayChangeScheduledEventObject>;
export type DefaultAdminDelayChangeScheduledEventFilter = TypedEventFilter<DefaultAdminDelayChangeScheduledEvent>;
export interface DefaultAdminTransferCanceledEventObject {
}
export type DefaultAdminTransferCanceledEvent = TypedEvent<[
], DefaultAdminTransferCanceledEventObject>;
export type DefaultAdminTransferCanceledEventFilter = TypedEventFilter<DefaultAdminTransferCanceledEvent>;
export interface DefaultAdminTransferScheduledEventObject {
    newAdmin: string;
    acceptSchedule: number;
}
export type DefaultAdminTransferScheduledEvent = TypedEvent<[
    string,
    number
], DefaultAdminTransferScheduledEventObject>;
export type DefaultAdminTransferScheduledEventFilter = TypedEventFilter<DefaultAdminTransferScheduledEvent>;
export interface EndRitualEventObject {
    ritualId: number;
    successful: boolean;
}
export type EndRitualEvent = TypedEvent<[
    number,
    boolean
], EndRitualEventObject>;
export type EndRitualEventFilter = TypedEventFilter<EndRitualEvent>;
export interface InitializedEventObject {
    version: BigNumber;
}
export type InitializedEvent = TypedEvent<[BigNumber], InitializedEventObject>;
export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface MaxDkgSizeChangedEventObject {
    oldSize: number;
    newSize: number;
}
export type MaxDkgSizeChangedEvent = TypedEvent<[
    number,
    number
], MaxDkgSizeChangedEventObject>;
export type MaxDkgSizeChangedEventFilter = TypedEventFilter<MaxDkgSizeChangedEvent>;
export interface ParticipantPublicKeySetEventObject {
    ritualId: number;
    participant: string;
    publicKey: BLS12381.G2PointStructOutput;
}
export type ParticipantPublicKeySetEvent = TypedEvent<[
    number,
    string,
    BLS12381.G2PointStructOutput
], ParticipantPublicKeySetEventObject>;
export type ParticipantPublicKeySetEventFilter = TypedEventFilter<ParticipantPublicKeySetEvent>;
export interface ReimbursementPoolSetEventObject {
    pool: string;
}
export type ReimbursementPoolSetEvent = TypedEvent<[
    string
], ReimbursementPoolSetEventObject>;
export type ReimbursementPoolSetEventFilter = TypedEventFilter<ReimbursementPoolSetEvent>;
export interface RitualAuthorityTransferredEventObject {
    ritualId: number;
    previousAuthority: string;
    newAuthority: string;
}
export type RitualAuthorityTransferredEvent = TypedEvent<[
    number,
    string,
    string
], RitualAuthorityTransferredEventObject>;
export type RitualAuthorityTransferredEventFilter = TypedEventFilter<RitualAuthorityTransferredEvent>;
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
export interface StartAggregationRoundEventObject {
    ritualId: number;
}
export type StartAggregationRoundEvent = TypedEvent<[
    number
], StartAggregationRoundEventObject>;
export type StartAggregationRoundEventFilter = TypedEventFilter<StartAggregationRoundEvent>;
export interface StartRitualEventObject {
    ritualId: number;
    authority: string;
    participants: string[];
}
export type StartRitualEvent = TypedEvent<[
    number,
    string,
    string[]
], StartRitualEventObject>;
export type StartRitualEventFilter = TypedEventFilter<StartRitualEvent>;
export interface TimeoutChangedEventObject {
    oldTimeout: number;
    newTimeout: number;
}
export type TimeoutChangedEvent = TypedEvent<[
    number,
    number
], TimeoutChangedEventObject>;
export type TimeoutChangedEventFilter = TypedEventFilter<TimeoutChangedEvent>;
export interface TranscriptPostedEventObject {
    ritualId: number;
    node: string;
    transcriptDigest: string;
}
export type TranscriptPostedEvent = TypedEvent<[
    number,
    string,
    string
], TranscriptPostedEventObject>;
export type TranscriptPostedEventFilter = TypedEventFilter<TranscriptPostedEvent>;
export interface Coordinator extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: CoordinatorInterface;
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
        INITIATOR_ROLE(overrides?: CallOverrides): Promise<[string]>;
        TREASURY_ROLE(overrides?: CallOverrides): Promise<[string]>;
        acceptDefaultAdminTransfer(overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        application(overrides?: CallOverrides): Promise<[string]>;
        beginDefaultAdminTransfer(newAdmin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        cancelDefaultAdminTransfer(overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        changeDefaultAdminDelay(newDelay: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        cohortFingerprint(nodes: string[], overrides?: CallOverrides): Promise<[string]>;
        currency(overrides?: CallOverrides): Promise<[string]>;
        defaultAdmin(overrides?: CallOverrides): Promise<[string]>;
        defaultAdminDelay(overrides?: CallOverrides): Promise<[number]>;
        defaultAdminDelayIncreaseWait(overrides?: CallOverrides): Promise<[number]>;
        feeDeduction(arg0: BigNumberish, arg1: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        feeRatePerSecond(overrides?: CallOverrides): Promise<[BigNumber]>;
        getAuthority(ritualId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        getParticipant(ritualId: BigNumberish, provider: string, transcript: boolean, overrides?: CallOverrides): Promise<[Coordinator.ParticipantStructOutput]>;
        getParticipantFromProvider(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<[Coordinator.ParticipantStructOutput]>;
        'getParticipants(uint32)'(ritualId: BigNumberish, overrides?: CallOverrides): Promise<[Coordinator.ParticipantStructOutput[]]>;
        'getParticipants(uint32,uint256,uint256,bool)'(ritualId: BigNumberish, startIndex: BigNumberish, maxParticipants: BigNumberish, includeTranscript: boolean, overrides?: CallOverrides): Promise<[Coordinator.ParticipantStructOutput[]]>;
        getProviderPublicKey(provider: string, ritualId: BigNumberish, overrides?: CallOverrides): Promise<[BLS12381.G2PointStructOutput]>;
        getProviders(ritualId: BigNumberish, overrides?: CallOverrides): Promise<[string[]]>;
        getPublicKeyFromRitualId(ritualId: BigNumberish, overrides?: CallOverrides): Promise<[BLS12381.G1PointStructOutput]>;
        getRitualIdFromPublicKey(dkgPublicKey: BLS12381.G1PointStruct, overrides?: CallOverrides): Promise<[number] & {
            ritualId: number;
        }>;
        getRitualInitiationCost(providers: string[], duration: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        getRitualState(ritualId: BigNumberish, overrides?: CallOverrides): Promise<[number]>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        getThresholdForRitualSize(size: BigNumberish, overrides?: CallOverrides): Promise<[number]>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(_timeout: BigNumberish, _maxDkgSize: BigNumberish, _admin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        initiateRitual(providers: string[], authority: string, duration: BigNumberish, accessController: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        isEncryptionAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        isInitiationPublic(overrides?: CallOverrides): Promise<[boolean]>;
        isParticipant(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<[boolean]>;
        isProviderPublicKeySet(provider: string, overrides?: CallOverrides): Promise<[boolean]>;
        isRitualActive(ritualId: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
        makeInitiationPublic(overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        maxDkgSize(overrides?: CallOverrides): Promise<[number]>;
        numberOfRituals(overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        pendingDefaultAdmin(overrides?: CallOverrides): Promise<[string, number] & {
            newAdmin: string;
            schedule: number;
        }>;
        pendingDefaultAdminDelay(overrides?: CallOverrides): Promise<[number, number] & {
            newDelay: number;
            schedule: number;
        }>;
        pendingFees(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        postAggregation(ritualId: BigNumberish, aggregatedTranscript: BytesLike, dkgPublicKey: BLS12381.G1PointStruct, decryptionRequestStaticKey: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        postTranscript(ritualId: BigNumberish, transcript: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        processPendingFee(ritualId: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        rituals(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            number,
            number,
            number,
            number,
            string,
            number,
            number,
            boolean,
            string,
            BLS12381.G1PointStructOutput,
            string
        ] & {
            initiator: string;
            initTimestamp: number;
            endTimestamp: number;
            totalTranscripts: number;
            totalAggregations: number;
            authority: string;
            dkgSize: number;
            threshold: number;
            aggregationMismatch: boolean;
            accessController: string;
            publicKey: BLS12381.G1PointStructOutput;
            aggregatedTranscript: string;
        }>;
        rollbackDefaultAdminDelay(overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setMaxDkgSize(newSize: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setProviderPublicKey(publicKey: BLS12381.G2PointStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setReimbursementPool(pool: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setTimeout(newTimeout: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        timeout(overrides?: CallOverrides): Promise<[number]>;
        totalPendingFees(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferRitualAuthority(ritualId: BigNumberish, newAuthority: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        withdrawTokens(token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
    };
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    INITIATOR_ROLE(overrides?: CallOverrides): Promise<string>;
    TREASURY_ROLE(overrides?: CallOverrides): Promise<string>;
    acceptDefaultAdminTransfer(overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    application(overrides?: CallOverrides): Promise<string>;
    beginDefaultAdminTransfer(newAdmin: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    cancelDefaultAdminTransfer(overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    changeDefaultAdminDelay(newDelay: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    cohortFingerprint(nodes: string[], overrides?: CallOverrides): Promise<string>;
    currency(overrides?: CallOverrides): Promise<string>;
    defaultAdmin(overrides?: CallOverrides): Promise<string>;
    defaultAdminDelay(overrides?: CallOverrides): Promise<number>;
    defaultAdminDelayIncreaseWait(overrides?: CallOverrides): Promise<number>;
    feeDeduction(arg0: BigNumberish, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    feeRatePerSecond(overrides?: CallOverrides): Promise<BigNumber>;
    getAuthority(ritualId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    getParticipant(ritualId: BigNumberish, provider: string, transcript: boolean, overrides?: CallOverrides): Promise<Coordinator.ParticipantStructOutput>;
    getParticipantFromProvider(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<Coordinator.ParticipantStructOutput>;
    'getParticipants(uint32)'(ritualId: BigNumberish, overrides?: CallOverrides): Promise<Coordinator.ParticipantStructOutput[]>;
    'getParticipants(uint32,uint256,uint256,bool)'(ritualId: BigNumberish, startIndex: BigNumberish, maxParticipants: BigNumberish, includeTranscript: boolean, overrides?: CallOverrides): Promise<Coordinator.ParticipantStructOutput[]>;
    getProviderPublicKey(provider: string, ritualId: BigNumberish, overrides?: CallOverrides): Promise<BLS12381.G2PointStructOutput>;
    getProviders(ritualId: BigNumberish, overrides?: CallOverrides): Promise<string[]>;
    getPublicKeyFromRitualId(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BLS12381.G1PointStructOutput>;
    getRitualIdFromPublicKey(dkgPublicKey: BLS12381.G1PointStruct, overrides?: CallOverrides): Promise<number>;
    getRitualInitiationCost(providers: string[], duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getRitualState(ritualId: BigNumberish, overrides?: CallOverrides): Promise<number>;
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
    getThresholdForRitualSize(size: BigNumberish, overrides?: CallOverrides): Promise<number>;
    grantRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
    initialize(_timeout: BigNumberish, _maxDkgSize: BigNumberish, _admin: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    initiateRitual(providers: string[], authority: string, duration: BigNumberish, accessController: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    isEncryptionAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    isInitiationPublic(overrides?: CallOverrides): Promise<boolean>;
    isParticipant(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<boolean>;
    isProviderPublicKeySet(provider: string, overrides?: CallOverrides): Promise<boolean>;
    isRitualActive(ritualId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    makeInitiationPublic(overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    maxDkgSize(overrides?: CallOverrides): Promise<number>;
    numberOfRituals(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    pendingDefaultAdmin(overrides?: CallOverrides): Promise<[string, number] & {
        newAdmin: string;
        schedule: number;
    }>;
    pendingDefaultAdminDelay(overrides?: CallOverrides): Promise<[number, number] & {
        newDelay: number;
        schedule: number;
    }>;
    pendingFees(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    postAggregation(ritualId: BigNumberish, aggregatedTranscript: BytesLike, dkgPublicKey: BLS12381.G1PointStruct, decryptionRequestStaticKey: BytesLike, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    postTranscript(ritualId: BigNumberish, transcript: BytesLike, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    processPendingFee(ritualId: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    rituals(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
        string,
        number,
        number,
        number,
        number,
        string,
        number,
        number,
        boolean,
        string,
        BLS12381.G1PointStructOutput,
        string
    ] & {
        initiator: string;
        initTimestamp: number;
        endTimestamp: number;
        totalTranscripts: number;
        totalAggregations: number;
        authority: string;
        dkgSize: number;
        threshold: number;
        aggregationMismatch: boolean;
        accessController: string;
        publicKey: BLS12381.G1PointStructOutput;
        aggregatedTranscript: string;
    }>;
    rollbackDefaultAdminDelay(overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setMaxDkgSize(newSize: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setProviderPublicKey(publicKey: BLS12381.G2PointStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setReimbursementPool(pool: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setTimeout(newTimeout: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    timeout(overrides?: CallOverrides): Promise<number>;
    totalPendingFees(overrides?: CallOverrides): Promise<BigNumber>;
    transferRitualAuthority(ritualId: BigNumberish, newAuthority: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    withdrawTokens(token: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    callStatic: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        INITIATOR_ROLE(overrides?: CallOverrides): Promise<string>;
        TREASURY_ROLE(overrides?: CallOverrides): Promise<string>;
        acceptDefaultAdminTransfer(overrides?: CallOverrides): Promise<void>;
        application(overrides?: CallOverrides): Promise<string>;
        beginDefaultAdminTransfer(newAdmin: string, overrides?: CallOverrides): Promise<void>;
        cancelDefaultAdminTransfer(overrides?: CallOverrides): Promise<void>;
        changeDefaultAdminDelay(newDelay: BigNumberish, overrides?: CallOverrides): Promise<void>;
        cohortFingerprint(nodes: string[], overrides?: CallOverrides): Promise<string>;
        currency(overrides?: CallOverrides): Promise<string>;
        defaultAdmin(overrides?: CallOverrides): Promise<string>;
        defaultAdminDelay(overrides?: CallOverrides): Promise<number>;
        defaultAdminDelayIncreaseWait(overrides?: CallOverrides): Promise<number>;
        feeDeduction(arg0: BigNumberish, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        feeRatePerSecond(overrides?: CallOverrides): Promise<BigNumber>;
        getAuthority(ritualId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        getParticipant(ritualId: BigNumberish, provider: string, transcript: boolean, overrides?: CallOverrides): Promise<Coordinator.ParticipantStructOutput>;
        getParticipantFromProvider(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<Coordinator.ParticipantStructOutput>;
        'getParticipants(uint32)'(ritualId: BigNumberish, overrides?: CallOverrides): Promise<Coordinator.ParticipantStructOutput[]>;
        'getParticipants(uint32,uint256,uint256,bool)'(ritualId: BigNumberish, startIndex: BigNumberish, maxParticipants: BigNumberish, includeTranscript: boolean, overrides?: CallOverrides): Promise<Coordinator.ParticipantStructOutput[]>;
        getProviderPublicKey(provider: string, ritualId: BigNumberish, overrides?: CallOverrides): Promise<BLS12381.G2PointStructOutput>;
        getProviders(ritualId: BigNumberish, overrides?: CallOverrides): Promise<string[]>;
        getPublicKeyFromRitualId(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BLS12381.G1PointStructOutput>;
        getRitualIdFromPublicKey(dkgPublicKey: BLS12381.G1PointStruct, overrides?: CallOverrides): Promise<number>;
        getRitualInitiationCost(providers: string[], duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRitualState(ritualId: BigNumberish, overrides?: CallOverrides): Promise<number>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
        getThresholdForRitualSize(size: BigNumberish, overrides?: CallOverrides): Promise<number>;
        grantRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
        initialize(_timeout: BigNumberish, _maxDkgSize: BigNumberish, _admin: string, overrides?: CallOverrides): Promise<void>;
        initiateRitual(providers: string[], authority: string, duration: BigNumberish, accessController: string, overrides?: CallOverrides): Promise<number>;
        isEncryptionAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        isInitiationPublic(overrides?: CallOverrides): Promise<boolean>;
        isParticipant(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<boolean>;
        isProviderPublicKeySet(provider: string, overrides?: CallOverrides): Promise<boolean>;
        isRitualActive(ritualId: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        makeInitiationPublic(overrides?: CallOverrides): Promise<void>;
        maxDkgSize(overrides?: CallOverrides): Promise<number>;
        numberOfRituals(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        pendingDefaultAdmin(overrides?: CallOverrides): Promise<[string, number] & {
            newAdmin: string;
            schedule: number;
        }>;
        pendingDefaultAdminDelay(overrides?: CallOverrides): Promise<[number, number] & {
            newDelay: number;
            schedule: number;
        }>;
        pendingFees(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        postAggregation(ritualId: BigNumberish, aggregatedTranscript: BytesLike, dkgPublicKey: BLS12381.G1PointStruct, decryptionRequestStaticKey: BytesLike, overrides?: CallOverrides): Promise<void>;
        postTranscript(ritualId: BigNumberish, transcript: BytesLike, overrides?: CallOverrides): Promise<void>;
        processPendingFee(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        rituals(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            number,
            number,
            number,
            number,
            string,
            number,
            number,
            boolean,
            string,
            BLS12381.G1PointStructOutput,
            string
        ] & {
            initiator: string;
            initTimestamp: number;
            endTimestamp: number;
            totalTranscripts: number;
            totalAggregations: number;
            authority: string;
            dkgSize: number;
            threshold: number;
            aggregationMismatch: boolean;
            accessController: string;
            publicKey: BLS12381.G1PointStructOutput;
            aggregatedTranscript: string;
        }>;
        rollbackDefaultAdminDelay(overrides?: CallOverrides): Promise<void>;
        setMaxDkgSize(newSize: BigNumberish, overrides?: CallOverrides): Promise<void>;
        setProviderPublicKey(publicKey: BLS12381.G2PointStruct, overrides?: CallOverrides): Promise<void>;
        setReimbursementPool(pool: string, overrides?: CallOverrides): Promise<void>;
        setTimeout(newTimeout: BigNumberish, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        timeout(overrides?: CallOverrides): Promise<number>;
        totalPendingFees(overrides?: CallOverrides): Promise<BigNumber>;
        transferRitualAuthority(ritualId: BigNumberish, newAuthority: string, overrides?: CallOverrides): Promise<void>;
        withdrawTokens(token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        'AggregationPosted(uint32,address,bytes32)'(ritualId?: BigNumberish | null, node?: string | null, aggregatedTranscriptDigest?: null): AggregationPostedEventFilter;
        AggregationPosted(ritualId?: BigNumberish | null, node?: string | null, aggregatedTranscriptDigest?: null): AggregationPostedEventFilter;
        'DefaultAdminDelayChangeCanceled()'(): DefaultAdminDelayChangeCanceledEventFilter;
        DefaultAdminDelayChangeCanceled(): DefaultAdminDelayChangeCanceledEventFilter;
        'DefaultAdminDelayChangeScheduled(uint48,uint48)'(newDelay?: null, effectSchedule?: null): DefaultAdminDelayChangeScheduledEventFilter;
        DefaultAdminDelayChangeScheduled(newDelay?: null, effectSchedule?: null): DefaultAdminDelayChangeScheduledEventFilter;
        'DefaultAdminTransferCanceled()'(): DefaultAdminTransferCanceledEventFilter;
        DefaultAdminTransferCanceled(): DefaultAdminTransferCanceledEventFilter;
        'DefaultAdminTransferScheduled(address,uint48)'(newAdmin?: string | null, acceptSchedule?: null): DefaultAdminTransferScheduledEventFilter;
        DefaultAdminTransferScheduled(newAdmin?: string | null, acceptSchedule?: null): DefaultAdminTransferScheduledEventFilter;
        'EndRitual(uint32,bool)'(ritualId?: BigNumberish | null, successful?: null): EndRitualEventFilter;
        EndRitual(ritualId?: BigNumberish | null, successful?: null): EndRitualEventFilter;
        'Initialized(uint64)'(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        'MaxDkgSizeChanged(uint16,uint16)'(oldSize?: null, newSize?: null): MaxDkgSizeChangedEventFilter;
        MaxDkgSizeChanged(oldSize?: null, newSize?: null): MaxDkgSizeChangedEventFilter;
        'ParticipantPublicKeySet(uint32,address,(bytes32,bytes32,bytes32))'(ritualId?: BigNumberish | null, participant?: string | null, publicKey?: null): ParticipantPublicKeySetEventFilter;
        ParticipantPublicKeySet(ritualId?: BigNumberish | null, participant?: string | null, publicKey?: null): ParticipantPublicKeySetEventFilter;
        'ReimbursementPoolSet(address)'(pool?: string | null): ReimbursementPoolSetEventFilter;
        ReimbursementPoolSet(pool?: string | null): ReimbursementPoolSetEventFilter;
        'RitualAuthorityTransferred(uint32,address,address)'(ritualId?: BigNumberish | null, previousAuthority?: string | null, newAuthority?: string | null): RitualAuthorityTransferredEventFilter;
        RitualAuthorityTransferred(ritualId?: BigNumberish | null, previousAuthority?: string | null, newAuthority?: string | null): RitualAuthorityTransferredEventFilter;
        'RoleAdminChanged(bytes32,bytes32,bytes32)'(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        'RoleGranted(bytes32,address,address)'(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        RoleGranted(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        'RoleRevoked(bytes32,address,address)'(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        RoleRevoked(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        'StartAggregationRound(uint32)'(ritualId?: BigNumberish | null): StartAggregationRoundEventFilter;
        StartAggregationRound(ritualId?: BigNumberish | null): StartAggregationRoundEventFilter;
        'StartRitual(uint32,address,address[])'(ritualId?: BigNumberish | null, authority?: string | null, participants?: null): StartRitualEventFilter;
        StartRitual(ritualId?: BigNumberish | null, authority?: string | null, participants?: null): StartRitualEventFilter;
        'TimeoutChanged(uint32,uint32)'(oldTimeout?: null, newTimeout?: null): TimeoutChangedEventFilter;
        TimeoutChanged(oldTimeout?: null, newTimeout?: null): TimeoutChangedEventFilter;
        'TranscriptPosted(uint32,address,bytes32)'(ritualId?: BigNumberish | null, node?: string | null, transcriptDigest?: null): TranscriptPostedEventFilter;
        TranscriptPosted(ritualId?: BigNumberish | null, node?: string | null, transcriptDigest?: null): TranscriptPostedEventFilter;
    };
    estimateGas: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        INITIATOR_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        TREASURY_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        acceptDefaultAdminTransfer(overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        application(overrides?: CallOverrides): Promise<BigNumber>;
        beginDefaultAdminTransfer(newAdmin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        cancelDefaultAdminTransfer(overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        changeDefaultAdminDelay(newDelay: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        cohortFingerprint(nodes: string[], overrides?: CallOverrides): Promise<BigNumber>;
        currency(overrides?: CallOverrides): Promise<BigNumber>;
        defaultAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        defaultAdminDelay(overrides?: CallOverrides): Promise<BigNumber>;
        defaultAdminDelayIncreaseWait(overrides?: CallOverrides): Promise<BigNumber>;
        feeDeduction(arg0: BigNumberish, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        feeRatePerSecond(overrides?: CallOverrides): Promise<BigNumber>;
        getAuthority(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getParticipant(ritualId: BigNumberish, provider: string, transcript: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        getParticipantFromProvider(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<BigNumber>;
        'getParticipants(uint32)'(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        'getParticipants(uint32,uint256,uint256,bool)'(ritualId: BigNumberish, startIndex: BigNumberish, maxParticipants: BigNumberish, includeTranscript: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        getProviderPublicKey(provider: string, ritualId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getProviders(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getPublicKeyFromRitualId(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRitualIdFromPublicKey(dkgPublicKey: BLS12381.G1PointStruct, overrides?: CallOverrides): Promise<BigNumber>;
        getRitualInitiationCost(providers: string[], duration: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRitualState(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getThresholdForRitualSize(size: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(_timeout: BigNumberish, _maxDkgSize: BigNumberish, _admin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        initiateRitual(providers: string[], authority: string, duration: BigNumberish, accessController: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        isEncryptionAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        isInitiationPublic(overrides?: CallOverrides): Promise<BigNumber>;
        isParticipant(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<BigNumber>;
        isProviderPublicKeySet(provider: string, overrides?: CallOverrides): Promise<BigNumber>;
        isRitualActive(ritualId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        makeInitiationPublic(overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        maxDkgSize(overrides?: CallOverrides): Promise<BigNumber>;
        numberOfRituals(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        pendingDefaultAdmin(overrides?: CallOverrides): Promise<BigNumber>;
        pendingDefaultAdminDelay(overrides?: CallOverrides): Promise<BigNumber>;
        pendingFees(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        postAggregation(ritualId: BigNumberish, aggregatedTranscript: BytesLike, dkgPublicKey: BLS12381.G1PointStruct, decryptionRequestStaticKey: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        postTranscript(ritualId: BigNumberish, transcript: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        processPendingFee(ritualId: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        rituals(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        rollbackDefaultAdminDelay(overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setMaxDkgSize(newSize: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setProviderPublicKey(publicKey: BLS12381.G2PointStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setReimbursementPool(pool: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setTimeout(newTimeout: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        timeout(overrides?: CallOverrides): Promise<BigNumber>;
        totalPendingFees(overrides?: CallOverrides): Promise<BigNumber>;
        transferRitualAuthority(ritualId: BigNumberish, newAuthority: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        withdrawTokens(token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        INITIATOR_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        TREASURY_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        acceptDefaultAdminTransfer(overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        application(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        beginDefaultAdminTransfer(newAdmin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        cancelDefaultAdminTransfer(overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        changeDefaultAdminDelay(newDelay: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        cohortFingerprint(nodes: string[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        currency(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        defaultAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        defaultAdminDelay(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        defaultAdminDelayIncreaseWait(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        feeDeduction(arg0: BigNumberish, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        feeRatePerSecond(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAuthority(ritualId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getParticipant(ritualId: BigNumberish, provider: string, transcript: boolean, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getParticipantFromProvider(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        'getParticipants(uint32)'(ritualId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        'getParticipants(uint32,uint256,uint256,bool)'(ritualId: BigNumberish, startIndex: BigNumberish, maxParticipants: BigNumberish, includeTranscript: boolean, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getProviderPublicKey(provider: string, ritualId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getProviders(ritualId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPublicKeyFromRitualId(ritualId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRitualIdFromPublicKey(dkgPublicKey: BLS12381.G1PointStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRitualInitiationCost(providers: string[], duration: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRitualState(ritualId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getThresholdForRitualSize(size: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(_timeout: BigNumberish, _maxDkgSize: BigNumberish, _admin: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        initiateRitual(providers: string[], authority: string, duration: BigNumberish, accessController: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        isEncryptionAuthorized(ritualId: BigNumberish, evidence: BytesLike, ciphertextHeader: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isInitiationPublic(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isParticipant(ritualId: BigNumberish, provider: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isProviderPublicKeySet(provider: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isRitualActive(ritualId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        makeInitiationPublic(overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        maxDkgSize(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        numberOfRituals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pendingDefaultAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pendingDefaultAdminDelay(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pendingFees(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        postAggregation(ritualId: BigNumberish, aggregatedTranscript: BytesLike, dkgPublicKey: BLS12381.G1PointStruct, decryptionRequestStaticKey: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        postTranscript(ritualId: BigNumberish, transcript: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        processPendingFee(ritualId: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        rituals(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rollbackDefaultAdminDelay(overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setMaxDkgSize(newSize: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setProviderPublicKey(publicKey: BLS12381.G2PointStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setReimbursementPool(pool: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setTimeout(newTimeout: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        timeout(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalPendingFees(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferRitualAuthority(ritualId: BigNumberish, newAuthority: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        withdrawTokens(token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
    };
}

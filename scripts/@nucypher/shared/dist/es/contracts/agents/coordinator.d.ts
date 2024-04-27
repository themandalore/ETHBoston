import { DkgPublicKey, SessionStaticKey, ThresholdMessageKit } from '@nucypher/nucypher-core';
import { BigNumberish, ethers } from 'ethers';
import { Domain } from '../../porter';
import { ChecksumAddress } from '../../types';
import { BLS12381 } from '../ethers-typechain/Coordinator';
export interface CoordinatorRitual {
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
}
export type DkgParticipant = {
    provider: string;
    aggregated: boolean;
    decryptionRequestStaticKey: SessionStaticKey;
};
export declare enum DkgRitualState {
    NON_INITIATED = 0,
    DKG_AWAITING_TRANSCRIPTS = 1,
    DKG_AWAITING_AGGREGATIONS = 2,
    DKG_TIMEOUT = 3,
    DKG_INVALID = 4,
    ACTIVE = 5,
    EXPIRED = 6
}
export declare class DkgCoordinatorAgent {
    static getParticipants(provider: ethers.providers.Provider, domain: Domain, ritualId: number, maxParticipants: number): Promise<DkgParticipant[]>;
    static initializeRitual(provider: ethers.providers.Provider, signer: ethers.Signer, domain: Domain, providers: ChecksumAddress[], authority: string, duration: BigNumberish, accessController: string): Promise<number>;
    static getRitual(provider: ethers.providers.Provider, domain: Domain, ritualId: number): Promise<CoordinatorRitual>;
    static getRitualState(provider: ethers.providers.Provider, domain: Domain, ritualId: number): Promise<DkgRitualState>;
    static onRitualEndEvent(provider: ethers.providers.Provider, domain: Domain, ritualId: number, callback: (successful: boolean) => void): Promise<void>;
    static getRitualIdFromPublicKey(provider: ethers.providers.Provider, domain: Domain, dkgPublicKey: DkgPublicKey): Promise<number>;
    static isEncryptionAuthorized(provider: ethers.providers.Provider, domain: Domain, ritualId: number, thresholdMessageKit: ThresholdMessageKit): Promise<boolean>;
    private static connectReadOnly;
    private static connectReadWrite;
    private static connect;
}

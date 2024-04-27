import { DkgPublicKey } from '@nucypher/nucypher-core';
import { ChecksumAddress, DkgRitualState, Domain } from '@nucypher/shared';
import { BigNumberish, ethers } from 'ethers';
export interface DkgRitualJSON {
    id: number;
    dkgPublicKey: Uint8Array;
    sharesNum: number;
    threshold: number;
    state: DkgRitualState;
}
export declare class DkgRitual {
    readonly id: number;
    readonly dkgPublicKey: DkgPublicKey;
    readonly sharesNum: number;
    readonly threshold: number;
    readonly state: DkgRitualState;
    constructor(id: number, dkgPublicKey: DkgPublicKey, sharesNum: number, threshold: number, state: DkgRitualState);
    toObj(): DkgRitualJSON;
    static fromObj({ id, dkgPublicKey, sharesNum, threshold, state, }: DkgRitualJSON): DkgRitual;
    equals(other: DkgRitual): boolean;
}
export declare class DkgClient {
    static initializeRitual(provider: ethers.providers.Provider, signer: ethers.Signer, domain: Domain, ursulas: ChecksumAddress[], authority: string, duration: BigNumberish, accessController: string, waitUntilEnd?: boolean): Promise<number | undefined>;
    private static waitUntilRitualEnd;
    static getRitual(provider: ethers.providers.Provider, domain: Domain, ritualId: number): Promise<DkgRitual>;
    static getActiveRitual(provider: ethers.providers.Provider, domain: Domain, ritualId: number): Promise<DkgRitual>;
}

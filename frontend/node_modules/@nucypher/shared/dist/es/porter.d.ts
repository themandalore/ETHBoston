import { CapsuleFrag, EncryptedThresholdDecryptionRequest, EncryptedThresholdDecryptionResponse, PublicKey, RetrievalKit, TreasureMap } from '@nucypher/nucypher-core';
import { ChecksumAddress, HexEncodedBytes } from './types';
declare const porterUri: Record<string, string>;
export type Domain = keyof typeof porterUri;
export declare const domains: Record<string, Domain>;
export declare const getPorterUri: (domain: Domain) => string;
export type Ursula = {
    readonly checksumAddress: ChecksumAddress;
    readonly uri: string;
    readonly encryptingKey: PublicKey;
};
type UrsulaResponse = {
    readonly checksum_address: ChecksumAddress;
    readonly uri: string;
    readonly encrypting_key: HexEncodedBytes;
};
export type GetUrsulasResult = {
    readonly result: {
        readonly ursulas: readonly UrsulaResponse[];
    };
    readonly version: string;
};
export type RetrieveCFragsResult = {
    readonly cFrags: Record<ChecksumAddress, CapsuleFrag>;
    readonly errors: Record<ChecksumAddress, string>;
};
export type TacoDecryptResult = {
    encryptedResponses: Record<string, EncryptedThresholdDecryptionResponse>;
    errors: Record<string, string>;
};
export declare class PorterClient {
    readonly porterUrl: URL;
    constructor(porterUri: string);
    getUrsulas(quantity: number, excludeUrsulas?: readonly ChecksumAddress[], includeUrsulas?: readonly ChecksumAddress[]): Promise<readonly Ursula[]>;
    retrieveCFrags(treasureMap: TreasureMap, retrievalKits: readonly RetrievalKit[], aliceVerifyingKey: PublicKey, bobEncryptingKey: PublicKey, bobVerifyingKey: PublicKey, conditionContextJSON?: string | undefined): Promise<readonly RetrieveCFragsResult[]>;
    tacoDecrypt(encryptedRequests: Record<string, EncryptedThresholdDecryptionRequest>, threshold: number): Promise<TacoDecryptResult>;
}
export {};

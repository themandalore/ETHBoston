/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} data
* @param {DkgPublicKey} public_key
* @param {Conditions} conditions
* @returns {[Ciphertext, AuthenticatedData]}
*/
export function encryptForDkg(data: Uint8Array, public_key: DkgPublicKey, conditions: Conditions): [Ciphertext, AuthenticatedData];
/**
* @param {PublicKey} delegating_pk
* @param {Uint8Array} plaintext
* @returns {[Capsule, Uint8Array]}
*/
export function encrypt(delegating_pk: PublicKey, plaintext: Uint8Array): [Capsule, Uint8Array];
/**
* @param {SecretKey} delegating_sk
* @param {Capsule} capsule
* @param {Uint8Array} ciphertext
* @returns {Uint8Array}
*/
export function decryptOriginal(delegating_sk: SecretKey, capsule: Capsule, ciphertext: Uint8Array): Uint8Array;
/**
* @param {SecretKey} receiving_sk
* @param {PublicKey} delegating_pk
* @param {Capsule} capsule
* @param {VerifiedCapsuleFrag[]} vcfrags
* @param {Uint8Array} ciphertext
* @returns {Uint8Array}
*/
export function decryptReencrypted(receiving_sk: SecretKey, delegating_pk: PublicKey, capsule: Capsule, vcfrags: VerifiedCapsuleFrag[], ciphertext: Uint8Array): Uint8Array;
/**
* @param {SecretKey} delegating_sk
* @param {PublicKey} receiving_pk
* @param {Signer} signer
* @param {number} threshold
* @param {number} shares
* @param {boolean} sign_delegating_key
* @param {boolean} sign_receiving_key
* @returns {VerifiedKeyFrag[]}
*/
export function generateKFrags(delegating_sk: SecretKey, receiving_pk: PublicKey, signer: Signer, threshold: number, shares: number, sign_delegating_key: boolean, sign_receiving_key: boolean): VerifiedKeyFrag[];
/**
* @param {Capsule} capsule
* @param {VerifiedKeyFrag} kfrag
* @returns {VerifiedCapsuleFrag}
*/
export function reencrypt(capsule: Capsule, kfrag: VerifiedKeyFrag): VerifiedCapsuleFrag;
/**
* @param {Uint8Array} message
* @param {Uint8Array} aad
* @param {DkgPublicKey} dkg_public_key
* @returns {Ciphertext}
*/
export function ferveoEncrypt(message: Uint8Array, aad: Uint8Array, dkg_public_key: DkgPublicKey): Ciphertext;
/**
* @param {DecryptionShareSimple[]} decryption_shares_js
* @returns {SharedSecret}
*/
export function combineDecryptionSharesSimple(decryption_shares_js: DecryptionShareSimple[]): SharedSecret;
/**
* @param {DecryptionSharePrecomputed[]} decryption_shares_js
* @returns {SharedSecret}
*/
export function combineDecryptionSharesPrecomputed(decryption_shares_js: DecryptionSharePrecomputed[]): SharedSecret;
/**
* @param {Ciphertext} ciphertext
* @param {Uint8Array} aad
* @param {SharedSecret} shared_secret
* @returns {Uint8Array}
*/
export function decryptWithSharedSecret(ciphertext: Ciphertext, aad: Uint8Array, shared_secret: SharedSecret): Uint8Array;
/**
*/
export class AccessControlPolicy {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {AccessControlPolicy}
*/
  static fromBytes(bytes: Uint8Array): AccessControlPolicy;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {AccessControlPolicy} other
* @returns {boolean}
*/
  equals(other: AccessControlPolicy): boolean;
/**
* @param {AuthenticatedData} auth_data
* @param {Uint8Array} authorization
*/
  constructor(auth_data: AuthenticatedData, authorization: Uint8Array);
/**
* @returns {Uint8Array}
*/
  aad(): Uint8Array;
/**
*/
  readonly authorization: Uint8Array;
/**
*/
  readonly conditions: Conditions;
/**
*/
  readonly publicKey: DkgPublicKey;
}
/**
*/
export class Address {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @param {Address} other
* @returns {boolean}
*/
  equals(other: Address): boolean;
/**
* @param {Uint8Array} address_bytes
*/
  constructor(address_bytes: Uint8Array);
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class AggregatedTranscript {
  free(): void;
/**
* @param {AggregatedTranscript} other
* @returns {boolean}
*/
  equals(other: AggregatedTranscript): boolean;
/**
* @param {Uint8Array} bytes
* @returns {AggregatedTranscript}
*/
  static fromBytes(bytes: Uint8Array): AggregatedTranscript;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {ValidatorMessage[]} messages
*/
  constructor(messages: ValidatorMessage[]);
/**
* @param {number} shares_num
* @param {ValidatorMessage[]} messages
* @returns {boolean}
*/
  verify(shares_num: number, messages: ValidatorMessage[]): boolean;
/**
* @param {Dkg} dkg
* @param {CiphertextHeader} ciphertext_header
* @param {Uint8Array} aad
* @param {Keypair} validator_keypair
* @returns {DecryptionSharePrecomputed}
*/
  createDecryptionSharePrecomputed(dkg: Dkg, ciphertext_header: CiphertextHeader, aad: Uint8Array, validator_keypair: Keypair): DecryptionSharePrecomputed;
/**
* @param {Dkg} dkg
* @param {CiphertextHeader} ciphertext_header
* @param {Uint8Array} aad
* @param {Keypair} validator_keypair
* @returns {DecryptionShareSimple}
*/
  createDecryptionShareSimple(dkg: Dkg, ciphertext_header: CiphertextHeader, aad: Uint8Array, validator_keypair: Keypair): DecryptionShareSimple;
}
/**
*/
export class AuthenticatedData {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {AuthenticatedData}
*/
  static fromBytes(bytes: Uint8Array): AuthenticatedData;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {AuthenticatedData} other
* @returns {boolean}
*/
  equals(other: AuthenticatedData): boolean;
/**
* @param {DkgPublicKey} public_key
* @param {Conditions} conditions
*/
  constructor(public_key: DkgPublicKey, conditions: Conditions);
/**
* @returns {Uint8Array}
*/
  aad(): Uint8Array;
/**
*/
  readonly conditions: Conditions;
/**
*/
  readonly publicKey: DkgPublicKey;
}
/**
*/
export class Capsule {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  toBytesSimple(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {Capsule}
*/
  static fromBytes(data: Uint8Array): Capsule;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {Capsule} other
* @returns {boolean}
*/
  equals(other: Capsule): boolean;
}
/**
*/
export class CapsuleFrag {
  free(): void;
/**
* @param {Capsule} capsule
* @param {PublicKey} verifying_pk
* @param {PublicKey} delegating_pk
* @param {PublicKey} receiving_pk
* @returns {VerifiedCapsuleFrag}
*/
  verify(capsule: Capsule, verifying_pk: PublicKey, delegating_pk: PublicKey, receiving_pk: PublicKey): VerifiedCapsuleFrag;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  toBytesSimple(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {CapsuleFrag}
*/
  static fromBytes(data: Uint8Array): CapsuleFrag;
/**
* @returns {string}
*/
  toString(): string;
/**
* @returns {VerifiedCapsuleFrag}
*/
  skipVerification(): VerifiedCapsuleFrag;
/**
* @param {CapsuleFrag} other
* @returns {boolean}
*/
  equals(other: CapsuleFrag): boolean;
}
/**
*/
export class Ciphertext {
  free(): void;
/**
* @param {Ciphertext} other
* @returns {boolean}
*/
  equals(other: Ciphertext): boolean;
/**
* @param {Uint8Array} bytes
* @returns {Ciphertext}
*/
  static fromBytes(bytes: Uint8Array): Ciphertext;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
*/
  readonly header: CiphertextHeader;
/**
*/
  readonly payload: Uint8Array;
}
/**
*/
export class CiphertextHeader {
  free(): void;
/**
* @param {CiphertextHeader} other
* @returns {boolean}
*/
  equals(other: CiphertextHeader): boolean;
/**
* @param {Uint8Array} bytes
* @returns {CiphertextHeader}
*/
  static fromBytes(bytes: Uint8Array): CiphertextHeader;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class Conditions {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {Conditions} other
* @returns {boolean}
*/
  equals(other: Conditions): boolean;
/**
* @param {string} conditions
*/
  constructor(conditions: string);
/**
* @param {string} data
* @returns {Conditions}
*/
  static fromBytes(data: string): Conditions;
}
/**
*/
export class Context {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {Context} other
* @returns {boolean}
*/
  equals(other: Context): boolean;
/**
* @param {string} context
*/
  constructor(context: string);
/**
* @param {string} data
* @returns {Context}
*/
  static fromBytes(data: string): Context;
}
/**
*/
export class CurvePoint {
  free(): void;
/**
* @returns {[Uint8Array, Uint8Array] | undefined}
*/
  coordinates(): [Uint8Array, Uint8Array] | undefined;
}
/**
*/
export class DecryptionSharePrecomputed {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @param {DecryptionSharePrecomputed} other
* @returns {boolean}
*/
  equals(other: DecryptionSharePrecomputed): boolean;
/**
* @param {Uint8Array} bytes
* @returns {DecryptionSharePrecomputed}
*/
  static fromBytes(bytes: Uint8Array): DecryptionSharePrecomputed;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class DecryptionShareSimple {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @param {DecryptionShareSimple} other
* @returns {boolean}
*/
  equals(other: DecryptionShareSimple): boolean;
/**
* @param {Uint8Array} bytes
* @returns {DecryptionShareSimple}
*/
  static fromBytes(bytes: Uint8Array): DecryptionShareSimple;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class Dkg {
  free(): void;
/**
* @param {number} tau
* @param {number} shares_num
* @param {number} security_threshold
* @param {Validator[]} validators_js
* @param {Validator} me
*/
  constructor(tau: number, shares_num: number, security_threshold: number, validators_js: Validator[], me: Validator);
/**
* @returns {DkgPublicKey}
*/
  publicKey(): DkgPublicKey;
/**
* @returns {Transcript}
*/
  generateTranscript(): Transcript;
/**
* @param {ValidatorMessage[]} messages_js
* @returns {AggregatedTranscript}
*/
  aggregateTranscript(messages_js: ValidatorMessage[]): AggregatedTranscript;
}
/**
*/
export class DkgPublicKey {
  free(): void;
/**
* @param {DkgPublicKey} other
* @returns {boolean}
*/
  equals(other: DkgPublicKey): boolean;
/**
* @param {Uint8Array} bytes
* @returns {DkgPublicKey}
*/
  static fromBytes(bytes: Uint8Array): DkgPublicKey;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @returns {number}
*/
  static serializedSize(): number;
/**
* @returns {DkgPublicKey}
*/
  static random(): DkgPublicKey;
}
/**
*/
export class EncryptedKeyFrag {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @param {Uint8Array} bytes
* @returns {EncryptedKeyFrag}
*/
  static fromBytes(bytes: Uint8Array): EncryptedKeyFrag;
/**
* @param {Signer} signer
* @param {PublicKey} recipient_key
* @param {HRAC} hrac
* @param {VerifiedKeyFrag} verified_kfrag
*/
  constructor(signer: Signer, recipient_key: PublicKey, hrac: HRAC, verified_kfrag: VerifiedKeyFrag);
/**
* @param {SecretKey} sk
* @param {HRAC} hrac
* @param {PublicKey} publisher_verifying_key
* @returns {VerifiedKeyFrag}
*/
  decrypt(sk: SecretKey, hrac: HRAC, publisher_verifying_key: PublicKey): VerifiedKeyFrag;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class EncryptedThresholdDecryptionRequest {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {EncryptedThresholdDecryptionRequest}
*/
  static fromBytes(bytes: Uint8Array): EncryptedThresholdDecryptionRequest;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {SessionSharedSecret} shared_secret
* @returns {ThresholdDecryptionRequest}
*/
  decrypt(shared_secret: SessionSharedSecret): ThresholdDecryptionRequest;
/**
*/
  readonly requesterPublicKey: SessionStaticKey;
/**
*/
  readonly ritualId: number;
}
/**
*/
export class EncryptedThresholdDecryptionResponse {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {EncryptedThresholdDecryptionResponse}
*/
  static fromBytes(bytes: Uint8Array): EncryptedThresholdDecryptionResponse;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {SessionSharedSecret} shared_secret
* @returns {ThresholdDecryptionResponse}
*/
  decrypt(shared_secret: SessionSharedSecret): ThresholdDecryptionResponse;
/**
*/
  readonly ritualId: number;
}
/**
*/
export class EncryptedTreasureMap {
  free(): void;
/**
* @param {EncryptedTreasureMap} other
* @returns {boolean}
*/
  equals(other: EncryptedTreasureMap): boolean;
/**
* @param {Uint8Array} bytes
* @returns {EncryptedTreasureMap}
*/
  static fromBytes(bytes: Uint8Array): EncryptedTreasureMap;
/**
* @param {SecretKey} sk
* @param {PublicKey} publisher_verifying_key
* @returns {TreasureMap}
*/
  decrypt(sk: SecretKey, publisher_verifying_key: PublicKey): TreasureMap;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class EthereumAddress {
  free(): void;
/**
* @param {string} address
* @returns {EthereumAddress}
*/
  static fromString(address: string): EthereumAddress;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class FerveoPublicKey {
  free(): void;
/**
* @param {FerveoPublicKey} other
* @returns {boolean}
*/
  equals(other: FerveoPublicKey): boolean;
/**
* @param {Uint8Array} bytes
* @returns {FerveoPublicKey}
*/
  static fromBytes(bytes: Uint8Array): FerveoPublicKey;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @returns {number}
*/
  static serializedSize(): number;
}
/**
*/
export class FerveoVariant {
  free(): void;
/**
* @param {FerveoVariant} other
* @returns {boolean}
*/
  equals(other: FerveoVariant): boolean;
/**
* @param {Uint8Array} bytes
* @returns {FerveoVariant}
*/
  static fromBytes(bytes: Uint8Array): FerveoVariant;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @returns {string}
*/
  toString(): string;
/**
*/
  static readonly precomputed: FerveoVariant;
/**
*/
  static readonly simple: FerveoVariant;
}
/**
*/
export class FleetStateChecksum {
  free(): void;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {NodeMetadata[]} other_nodes
* @param {NodeMetadata | null} this_node
*/
  constructor(other_nodes: NodeMetadata[], this_node: NodeMetadata | null);
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class HRAC {
  free(): void;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {HRAC} other
* @returns {boolean}
*/
  equals(other: HRAC): boolean;
/**
* @param {PublicKey} publisher_verifying_key
* @param {PublicKey} bob_verifying_key
* @param {Uint8Array} label
*/
  constructor(publisher_verifying_key: PublicKey, bob_verifying_key: PublicKey, label: Uint8Array);
/**
* @param {Uint8Array} bytes
* @returns {HRAC}
*/
  static fromBytes(bytes: Uint8Array): HRAC;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class KeyFrag {
  free(): void;
/**
* @param {PublicKey} verifying_pk
* @param {PublicKey | null} delegating_pk
* @param {PublicKey | null} receiving_pk
* @returns {VerifiedKeyFrag}
*/
  verify(verifying_pk: PublicKey, delegating_pk: PublicKey | null, receiving_pk: PublicKey | null): VerifiedKeyFrag;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {KeyFrag}
*/
  static fromBytes(data: Uint8Array): KeyFrag;
/**
* @returns {string}
*/
  toString(): string;
/**
* @returns {VerifiedKeyFrag}
*/
  skipVerification(): VerifiedKeyFrag;
/**
* @param {KeyFrag} other
* @returns {boolean}
*/
  equals(other: KeyFrag): boolean;
}
/**
*/
export class Keypair {
  free(): void;
/**
* @param {Keypair} other
* @returns {boolean}
*/
  equals(other: Keypair): boolean;
/**
* @param {Uint8Array} bytes
* @returns {Keypair}
*/
  static fromBytes(bytes: Uint8Array): Keypair;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @returns {Keypair}
*/
  static random(): Keypair;
/**
* @param {Uint8Array} bytes
* @returns {Keypair}
*/
  static fromSecureRandomness(bytes: Uint8Array): Keypair;
/**
*/
  readonly publicKey: FerveoPublicKey;
/**
*/
  static readonly secureRandomnessSize: number;
}
/**
*/
export class MessageKit {
  free(): void;
/**
* @param {MessageKit} other
* @returns {boolean}
*/
  equals(other: MessageKit): boolean;
/**
* @param {Uint8Array} bytes
* @returns {MessageKit}
*/
  static fromBytes(bytes: Uint8Array): MessageKit;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {PublicKey} policy_encrypting_key
* @param {Uint8Array} plaintext
* @param {Conditions | null} conditions
*/
  constructor(policy_encrypting_key: PublicKey, plaintext: Uint8Array, conditions: Conditions | null);
/**
* @param {SecretKey} sk
* @returns {Uint8Array}
*/
  decrypt(sk: SecretKey): Uint8Array;
/**
* @param {SecretKey} sk
* @param {PublicKey} policy_encrypting_key
* @param {VerifiedCapsuleFrag[]} vcfrags
* @returns {Uint8Array}
*/
  decryptReencrypted(sk: SecretKey, policy_encrypting_key: PublicKey, vcfrags: VerifiedCapsuleFrag[]): Uint8Array;
/**
*/
  readonly capsule: Capsule;
/**
*/
  readonly conditions: Conditions | undefined;
}
/**
*/
export class MetadataRequest {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {MetadataRequest}
*/
  static fromBytes(bytes: Uint8Array): MetadataRequest;
/**
* @param {FleetStateChecksum} fleet_state_checksum
* @param {NodeMetadata[]} announce_nodes
*/
  constructor(fleet_state_checksum: FleetStateChecksum, announce_nodes: NodeMetadata[]);
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
*/
  readonly announceNodes: NodeMetadata[];
/**
*/
  readonly fleetStateChecksum: FleetStateChecksum;
}
/**
*/
export class MetadataResponse {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {MetadataResponse}
*/
  static fromBytes(bytes: Uint8Array): MetadataResponse;
/**
* @param {Signer} signer
* @param {MetadataResponsePayload} response
*/
  constructor(signer: Signer, response: MetadataResponsePayload);
/**
* @param {PublicKey} verifying_pk
* @returns {MetadataResponsePayload}
*/
  verify(verifying_pk: PublicKey): MetadataResponsePayload;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class MetadataResponsePayload {
  free(): void;
/**
* @param {number} timestamp_epoch
* @param {NodeMetadata[]} announce_nodes
*/
  constructor(timestamp_epoch: number, announce_nodes: NodeMetadata[]);
/**
*/
  readonly announceNodes: NodeMetadata[];
/**
*/
  readonly timestamp_epoch: number;
}
/**
*/
export class NodeMetadata {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @param {Uint8Array} bytes
* @returns {NodeMetadata}
*/
  static fromBytes(bytes: Uint8Array): NodeMetadata;
/**
* @param {Signer} signer
* @param {NodeMetadataPayload} payload
*/
  constructor(signer: Signer, payload: NodeMetadataPayload);
/**
* @returns {boolean}
*/
  verify(): boolean;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
*/
  readonly payload: NodeMetadataPayload;
}
/**
*/
export class NodeMetadataPayload {
  free(): void;
/**
* @param {Address} staking_provider_address
* @param {string} domain
* @param {number} timestamp_epoch
* @param {PublicKey} verifying_key
* @param {PublicKey} encrypting_key
* @param {FerveoPublicKey} ferveo_public_key
* @param {Uint8Array} certificate_der
* @param {string} host
* @param {number} port
* @param {RecoverableSignature} operator_signature
*/
  constructor(staking_provider_address: Address, domain: string, timestamp_epoch: number, verifying_key: PublicKey, encrypting_key: PublicKey, ferveo_public_key: FerveoPublicKey, certificate_der: Uint8Array, host: string, port: number, operator_signature: RecoverableSignature);
/**
* @returns {Address}
*/
  deriveOperatorAddress(): Address;
/**
*/
  readonly certificate_der: Uint8Array;
/**
*/
  readonly domain: string;
/**
*/
  readonly encryptingKey: PublicKey;
/**
*/
  readonly host: string;
/**
*/
  readonly operator_signature: RecoverableSignature;
/**
*/
  readonly port: number;
/**
*/
  readonly staking_provider_address: Address;
/**
*/
  readonly timestampEpoch: number;
/**
*/
  readonly verifyingKey: PublicKey;
}
/**
*/
export class Parameters {
  free(): void;
/**
*/
  constructor();
/**
*/
  readonly u: CurvePoint;
}
/**
*/
export class PublicKey {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @returns {Uint8Array}
*/
  toCompressedBytes(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {PublicKey}
*/
  static fromCompressedBytes(data: Uint8Array): PublicKey;
/**
* @param {Uint8Array} prehash
* @param {RecoverableSignature} signature
* @returns {PublicKey}
*/
  static recoverFromPrehash(prehash: Uint8Array, signature: RecoverableSignature): PublicKey;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {PublicKey} other
* @returns {boolean}
*/
  equals(other: PublicKey): boolean;
}
/**
*/
export class RecoverableSignature {
  free(): void;
/**
* @returns {Uint8Array}
*/
  toBEBytes(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {RecoverableSignature}
*/
  static fromBEBytes(data: Uint8Array): RecoverableSignature;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {RecoverableSignature} other
* @returns {boolean}
*/
  equals(other: RecoverableSignature): boolean;
}
/**
*/
export class ReencryptionEvidence {
  free(): void;
/**
* @param {Capsule} capsule
* @param {VerifiedCapsuleFrag} vcfrag
* @param {PublicKey} verifying_pk
* @param {PublicKey} delegating_pk
* @param {PublicKey} receiving_pk
*/
  constructor(capsule: Capsule, vcfrag: VerifiedCapsuleFrag, verifying_pk: PublicKey, delegating_pk: PublicKey, receiving_pk: PublicKey);
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {ReencryptionEvidence}
*/
  static fromBytes(data: Uint8Array): ReencryptionEvidence;
/**
*/
  readonly e: CurvePoint;
/**
*/
  readonly e1: CurvePoint;
/**
*/
  readonly e1h: CurvePoint;
/**
*/
  readonly e2: CurvePoint;
/**
*/
  readonly ez: CurvePoint;
/**
*/
  readonly kfragSignatureV: boolean;
/**
*/
  readonly kfragValidityMessageHash: Uint8Array;
/**
*/
  readonly u1: CurvePoint;
/**
*/
  readonly u1h: CurvePoint;
/**
*/
  readonly u2: CurvePoint;
/**
*/
  readonly uz: CurvePoint;
/**
*/
  readonly v: CurvePoint;
/**
*/
  readonly v1: CurvePoint;
/**
*/
  readonly v1h: CurvePoint;
/**
*/
  readonly v2: CurvePoint;
/**
*/
  readonly vz: CurvePoint;
}
/**
*/
export class ReencryptionRequest {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {ReencryptionRequest}
*/
  static fromBytes(bytes: Uint8Array): ReencryptionRequest;
/**
* @param {Capsule[]} capsules
* @param {HRAC} hrac
* @param {EncryptedKeyFrag} encrypted_kfrag
* @param {PublicKey} publisher_verifying_key
* @param {PublicKey} bob_verifying_key
* @param {Conditions | null} conditions
* @param {Context | null} context
*/
  constructor(capsules: Capsule[], hrac: HRAC, encrypted_kfrag: EncryptedKeyFrag, publisher_verifying_key: PublicKey, bob_verifying_key: PublicKey, conditions: Conditions | null, context: Context | null);
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
*/
  readonly bobVerifyingKey: PublicKey;
/**
*/
  readonly capsules: Capsule[];
/**
*/
  readonly conditions: Conditions | undefined;
/**
*/
  readonly context: Context | undefined;
/**
*/
  readonly encryptedKfrag: EncryptedKeyFrag;
/**
*/
  readonly hrac: HRAC;
/**
*/
  readonly publisherVerifyingKey: PublicKey;
}
/**
*/
export class ReencryptionResponse {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {ReencryptionResponse}
*/
  static fromBytes(bytes: Uint8Array): ReencryptionResponse;
/**
* @param {Signer} signer
* @param {[Capsule, VerifiedCapsuleFrag][]} capsules_and_vcfrags
*/
  constructor(signer: Signer, capsules_and_vcfrags: [Capsule, VerifiedCapsuleFrag][]);
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {Capsule[]} capsules
* @param {PublicKey} alice_verifying_key
* @param {PublicKey} ursula_verifying_key
* @param {PublicKey} policy_encrypting_key
* @param {PublicKey} bob_encrypting_key
* @returns {VerifiedCapsuleFrag[]}
*/
  verify(capsules: Capsule[], alice_verifying_key: PublicKey, ursula_verifying_key: PublicKey, policy_encrypting_key: PublicKey, bob_encrypting_key: PublicKey): VerifiedCapsuleFrag[];
}
/**
*/
export class RetrievalKit {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {RetrievalKit}
*/
  static fromBytes(bytes: Uint8Array): RetrievalKit;
/**
* @param {Capsule} capsule
* @param {Address[]} queried_addresses
* @param {Conditions | null} conditions
*/
  constructor(capsule: Capsule, queried_addresses: Address[], conditions: Conditions | null);
/**
* @param {MessageKit} message_kit
* @returns {RetrievalKit}
*/
  static fromMessageKit(message_kit: MessageKit): RetrievalKit;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
*/
  readonly capsule: Capsule;
/**
*/
  readonly conditions: Conditions | undefined;
/**
*/
  readonly queriedAddresses: Address[];
}
/**
*/
export class RevocationOrder {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {RevocationOrder}
*/
  static fromBytes(bytes: Uint8Array): RevocationOrder;
/**
* @param {Signer} signer
* @param {Address} staking_provider_address
* @param {EncryptedKeyFrag} encrypted_kfrag
*/
  constructor(signer: Signer, staking_provider_address: Address, encrypted_kfrag: EncryptedKeyFrag);
/**
* @param {PublicKey} alice_verifying_key
* @returns {[Address, EncryptedKeyFrag]}
*/
  verify(alice_verifying_key: PublicKey): [Address, EncryptedKeyFrag];
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class SecretKey {
  free(): void;
/**
* Generates a secret key using the default RNG and returns it.
* @returns {SecretKey}
*/
  static random(): SecretKey;
/**
* @returns {Uint8Array}
*/
  toBEBytes(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {SecretKey}
*/
  static fromBEBytes(data: Uint8Array): SecretKey;
/**
* Generates a secret key using the default RNG and returns it.
* @returns {PublicKey}
*/
  publicKey(): PublicKey;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {SecretKey} other
* @returns {boolean}
*/
  equals(other: SecretKey): boolean;
}
/**
*/
export class SecretKeyFactory {
  free(): void;
/**
* Generates a secret key factory using the default RNG and returns it.
* @returns {SecretKeyFactory}
*/
  static random(): SecretKeyFactory;
/**
* @returns {number}
*/
  static seedSize(): number;
/**
* @param {Uint8Array} seed
* @returns {SecretKeyFactory}
*/
  static fromSecureRandomness(seed: Uint8Array): SecretKeyFactory;
/**
* @param {Uint8Array} label
* @returns {Uint8Array}
*/
  makeSecret(label: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} label
* @returns {SecretKey}
*/
  makeKey(label: Uint8Array): SecretKey;
/**
* @param {Uint8Array} label
* @returns {SecretKeyFactory}
*/
  makeFactory(label: Uint8Array): SecretKeyFactory;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class SessionSecretFactory {
  free(): void;
/**
* @returns {string}
*/
  toString(): string;
/**
* Generates a secret key factory using the default RNG and returns it.
* @returns {SessionSecretFactory}
*/
  static random(): SessionSecretFactory;
/**
* @returns {number}
*/
  static seedSize(): number;
/**
* @param {Uint8Array} seed
* @returns {SessionSecretFactory}
*/
  static fromSecureRandomness(seed: Uint8Array): SessionSecretFactory;
/**
* @param {Uint8Array} label
* @returns {SessionStaticSecret}
*/
  makeKey(label: Uint8Array): SessionStaticSecret;
}
/**
*/
export class SessionSharedSecret {
  free(): void;
}
/**
*/
export class SessionStaticKey {
  free(): void;
/**
* @param {SessionStaticKey} other
* @returns {boolean}
*/
  equals(other: SessionStaticKey): boolean;
/**
* @param {Uint8Array} bytes
* @returns {SessionStaticKey}
*/
  static fromBytes(bytes: Uint8Array): SessionStaticKey;
/**
* @returns {string}
*/
  toString(): string;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class SessionStaticSecret {
  free(): void;
/**
* @returns {string}
*/
  toString(): string;
/**
* Generates a secret key using the default RNG and returns it.
* @returns {SessionStaticSecret}
*/
  static random(): SessionStaticSecret;
/**
* Generates a secret key using the default RNG and returns it.
* @returns {SessionStaticKey}
*/
  publicKey(): SessionStaticKey;
/**
* @param {SessionStaticKey} their_public_key
* @returns {SessionSharedSecret}
*/
  deriveSharedSecret(their_public_key: SessionStaticKey): SessionSharedSecret;
}
/**
*/
export class SharedSecret {
  free(): void;
/**
* @param {SharedSecret} other
* @returns {boolean}
*/
  equals(other: SharedSecret): boolean;
/**
* @param {Uint8Array} bytes
* @returns {SharedSecret}
*/
  static fromBytes(bytes: Uint8Array): SharedSecret;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class Signature {
  free(): void;
/**
* @param {PublicKey} verifying_pk
* @param {Uint8Array} message
* @returns {boolean}
*/
  verify(verifying_pk: PublicKey, message: Uint8Array): boolean;
/**
* @returns {Uint8Array}
*/
  toDerBytes(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {Signature}
*/
  static fromDerBytes(data: Uint8Array): Signature;
/**
* @returns {Uint8Array}
*/
  toBEBytes(): Uint8Array;
/**
* @param {Uint8Array} data
* @returns {Signature}
*/
  static fromBEBytes(data: Uint8Array): Signature;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {Signature} other
* @returns {boolean}
*/
  equals(other: Signature): boolean;
}
/**
*/
export class Signer {
  free(): void;
/**
* @param {SecretKey} secret_key
*/
  constructor(secret_key: SecretKey);
/**
* @param {Uint8Array} message
* @returns {Signature}
*/
  sign(message: Uint8Array): Signature;
/**
* @returns {PublicKey}
*/
  verifyingKey(): PublicKey;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class ThresholdDecryptionRequest {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {ThresholdDecryptionRequest}
*/
  static fromBytes(bytes: Uint8Array): ThresholdDecryptionRequest;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {ThresholdDecryptionRequest} other
* @returns {boolean}
*/
  equals(other: ThresholdDecryptionRequest): boolean;
/**
* @param {number} ritual_id
* @param {FerveoVariant} variant
* @param {CiphertextHeader} ciphertext_header
* @param {AccessControlPolicy} acp
* @param {Context | null} context
*/
  constructor(ritual_id: number, variant: FerveoVariant, ciphertext_header: CiphertextHeader, acp: AccessControlPolicy, context: Context | null);
/**
* @param {SessionSharedSecret} shared_secret
* @param {SessionStaticKey} requester_public_key
* @returns {EncryptedThresholdDecryptionRequest}
*/
  encrypt(shared_secret: SessionSharedSecret, requester_public_key: SessionStaticKey): EncryptedThresholdDecryptionRequest;
/**
*/
  readonly acp: AccessControlPolicy;
/**
*/
  readonly ciphertextHeader: CiphertextHeader;
/**
*/
  readonly ritualId: number;
/**
*/
  readonly variant: FerveoVariant;
}
/**
*/
export class ThresholdDecryptionResponse {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {ThresholdDecryptionResponse}
*/
  static fromBytes(bytes: Uint8Array): ThresholdDecryptionResponse;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {number} ritual_id
* @param {Uint8Array} decryption_share
*/
  constructor(ritual_id: number, decryption_share: Uint8Array);
/**
* @param {SessionSharedSecret} shared_secret
* @returns {EncryptedThresholdDecryptionResponse}
*/
  encrypt(shared_secret: SessionSharedSecret): EncryptedThresholdDecryptionResponse;
/**
*/
  readonly decryptionShare: Uint8Array;
/**
*/
  readonly ritualId: number;
}
/**
*/
export class ThresholdMessageKit {
  free(): void;
/**
* @param {Uint8Array} bytes
* @returns {ThresholdMessageKit}
*/
  static fromBytes(bytes: Uint8Array): ThresholdMessageKit;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @param {ThresholdMessageKit} other
* @returns {boolean}
*/
  equals(other: ThresholdMessageKit): boolean;
/**
* @param {Ciphertext} ciphertext
* @param {AccessControlPolicy} acp
*/
  constructor(ciphertext: Ciphertext, acp: AccessControlPolicy);
/**
* @param {SharedSecret} shared_secret
* @returns {Uint8Array}
*/
  decryptWithSharedSecret(shared_secret: SharedSecret): Uint8Array;
/**
*/
  readonly acp: AccessControlPolicy;
/**
*/
  readonly ciphertextHeader: CiphertextHeader;
}
/**
*/
export class Transcript {
  free(): void;
/**
* @param {Transcript} other
* @returns {boolean}
*/
  equals(other: Transcript): boolean;
/**
* @param {Uint8Array} bytes
* @returns {Transcript}
*/
  static fromBytes(bytes: Uint8Array): Transcript;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
}
/**
*/
export class TreasureMap {
  free(): void;
/**
* @param {TreasureMap} other
* @returns {boolean}
*/
  equals(other: TreasureMap): boolean;
/**
* @param {Uint8Array} bytes
* @returns {TreasureMap}
*/
  static fromBytes(bytes: Uint8Array): TreasureMap;
/**
* @param {Signer} signer
* @param {HRAC} hrac
* @param {PublicKey} policy_encrypting_key
* @param {[Address, [PublicKey, VerifiedKeyFrag]][]} assigned_kfrags
* @param {number} threshold
*/
  constructor(signer: Signer, hrac: HRAC, policy_encrypting_key: PublicKey, assigned_kfrags: [Address, [PublicKey, VerifiedKeyFrag]][], threshold: number);
/**
* @param {Signer} signer
* @param {PublicKey} recipient_key
* @returns {EncryptedTreasureMap}
*/
  encrypt(signer: Signer, recipient_key: PublicKey): EncryptedTreasureMap;
/**
* @param {Signer} signer
* @returns {RevocationOrder | null}
*/
  makeRevocationOrders(signer: Signer): RevocationOrder | null;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
*/
  readonly destinations: [Address, EncryptedKeyFrag][];
/**
*/
  readonly hrac: HRAC;
/**
*/
  readonly policyEncryptingKey: PublicKey;
/**
*/
  readonly publisherVerifyingKey: PublicKey;
/**
*/
  readonly threshold: number;
}
/**
*/
export class Validator {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @param {EthereumAddress} address
* @param {FerveoPublicKey} public_key
*/
  constructor(address: EthereumAddress, public_key: FerveoPublicKey);
/**
*/
  readonly address: EthereumAddress;
/**
*/
  readonly publicKey: FerveoPublicKey;
}
/**
*/
export class ValidatorMessage {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @param {Validator} validator
* @param {Transcript} transcript
*/
  constructor(validator: Validator, transcript: Transcript);
/**
*/
  readonly transcript: Transcript;
/**
*/
  readonly validator: Validator;
}
/**
*/
export class VerifiedCapsuleFrag {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @returns {CapsuleFrag}
*/
  unverify(): CapsuleFrag;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  toBytesSimple(): Uint8Array;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {VerifiedCapsuleFrag} other
* @returns {boolean}
*/
  equals(other: VerifiedCapsuleFrag): boolean;
}
/**
*/
export class VerifiedKeyFrag {
  free(): void;
/**
* @returns {string}
*/
  __getClassname(): string;
/**
* @returns {Uint8Array}
*/
  toBytes(): Uint8Array;
/**
* @returns {string}
*/
  toString(): string;
/**
* @param {VerifiedKeyFrag} other
* @returns {boolean}
*/
  equals(other: VerifiedKeyFrag): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly conditions___getClassname: (a: number, b: number) => void;
  readonly __wbg_conditions_free: (a: number) => void;
  readonly conditions_toString: (a: number, b: number) => void;
  readonly conditions_equals: (a: number, b: number) => number;
  readonly conditions_new: (a: number, b: number) => number;
  readonly conditions_fromBytes: (a: number, b: number) => number;
  readonly context___getClassname: (a: number, b: number) => void;
  readonly context_toString: (a: number, b: number) => void;
  readonly context_new: (a: number, b: number) => number;
  readonly context_fromBytes: (a: number, b: number) => number;
  readonly address___getClassname: (a: number, b: number) => void;
  readonly __wbg_address_free: (a: number) => void;
  readonly address_equals: (a: number, b: number) => number;
  readonly address_new: (a: number, b: number, c: number) => void;
  readonly address_toBytes: (a: number, b: number) => void;
  readonly __wbg_messagekit_free: (a: number) => void;
  readonly messagekit_equals: (a: number, b: number) => number;
  readonly messagekit_fromBytes: (a: number, b: number, c: number) => void;
  readonly messagekit_toBytes: (a: number, b: number) => void;
  readonly messagekit_new: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly messagekit_decrypt: (a: number, b: number, c: number) => void;
  readonly messagekit_capsule: (a: number) => number;
  readonly messagekit_conditions: (a: number) => number;
  readonly messagekit_decryptReencrypted: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_hrac_free: (a: number) => void;
  readonly hrac_toString: (a: number, b: number) => void;
  readonly hrac_equals: (a: number, b: number) => number;
  readonly hrac_new: (a: number, b: number, c: number, d: number) => number;
  readonly hrac_fromBytes: (a: number, b: number, c: number) => void;
  readonly hrac_toBytes: (a: number, b: number) => void;
  readonly encryptedkeyfrag___getClassname: (a: number, b: number) => void;
  readonly __wbg_encryptedkeyfrag_free: (a: number) => void;
  readonly encryptedkeyfrag_fromBytes: (a: number, b: number, c: number) => void;
  readonly encryptedkeyfrag_new: (a: number, b: number, c: number, d: number) => number;
  readonly encryptedkeyfrag_decrypt: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly encryptedkeyfrag_toBytes: (a: number, b: number) => void;
  readonly __wbg_treasuremap_free: (a: number) => void;
  readonly treasuremap_equals: (a: number, b: number) => number;
  readonly treasuremap_fromBytes: (a: number, b: number, c: number) => void;
  readonly treasuremap_new: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly treasuremap_encrypt: (a: number, b: number, c: number) => number;
  readonly treasuremap_destinations: (a: number) => number;
  readonly treasuremap_makeRevocationOrders: (a: number, b: number) => number;
  readonly treasuremap_hrac: (a: number) => number;
  readonly treasuremap_threshold: (a: number) => number;
  readonly treasuremap_policyEncryptingKey: (a: number) => number;
  readonly treasuremap_publisherVerifyingKey: (a: number) => number;
  readonly treasuremap_toBytes: (a: number, b: number) => void;
  readonly encryptedtreasuremap_equals: (a: number, b: number) => number;
  readonly encryptedtreasuremap_fromBytes: (a: number, b: number, c: number) => void;
  readonly encryptedtreasuremap_decrypt: (a: number, b: number, c: number, d: number) => void;
  readonly encryptedtreasuremap_toBytes: (a: number, b: number) => void;
  readonly __wbg_sessionsharedsecret_free: (a: number) => void;
  readonly sessionstatickey_equals: (a: number, b: number) => number;
  readonly sessionstatickey_fromBytes: (a: number, b: number, c: number) => void;
  readonly sessionstatickey_toString: (a: number, b: number) => void;
  readonly sessionstatickey_toBytes: (a: number, b: number) => void;
  readonly __wbg_sessionstaticsecret_free: (a: number) => void;
  readonly sessionstaticsecret_toString: (a: number, b: number) => void;
  readonly sessionstaticsecret_random: () => number;
  readonly sessionstaticsecret_publicKey: (a: number) => number;
  readonly sessionstaticsecret_deriveSharedSecret: (a: number, b: number) => number;
  readonly __wbg_sessionsecretfactory_free: (a: number) => void;
  readonly sessionsecretfactory_toString: (a: number, b: number) => void;
  readonly sessionsecretfactory_random: () => number;
  readonly sessionsecretfactory_fromSecureRandomness: (a: number, b: number, c: number) => void;
  readonly sessionsecretfactory_makeKey: (a: number, b: number, c: number) => number;
  readonly __wbg_authenticateddata_free: (a: number) => void;
  readonly authenticateddata_fromBytes: (a: number, b: number, c: number) => void;
  readonly authenticateddata_toBytes: (a: number, b: number) => void;
  readonly authenticateddata_equals: (a: number, b: number) => number;
  readonly authenticateddata_new: (a: number, b: number, c: number) => void;
  readonly authenticateddata_aad: (a: number, b: number) => void;
  readonly authenticateddata_publicKey: (a: number) => number;
  readonly authenticateddata_conditions: (a: number) => number;
  readonly encryptForDkg: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_accesscontrolpolicy_free: (a: number) => void;
  readonly accesscontrolpolicy_fromBytes: (a: number, b: number, c: number) => void;
  readonly accesscontrolpolicy_toBytes: (a: number, b: number) => void;
  readonly accesscontrolpolicy_equals: (a: number, b: number) => number;
  readonly accesscontrolpolicy_new: (a: number, b: number, c: number, d: number) => void;
  readonly accesscontrolpolicy_aad: (a: number, b: number) => void;
  readonly accesscontrolpolicy_publicKey: (a: number) => number;
  readonly accesscontrolpolicy_authorization: (a: number, b: number) => void;
  readonly accesscontrolpolicy_conditions: (a: number) => number;
  readonly __wbg_thresholdmessagekit_free: (a: number) => void;
  readonly thresholdmessagekit_fromBytes: (a: number, b: number, c: number) => void;
  readonly thresholdmessagekit_toBytes: (a: number, b: number) => void;
  readonly thresholdmessagekit_equals: (a: number, b: number) => number;
  readonly thresholdmessagekit_new: (a: number, b: number) => number;
  readonly thresholdmessagekit_ciphertextHeader: (a: number, b: number) => void;
  readonly thresholdmessagekit_acp: (a: number) => number;
  readonly thresholdmessagekit_decryptWithSharedSecret: (a: number, b: number, c: number) => void;
  readonly __wbg_thresholddecryptionrequest_free: (a: number) => void;
  readonly thresholddecryptionrequest_fromBytes: (a: number, b: number, c: number) => void;
  readonly thresholddecryptionrequest_toBytes: (a: number, b: number) => void;
  readonly thresholddecryptionrequest_equals: (a: number, b: number) => number;
  readonly thresholddecryptionrequest_new: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly thresholddecryptionrequest_ritualId: (a: number) => number;
  readonly thresholddecryptionrequest_variant: (a: number) => number;
  readonly thresholddecryptionrequest_ciphertextHeader: (a: number) => number;
  readonly thresholddecryptionrequest_acp: (a: number) => number;
  readonly thresholddecryptionrequest_encrypt: (a: number, b: number, c: number) => number;
  readonly __wbg_encryptedthresholddecryptionrequest_free: (a: number) => void;
  readonly encryptedthresholddecryptionrequest_fromBytes: (a: number, b: number, c: number) => void;
  readonly encryptedthresholddecryptionrequest_toBytes: (a: number, b: number) => void;
  readonly encryptedthresholddecryptionrequest_ritualId: (a: number) => number;
  readonly encryptedthresholddecryptionrequest_requesterPublicKey: (a: number) => number;
  readonly encryptedthresholddecryptionrequest_decrypt: (a: number, b: number, c: number) => void;
  readonly thresholddecryptionresponse_fromBytes: (a: number, b: number, c: number) => void;
  readonly thresholddecryptionresponse_toBytes: (a: number, b: number) => void;
  readonly thresholddecryptionresponse_new: (a: number, b: number, c: number, d: number) => void;
  readonly thresholddecryptionresponse_decryptionShare: (a: number, b: number) => void;
  readonly thresholddecryptionresponse_encrypt: (a: number, b: number) => number;
  readonly encryptedthresholddecryptionresponse_fromBytes: (a: number, b: number, c: number) => void;
  readonly encryptedthresholddecryptionresponse_toBytes: (a: number, b: number) => void;
  readonly encryptedthresholddecryptionresponse_decrypt: (a: number, b: number, c: number) => void;
  readonly __wbg_reencryptionrequest_free: (a: number) => void;
  readonly reencryptionrequest_fromBytes: (a: number, b: number, c: number) => void;
  readonly reencryptionrequest_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly reencryptionrequest_hrac: (a: number) => number;
  readonly reencryptionrequest_publisherVerifyingKey: (a: number) => number;
  readonly reencryptionrequest_bobVerifyingKey: (a: number) => number;
  readonly reencryptionrequest_encryptedKfrag: (a: number) => number;
  readonly reencryptionrequest_capsules: (a: number) => number;
  readonly reencryptionrequest_toBytes: (a: number, b: number) => void;
  readonly reencryptionrequest_conditions: (a: number) => number;
  readonly reencryptionrequest_context: (a: number) => number;
  readonly __wbg_reencryptionresponse_free: (a: number) => void;
  readonly reencryptionresponse_fromBytes: (a: number, b: number, c: number) => void;
  readonly reencryptionresponse_new: (a: number, b: number, c: number) => void;
  readonly reencryptionresponse_toBytes: (a: number, b: number) => void;
  readonly reencryptionresponse_verify: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly __wbg_retrievalkit_free: (a: number) => void;
  readonly retrievalkit_fromBytes: (a: number, b: number, c: number) => void;
  readonly retrievalkit_new: (a: number, b: number, c: number, d: number) => void;
  readonly retrievalkit_fromMessageKit: (a: number) => number;
  readonly retrievalkit_capsule: (a: number) => number;
  readonly retrievalkit_queriedAddresses: (a: number) => number;
  readonly retrievalkit_toBytes: (a: number, b: number) => void;
  readonly retrievalkit_conditions: (a: number) => number;
  readonly __wbg_revocationorder_free: (a: number) => void;
  readonly revocationorder_fromBytes: (a: number, b: number, c: number) => void;
  readonly revocationorder_new: (a: number, b: number, c: number, d: number) => void;
  readonly revocationorder_verify: (a: number, b: number, c: number) => void;
  readonly revocationorder_toBytes: (a: number, b: number) => void;
  readonly __wbg_nodemetadatapayload_free: (a: number) => void;
  readonly nodemetadatapayload_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => void;
  readonly nodemetadatapayload_staking_provider_address: (a: number) => number;
  readonly nodemetadatapayload_verifyingKey: (a: number) => number;
  readonly nodemetadatapayload_encryptingKey: (a: number) => number;
  readonly nodemetadatapayload_operator_signature: (a: number) => number;
  readonly nodemetadatapayload_domain: (a: number, b: number) => void;
  readonly nodemetadatapayload_host: (a: number, b: number) => void;
  readonly nodemetadatapayload_port: (a: number) => number;
  readonly nodemetadatapayload_timestampEpoch: (a: number) => number;
  readonly nodemetadatapayload_certificate_der: (a: number, b: number) => void;
  readonly nodemetadatapayload_deriveOperatorAddress: (a: number, b: number) => void;
  readonly nodemetadata___getClassname: (a: number, b: number) => void;
  readonly __wbg_nodemetadata_free: (a: number) => void;
  readonly nodemetadata_fromBytes: (a: number, b: number, c: number) => void;
  readonly nodemetadata_new: (a: number, b: number) => number;
  readonly nodemetadata_verify: (a: number) => number;
  readonly nodemetadata_payload: (a: number) => number;
  readonly nodemetadata_toBytes: (a: number, b: number) => void;
  readonly __wbg_fleetstatechecksum_free: (a: number) => void;
  readonly fleetstatechecksum_toString: (a: number, b: number) => void;
  readonly fleetstatechecksum_new: (a: number, b: number, c: number) => void;
  readonly fleetstatechecksum_toBytes: (a: number, b: number) => void;
  readonly __wbg_metadatarequest_free: (a: number) => void;
  readonly metadatarequest_fromBytes: (a: number, b: number, c: number) => void;
  readonly metadatarequest_new: (a: number, b: number, c: number) => void;
  readonly metadatarequest_fleetStateChecksum: (a: number) => number;
  readonly metadatarequest_announceNodes: (a: number) => number;
  readonly metadatarequest_toBytes: (a: number, b: number) => void;
  readonly __wbg_metadataresponsepayload_free: (a: number) => void;
  readonly metadataresponsepayload_new: (a: number, b: number, c: number) => void;
  readonly __wbg_metadataresponse_free: (a: number) => void;
  readonly metadataresponse_fromBytes: (a: number, b: number, c: number) => void;
  readonly metadataresponse_new: (a: number, b: number) => number;
  readonly metadataresponse_verify: (a: number, b: number, c: number) => void;
  readonly metadataresponse_toBytes: (a: number, b: number) => void;
  readonly thresholddecryptionresponse_ritualId: (a: number) => number;
  readonly encryptedthresholddecryptionresponse_ritualId: (a: number) => number;
  readonly metadataresponsepayload_timestamp_epoch: (a: number) => number;
  readonly context_equals: (a: number, b: number) => number;
  readonly sessionsecretfactory_seedSize: () => number;
  readonly __wbg_sessionstatickey_free: (a: number) => void;
  readonly metadataresponsepayload_announceNodes: (a: number) => number;
  readonly __wbg_context_free: (a: number) => void;
  readonly __wbg_encryptedtreasuremap_free: (a: number) => void;
  readonly __wbg_thresholddecryptionresponse_free: (a: number) => void;
  readonly __wbg_encryptedthresholddecryptionresponse_free: (a: number) => void;
  readonly __wbg_secretkey_free: (a: number) => void;
  readonly secretkey_random: () => number;
  readonly secretkey_toBEBytes: (a: number, b: number) => void;
  readonly secretkey_fromBEBytes: (a: number, b: number, c: number) => void;
  readonly secretkey_publicKey: (a: number) => number;
  readonly secretkey_toString: (a: number, b: number) => void;
  readonly secretkey_equals: (a: number, b: number) => number;
  readonly __wbg_secretkeyfactory_free: (a: number) => void;
  readonly secretkeyfactory_random: () => number;
  readonly secretkeyfactory_fromSecureRandomness: (a: number, b: number, c: number) => void;
  readonly secretkeyfactory_makeSecret: (a: number, b: number, c: number, d: number) => void;
  readonly secretkeyfactory_makeKey: (a: number, b: number, c: number) => number;
  readonly secretkeyfactory_makeFactory: (a: number, b: number, c: number) => number;
  readonly secretkeyfactory_toString: (a: number, b: number) => void;
  readonly publickey___getClassname: (a: number, b: number) => void;
  readonly __wbg_publickey_free: (a: number) => void;
  readonly publickey_toCompressedBytes: (a: number, b: number) => void;
  readonly publickey_fromCompressedBytes: (a: number, b: number, c: number) => void;
  readonly publickey_recoverFromPrehash: (a: number, b: number, c: number, d: number) => void;
  readonly publickey_toString: (a: number, b: number) => void;
  readonly publickey_equals: (a: number, b: number) => number;
  readonly __wbg_signer_free: (a: number) => void;
  readonly signer_new: (a: number) => number;
  readonly signer_sign: (a: number, b: number, c: number) => number;
  readonly signer_verifyingKey: (a: number) => number;
  readonly signer_toString: (a: number, b: number) => void;
  readonly __wbg_signature_free: (a: number) => void;
  readonly signature_verify: (a: number, b: number, c: number, d: number) => number;
  readonly signature_toDerBytes: (a: number, b: number) => void;
  readonly signature_fromDerBytes: (a: number, b: number, c: number) => void;
  readonly signature_toBEBytes: (a: number, b: number) => void;
  readonly signature_fromBEBytes: (a: number, b: number, c: number) => void;
  readonly signature_toString: (a: number, b: number) => void;
  readonly signature_equals: (a: number, b: number) => number;
  readonly __wbg_recoverablesignature_free: (a: number) => void;
  readonly recoverablesignature_toBEBytes: (a: number, b: number) => void;
  readonly recoverablesignature_fromBEBytes: (a: number, b: number, c: number) => void;
  readonly recoverablesignature_toString: (a: number, b: number) => void;
  readonly recoverablesignature_equals: (a: number, b: number) => number;
  readonly capsule___getClassname: (a: number, b: number) => void;
  readonly __wbg_capsule_free: (a: number) => void;
  readonly capsule_toBytes: (a: number, b: number) => void;
  readonly capsule_toBytesSimple: (a: number, b: number) => void;
  readonly capsule_fromBytes: (a: number, b: number, c: number) => void;
  readonly capsule_toString: (a: number, b: number) => void;
  readonly capsule_equals: (a: number, b: number) => number;
  readonly __wbg_capsulefrag_free: (a: number) => void;
  readonly capsulefrag_verify: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly capsulefrag_toBytes: (a: number, b: number) => void;
  readonly capsulefrag_toBytesSimple: (a: number, b: number) => void;
  readonly capsulefrag_fromBytes: (a: number, b: number, c: number) => void;
  readonly capsulefrag_toString: (a: number, b: number) => void;
  readonly capsulefrag_skipVerification: (a: number) => number;
  readonly capsulefrag_equals: (a: number, b: number) => number;
  readonly verifiedcapsulefrag___getClassname: (a: number, b: number) => void;
  readonly verifiedcapsulefrag_toString: (a: number, b: number) => void;
  readonly encrypt: (a: number, b: number, c: number, d: number) => void;
  readonly decryptOriginal: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly decryptReencrypted: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly __wbg_keyfrag_free: (a: number) => void;
  readonly keyfrag_verify: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly keyfrag_toBytes: (a: number, b: number) => void;
  readonly keyfrag_fromBytes: (a: number, b: number, c: number) => void;
  readonly keyfrag_toString: (a: number, b: number) => void;
  readonly keyfrag_skipVerification: (a: number) => number;
  readonly keyfrag_equals: (a: number, b: number) => number;
  readonly verifiedkeyfrag___getClassname: (a: number, b: number) => void;
  readonly verifiedkeyfrag_toString: (a: number, b: number) => void;
  readonly generateKFrags: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly reencrypt: (a: number, b: number) => number;
  readonly __wbg_curvepoint_free: (a: number) => void;
  readonly curvepoint_coordinates: (a: number) => number;
  readonly parameters_new: () => number;
  readonly parameters_u: (a: number) => number;
  readonly __wbg_reencryptionevidence_free: (a: number) => void;
  readonly reencryptionevidence_new: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly reencryptionevidence_toBytes: (a: number, b: number) => void;
  readonly reencryptionevidence_fromBytes: (a: number, b: number, c: number) => void;
  readonly reencryptionevidence_ez: (a: number) => number;
  readonly reencryptionevidence_e1: (a: number) => number;
  readonly reencryptionevidence_e1h: (a: number) => number;
  readonly reencryptionevidence_e2: (a: number) => number;
  readonly reencryptionevidence_v: (a: number) => number;
  readonly reencryptionevidence_vz: (a: number) => number;
  readonly reencryptionevidence_v1: (a: number) => number;
  readonly reencryptionevidence_v1h: (a: number) => number;
  readonly reencryptionevidence_v2: (a: number) => number;
  readonly reencryptionevidence_uz: (a: number) => number;
  readonly reencryptionevidence_u1: (a: number) => number;
  readonly reencryptionevidence_u1h: (a: number) => number;
  readonly reencryptionevidence_u2: (a: number) => number;
  readonly reencryptionevidence_kfragValidityMessageHash: (a: number) => number;
  readonly reencryptionevidence_kfragSignatureV: (a: number) => number;
  readonly verifiedcapsulefrag_equals: (a: number, b: number) => number;
  readonly verifiedkeyfrag_equals: (a: number, b: number) => number;
  readonly reencryptionevidence_e: (a: number) => number;
  readonly verifiedcapsulefrag_unverify: (a: number) => number;
  readonly verifiedcapsulefrag_toBytesSimple: (a: number, b: number) => void;
  readonly __wbg_verifiedcapsulefrag_free: (a: number) => void;
  readonly __wbg_verifiedkeyfrag_free: (a: number) => void;
  readonly __wbg_parameters_free: (a: number) => void;
  readonly secretkeyfactory_seedSize: () => number;
  readonly verifiedcapsulefrag_toBytes: (a: number, b: number) => void;
  readonly verifiedkeyfrag_toBytes: (a: number, b: number) => void;
  readonly __wbg_ferveovariant_free: (a: number) => void;
  readonly ferveovariant_equals: (a: number, b: number) => number;
  readonly ferveovariant_fromBytes: (a: number, b: number, c: number) => void;
  readonly ferveovariant_toBytes: (a: number, b: number) => void;
  readonly ferveovariant_precomputed: () => number;
  readonly ferveovariant_simple: () => number;
  readonly ferveovariant_toString: (a: number, b: number) => void;
  readonly decryptionsharesimple___getClassname: (a: number, b: number) => void;
  readonly __wbg_decryptionsharesimple_free: (a: number) => void;
  readonly decryptionsharesimple_equals: (a: number, b: number) => number;
  readonly decryptionsharesimple_fromBytes: (a: number, b: number, c: number) => void;
  readonly decryptionsharesimple_toBytes: (a: number, b: number) => void;
  readonly decryptionshareprecomputed___getClassname: (a: number, b: number) => void;
  readonly __wbg_decryptionshareprecomputed_free: (a: number) => void;
  readonly decryptionshareprecomputed_equals: (a: number, b: number) => number;
  readonly decryptionshareprecomputed_fromBytes: (a: number, b: number, c: number) => void;
  readonly decryptionshareprecomputed_toBytes: (a: number, b: number) => void;
  readonly __wbg_ferveopublickey_free: (a: number) => void;
  readonly ferveopublickey_equals: (a: number, b: number) => number;
  readonly ferveopublickey_fromBytes: (a: number, b: number, c: number) => void;
  readonly ferveopublickey_toBytes: (a: number, b: number) => void;
  readonly __wbg_ciphertext_free: (a: number) => void;
  readonly ciphertext_header: (a: number, b: number) => void;
  readonly ciphertext_payload: (a: number, b: number) => void;
  readonly ciphertext_equals: (a: number, b: number) => number;
  readonly ciphertext_fromBytes: (a: number, b: number, c: number) => void;
  readonly ciphertext_toBytes: (a: number, b: number) => void;
  readonly __wbg_ciphertextheader_free: (a: number) => void;
  readonly ciphertextheader_equals: (a: number, b: number) => number;
  readonly ciphertextheader_fromBytes: (a: number, b: number, c: number) => void;
  readonly ciphertextheader_toBytes: (a: number, b: number) => void;
  readonly ferveoEncrypt: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbg_sharedsecret_free: (a: number) => void;
  readonly sharedsecret_equals: (a: number, b: number) => number;
  readonly sharedsecret_fromBytes: (a: number, b: number, c: number) => void;
  readonly sharedsecret_toBytes: (a: number, b: number) => void;
  readonly combineDecryptionSharesSimple: (a: number, b: number) => void;
  readonly combineDecryptionSharesPrecomputed: (a: number, b: number) => void;
  readonly decryptWithSharedSecret: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_dkgpublickey_free: (a: number) => void;
  readonly dkgpublickey_equals: (a: number, b: number) => number;
  readonly dkgpublickey_fromBytes: (a: number, b: number, c: number) => void;
  readonly dkgpublickey_toBytes: (a: number, b: number) => void;
  readonly dkgpublickey_random: () => number;
  readonly __wbg_dkg_free: (a: number) => void;
  readonly dkg_new: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly dkg_publicKey: (a: number) => number;
  readonly dkg_generateTranscript: (a: number, b: number) => void;
  readonly dkg_aggregateTranscript: (a: number, b: number, c: number) => void;
  readonly transcript_fromBytes: (a: number, b: number, c: number) => void;
  readonly transcript_toBytes: (a: number, b: number) => void;
  readonly __wbg_ethereumaddress_free: (a: number) => void;
  readonly ethereumaddress_fromString: (a: number, b: number, c: number) => void;
  readonly ethereumaddress_toString: (a: number, b: number) => void;
  readonly validator___getClassname: (a: number, b: number) => void;
  readonly __wbg_validator_free: (a: number) => void;
  readonly validator_new: (a: number, b: number, c: number) => void;
  readonly validator_publicKey: (a: number) => number;
  readonly validator_address: (a: number) => number;
  readonly validatormessage___getClassname: (a: number, b: number) => void;
  readonly __wbg_validatormessage_free: (a: number) => void;
  readonly validatormessage_new: (a: number, b: number, c: number) => void;
  readonly validatormessage_validator: (a: number) => number;
  readonly validatormessage_transcript: (a: number) => number;
  readonly __wbg_aggregatedtranscript_free: (a: number) => void;
  readonly aggregatedtranscript_equals: (a: number, b: number) => number;
  readonly aggregatedtranscript_fromBytes: (a: number, b: number, c: number) => void;
  readonly aggregatedtranscript_toBytes: (a: number, b: number) => void;
  readonly aggregatedtranscript_new: (a: number, b: number) => void;
  readonly aggregatedtranscript_verify: (a: number, b: number, c: number, d: number) => void;
  readonly aggregatedtranscript_createDecryptionSharePrecomputed: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly aggregatedtranscript_createDecryptionShareSimple: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly __wbg_keypair_free: (a: number) => void;
  readonly keypair_equals: (a: number, b: number) => number;
  readonly keypair_fromBytes: (a: number, b: number, c: number) => void;
  readonly keypair_toBytes: (a: number, b: number) => void;
  readonly keypair_publicKey: (a: number) => number;
  readonly keypair_random: () => number;
  readonly keypair_fromSecureRandomness: (a: number, b: number, c: number) => void;
  readonly transcript_equals: (a: number, b: number) => number;
  readonly __wbg_transcript_free: (a: number) => void;
  readonly ferveopublickey_serializedSize: () => number;
  readonly dkgpublickey_serializedSize: () => number;
  readonly keypair_secureRandomnessSize: () => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

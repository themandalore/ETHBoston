import { DkgPublicKey, ThresholdMessageKit } from '@nucypher/nucypher-core';
import { ChecksumAddress, Domain } from '@nucypher/shared';
import { ethers } from 'ethers';
import { Condition } from './conditions/condition';
import { CustomContextParam } from './conditions/context';
/**
 * Encrypts a message under given conditions using a public key from an active DKG ritual.
 *
 * @export
 * @param {ethers.providers.Provider} provider - Instance of ethers provider which is used to interact with
 * your selected network.
 * @param {Domain} domain - Represents the logical network in which the encryption will be performed.
 * Must match the `ritualId`.
 * @param {Uint8Array | string} message  - The message to be encrypted.
 * @param {Condition} condition - Condition under which the message will be encrypted. Those conditions must be
 * satisfied in order to decrypt the message.
 * @param {number} ritualId - The ID of the DKG Ritual to be used for encryption. The message will be encrypted
 * under the public key of this ritual.
 * @param {ethers.Signer} authSigner - The signer that will be used to sign the encrypter authorization.
 *
 * @returns {Promise<ThresholdMessageKit>} Returns Promise that resolves with an instance of ThresholdMessageKit.
 * It represents the encrypted message.
 *
 * @throws {Error} If the active DKG Ritual cannot be retrieved an error is thrown.
 */
export declare const encrypt: (provider: ethers.providers.Provider, domain: Domain, message: Uint8Array | string, condition: Condition, ritualId: number, authSigner: ethers.Signer) => Promise<ThresholdMessageKit>;
/**
 * Encrypts a message with the given DKG public key under a specified condition.
 *
 * @export
 * @param {Uint8Array | string} message  - The message to be encrypted.
 * @param {Condition} condition - Condition under which the message will be encrypted. Those conditions must be
 * satisfied in order to decrypt the message.
 * @param {DkgPublicKey} dkgPublicKey - The public key of an active DKG Ritual to be used for encryption
 * @param {ethers.Signer} authSigner - The signer that will be used to sign the encrypter authorization.
 *
 * @returns {Promise<ThresholdMessageKit>} Returns Promise that resolves with an instance of ThresholdMessageKit.
 * It represents the encrypted message.
 *
 * @throws {Error} If the encryption process throws an error, an error is thrown.
 */
export declare const encryptWithPublicKey: (message: Uint8Array | string, condition: Condition, dkgPublicKey: DkgPublicKey, authSigner: ethers.Signer) => Promise<ThresholdMessageKit>;
/**
 * Decrypts an encrypted message.
 *
 * @export
 * @param {ethers.providers.Provider} provider - Instance of ethers provider which is used to interact with
 * your selected network.
 * @param {Domain} domain - Represents the logical network in which the decryption will be performed.
 * Must match the `ritualId`.
 * @param {ThresholdMessageKit} messageKit - The kit containing the message to be decrypted
 * @param {string} [porterUri] - The URI for the Porter service. If not provided, a value will be obtained
 * from the Domain
 * @param {ethers.Signer} [signer] - An optional signer for the decryption
 * @param {Record<string, CustomContextParam>} [customParameters] - Optional custom parameters that may be required
 * depending on the condition used
 *
 * @returns {Promise<Uint8Array>} Returns Promise that resolves with a decrypted message
 *
 * @throws {Error} If the active DKG Ritual cannot be retrieved or decryption process throws an error,
 * an error is thrown.
 */
export declare const decrypt: (provider: ethers.providers.Provider, domain: Domain, messageKit: ThresholdMessageKit, porterUri?: string, signer?: ethers.Signer, customParameters?: Record<string, CustomContextParam>) => Promise<Uint8Array>;
/**
 * Checks if the encryption from the provided messageKit is authorized for the specified ritual.
 *
 * @export
 * @param {ethers.providers.Provider} provider - Instance of ethers provider which is used to interact with
 * your selected network.
 * @param {Domain} domain - The domain which was used to encrypt the network. Must match the `ritualId`.
 * @param {ThresholdMessageKit} messageKit - The encrypted message kit to be checked.
 * @param {number} ritualId - The ID of the DKG Ritual under which the messageKit was supposedly encrypted.
 *
 * @returns {Promise<boolean>} Returns a Promise that resolves with the authorization status.
 * True if authorized, false otherwise
 */
export declare const isAuthorized: (provider: ethers.providers.Provider, domain: Domain, messageKit: ThresholdMessageKit, ritualId: number) => Promise<boolean>;
export declare const registerEncrypters: (provider: ethers.providers.Provider, signer: ethers.Signer, domain: Domain, ritualId: number, encrypters: ChecksumAddress[]) => Promise<void>;

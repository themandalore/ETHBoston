"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEncrypters = exports.isAuthorized = exports.decrypt = exports.encryptWithPublicKey = exports.encrypt = void 0;
const nucypher_core_1 = require("@nucypher/nucypher-core");
const shared_1 = require("@nucypher/shared");
const utils_1 = require("ethers/lib/utils");
const condition_expr_1 = require("./conditions/condition-expr");
const dkg_1 = require("./dkg");
const tdec_1 = require("./tdec");
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
const encrypt = async (provider, domain, message, condition, ritualId, authSigner) => {
    // TODO(#264): Enable ritual initialization
    // if (ritualId === undefined) {
    //   ritualId = await DkgClient.initializeRitual(
    //     provider,
    //     this.cohort.ursulaAddresses,
    //     true
    //   );
    // }
    // if (ritualId === undefined) {
    //   // Given that we just initialized the ritual, this should never happen
    //   throw new Error('Ritual ID is undefined');
    // }
    const dkgRitual = await dkg_1.DkgClient.getActiveRitual(provider, domain, ritualId);
    return await (0, exports.encryptWithPublicKey)(message, condition, dkgRitual.dkgPublicKey, authSigner);
};
exports.encrypt = encrypt;
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
const encryptWithPublicKey = async (message, condition, dkgPublicKey, authSigner) => {
    if (typeof message === 'string') {
        message = (0, shared_1.toBytes)(message);
    }
    const conditionExpr = new condition_expr_1.ConditionExpression(condition);
    const [ciphertext, authenticatedData] = (0, nucypher_core_1.encryptForDkg)(message, dkgPublicKey, conditionExpr.toWASMConditions());
    const headerHash = (0, utils_1.keccak256)(ciphertext.header.toBytes());
    const authorization = await authSigner.signMessage((0, shared_1.fromHexString)(headerHash));
    const acp = new nucypher_core_1.AccessControlPolicy(authenticatedData, (0, shared_1.fromHexString)(authorization));
    return new nucypher_core_1.ThresholdMessageKit(ciphertext, acp);
};
exports.encryptWithPublicKey = encryptWithPublicKey;
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
const decrypt = async (provider, domain, messageKit, porterUri, signer, customParameters) => {
    if (!porterUri) {
        porterUri = (0, shared_1.getPorterUri)(domain);
    }
    const ritualId = await shared_1.DkgCoordinatorAgent.getRitualIdFromPublicKey(provider, domain, messageKit.acp.publicKey);
    const ritual = await dkg_1.DkgClient.getActiveRitual(provider, domain, ritualId);
    return (0, tdec_1.retrieveAndDecrypt)(provider, domain, porterUri, messageKit, ritualId, ritual.sharesNum, ritual.threshold, signer, customParameters);
};
exports.decrypt = decrypt;
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
const isAuthorized = async (provider, domain, messageKit, ritualId) => shared_1.DkgCoordinatorAgent.isEncryptionAuthorized(provider, domain, ritualId, messageKit);
exports.isAuthorized = isAuthorized;
const registerEncrypters = async (provider, signer, domain, ritualId, encrypters) => {
    await shared_1.GlobalAllowListAgent.registerEncrypters(provider, signer, domain, ritualId, encrypters);
};
exports.registerEncrypters = registerEncrypters;
//# sourceMappingURL=taco.js.map
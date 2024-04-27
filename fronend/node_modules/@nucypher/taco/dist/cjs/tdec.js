"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveAndDecrypt = exports.encryptMessage = void 0;
const nucypher_core_1 = require("@nucypher/nucypher-core");
const shared_1 = require("@nucypher/shared");
const utils_1 = require("ethers/lib/utils");
const context_1 = require("./conditions/context");
const ERR_DECRYPTION_FAILED = (errors) => `Threshold of responses not met; TACo decryption failed with errors: ${JSON.stringify(errors)}`;
const ERR_RITUAL_ID_MISMATCH = (expectedRitualId, ritualIds) => `Ritual id mismatch. Expected ${expectedRitualId}, got ${ritualIds}`;
const encryptMessage = async (plaintext, encryptingKey, conditions, authSigner) => {
    const [ciphertext, authenticatedData] = (0, nucypher_core_1.encryptForDkg)(plaintext instanceof Uint8Array ? plaintext : (0, shared_1.toBytes)(plaintext), encryptingKey, conditions.toWASMConditions());
    const headerHash = (0, utils_1.keccak256)(ciphertext.header.toBytes());
    const authorization = await authSigner.signMessage((0, utils_1.arrayify)(headerHash));
    const acp = new nucypher_core_1.AccessControlPolicy(authenticatedData, (0, shared_1.toBytes)(authorization));
    return new nucypher_core_1.ThresholdMessageKit(ciphertext, acp);
};
exports.encryptMessage = encryptMessage;
// Retrieve and decrypt ciphertext using provider and condition expression
const retrieveAndDecrypt = async (provider, domain, porterUri, thresholdMessageKit, ritualId, sharesNum, threshold, signer, customParameters) => {
    const decryptionShares = await retrieve(provider, domain, porterUri, thresholdMessageKit, ritualId, sharesNum, threshold, signer, customParameters);
    const sharedSecret = (0, nucypher_core_1.combineDecryptionSharesSimple)(decryptionShares);
    return thresholdMessageKit.decryptWithSharedSecret(sharedSecret);
};
exports.retrieveAndDecrypt = retrieveAndDecrypt;
// Retrieve decryption shares
const retrieve = async (provider, domain, porterUri, thresholdMessageKit, ritualId, sharesNum, threshold, signer, customParameters) => {
    const dkgParticipants = await shared_1.DkgCoordinatorAgent.getParticipants(provider, domain, ritualId, sharesNum);
    const wasmContext = await context_1.ConditionContext.fromConditions(provider, thresholdMessageKit.acp.conditions, signer, customParameters).toWASMContext();
    const { sharedSecrets, encryptedRequests } = await makeDecryptionRequests(ritualId, wasmContext, dkgParticipants, thresholdMessageKit);
    const porter = new shared_1.PorterClient(porterUri);
    const { encryptedResponses, errors } = await porter.tacoDecrypt(encryptedRequests, threshold);
    if (Object.keys(encryptedResponses).length < threshold) {
        throw new Error(ERR_DECRYPTION_FAILED(errors));
    }
    return makeDecryptionShares(encryptedResponses, sharedSecrets, ritualId);
};
const makeDecryptionShares = (encryptedResponses, sessionSharedSecret, expectedRitualId) => {
    const decryptedResponses = Object.entries(encryptedResponses).map(([ursula, response]) => response.decrypt(sessionSharedSecret[ursula]));
    const ritualIds = decryptedResponses.map(({ ritualId }) => ritualId);
    if (ritualIds.some((ritualId) => ritualId !== expectedRitualId)) {
        throw new Error(ERR_RITUAL_ID_MISMATCH(expectedRitualId, ritualIds));
    }
    return decryptedResponses.map(({ decryptionShare }) => nucypher_core_1.DecryptionShareSimple.fromBytes(decryptionShare));
};
const makeDecryptionRequests = async (ritualId, wasmContext, dkgParticipants, thresholdMessageKit) => {
    const decryptionRequest = new nucypher_core_1.ThresholdDecryptionRequest(ritualId, nucypher_core_1.FerveoVariant.simple, thresholdMessageKit.ciphertextHeader, thresholdMessageKit.acp, wasmContext);
    const ephemeralSessionKey = makeSessionKey();
    // Compute shared secrets for each participant
    const sharedSecrets = Object.fromEntries(dkgParticipants.map(({ provider, decryptionRequestStaticKey }) => {
        const sharedSecret = ephemeralSessionKey.deriveSharedSecret(decryptionRequestStaticKey);
        return [provider, sharedSecret];
    }));
    // Create encrypted requests for each participant
    const encryptedRequests = Object.fromEntries(Object.entries(sharedSecrets).map(([provider, sessionSharedSecret]) => {
        const encryptedRequest = decryptionRequest.encrypt(sessionSharedSecret, ephemeralSessionKey.publicKey());
        return [provider, encryptedRequest];
    }));
    return { sharedSecrets, encryptedRequests };
};
// Moving to a separate function to make it easier to mock
const makeSessionKey = () => nucypher_core_1.SessionStaticSecret.random();
//# sourceMappingURL=tdec.js.map
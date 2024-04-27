import { AccessControlPolicy, combineDecryptionSharesSimple, DecryptionShareSimple, encryptForDkg, FerveoVariant, SessionStaticSecret, ThresholdDecryptionRequest, ThresholdMessageKit, } from '@nucypher/nucypher-core';
import { DkgCoordinatorAgent, PorterClient, toBytes, } from '@nucypher/shared';
import { arrayify, keccak256 } from 'ethers/lib/utils';
import { ConditionContext } from './conditions/context';
const ERR_DECRYPTION_FAILED = (errors) => `Threshold of responses not met; TACo decryption failed with errors: ${JSON.stringify(errors)}`;
const ERR_RITUAL_ID_MISMATCH = (expectedRitualId, ritualIds) => `Ritual id mismatch. Expected ${expectedRitualId}, got ${ritualIds}`;
export const encryptMessage = async (plaintext, encryptingKey, conditions, authSigner) => {
    const [ciphertext, authenticatedData] = encryptForDkg(plaintext instanceof Uint8Array ? plaintext : toBytes(plaintext), encryptingKey, conditions.toWASMConditions());
    const headerHash = keccak256(ciphertext.header.toBytes());
    const authorization = await authSigner.signMessage(arrayify(headerHash));
    const acp = new AccessControlPolicy(authenticatedData, toBytes(authorization));
    return new ThresholdMessageKit(ciphertext, acp);
};
// Retrieve and decrypt ciphertext using provider and condition expression
export const retrieveAndDecrypt = async (provider, domain, porterUri, thresholdMessageKit, ritualId, sharesNum, threshold, signer, customParameters) => {
    const decryptionShares = await retrieve(provider, domain, porterUri, thresholdMessageKit, ritualId, sharesNum, threshold, signer, customParameters);
    const sharedSecret = combineDecryptionSharesSimple(decryptionShares);
    return thresholdMessageKit.decryptWithSharedSecret(sharedSecret);
};
// Retrieve decryption shares
const retrieve = async (provider, domain, porterUri, thresholdMessageKit, ritualId, sharesNum, threshold, signer, customParameters) => {
    const dkgParticipants = await DkgCoordinatorAgent.getParticipants(provider, domain, ritualId, sharesNum);
    const wasmContext = await ConditionContext.fromConditions(provider, thresholdMessageKit.acp.conditions, signer, customParameters).toWASMContext();
    const { sharedSecrets, encryptedRequests } = await makeDecryptionRequests(ritualId, wasmContext, dkgParticipants, thresholdMessageKit);
    const porter = new PorterClient(porterUri);
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
    return decryptedResponses.map(({ decryptionShare }) => DecryptionShareSimple.fromBytes(decryptionShare));
};
const makeDecryptionRequests = async (ritualId, wasmContext, dkgParticipants, thresholdMessageKit) => {
    const decryptionRequest = new ThresholdDecryptionRequest(ritualId, FerveoVariant.simple, thresholdMessageKit.ciphertextHeader, thresholdMessageKit.acp, wasmContext);
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
const makeSessionKey = () => SessionStaticSecret.random();
//# sourceMappingURL=tdec.js.map
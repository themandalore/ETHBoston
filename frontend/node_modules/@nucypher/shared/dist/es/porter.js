import { CapsuleFrag, EncryptedThresholdDecryptionResponse, PublicKey, } from '@nucypher/nucypher-core';
import axios from 'axios';
import qs from 'qs';
import { fromBase64, fromHexString, toBase64, toHexString } from './utils';
const porterUri = {
    mainnet: 'https://porter.nucypher.community',
    tapir: 'https://porter-tapir.nucypher.community',
    oryx: 'https://porter-oryx.nucypher.community',
    lynx: 'https://porter-lynx.nucypher.community',
};
export const domains = {
    DEVNET: 'lynx',
    TESTNET: 'tapir',
    MAINNET: 'mainnet',
};
export const getPorterUri = (domain) => {
    const uri = porterUri[domain];
    if (!uri) {
        throw new Error(`No default Porter URI found for domain: ${domain}`);
    }
    return porterUri[domain];
};
export class PorterClient {
    porterUrl;
    constructor(porterUri) {
        this.porterUrl = new URL(porterUri);
    }
    async getUrsulas(quantity, excludeUrsulas = [], includeUrsulas = []) {
        const params = {
            quantity,
            exclude_ursulas: excludeUrsulas,
            include_ursulas: includeUrsulas,
        };
        const resp = await axios.get(new URL('/get_ursulas', this.porterUrl).toString(), {
            params,
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'comma' });
            },
        });
        return resp.data.result.ursulas.map((u) => ({
            checksumAddress: u.checksum_address,
            uri: u.uri,
            encryptingKey: PublicKey.fromCompressedBytes(fromHexString(u.encrypting_key)),
        }));
    }
    async retrieveCFrags(treasureMap, retrievalKits, aliceVerifyingKey, bobEncryptingKey, bobVerifyingKey, conditionContextJSON = undefined) {
        const data = {
            treasure_map: toBase64(treasureMap.toBytes()),
            retrieval_kits: retrievalKits.map((rk) => toBase64(rk.toBytes())),
            alice_verifying_key: toHexString(aliceVerifyingKey.toCompressedBytes()),
            bob_encrypting_key: toHexString(bobEncryptingKey.toCompressedBytes()),
            bob_verifying_key: toHexString(bobVerifyingKey.toCompressedBytes()),
            context: conditionContextJSON,
        };
        const resp = await axios.post(new URL('/retrieve_cfrags', this.porterUrl).toString(), data);
        return resp.data.result.retrieval_results.map(({ cfrags, errors }) => {
            const parsed = Object.keys(cfrags).map((address) => [
                address,
                CapsuleFrag.fromBytes(fromBase64(cfrags[address])),
            ]);
            const cFrags = Object.fromEntries(parsed);
            return { cFrags, errors };
        });
    }
    async tacoDecrypt(encryptedRequests, threshold) {
        const data = {
            encrypted_decryption_requests: Object.fromEntries(Object.entries(encryptedRequests).map(([ursula, encryptedRequest]) => [
                ursula,
                toBase64(encryptedRequest.toBytes()),
            ])),
            threshold,
        };
        const resp = await axios.post(new URL('/decrypt', this.porterUrl).toString(), data);
        const { encrypted_decryption_responses, errors } = resp.data.result.decryption_results;
        const decryptionResponses = Object.entries(encrypted_decryption_responses).map(([address, encryptedResponseBase64]) => {
            const encryptedResponse = EncryptedThresholdDecryptionResponse.fromBytes(fromBase64(encryptedResponseBase64));
            return [address, encryptedResponse];
        });
        const encryptedResponses = Object.fromEntries(decryptionResponses);
        return { encryptedResponses, errors };
    }
}
//# sourceMappingURL=porter.js.map
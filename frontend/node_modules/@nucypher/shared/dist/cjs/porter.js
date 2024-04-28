"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorterClient = exports.getPorterUri = exports.domains = void 0;
const nucypher_core_1 = require("@nucypher/nucypher-core");
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const utils_1 = require("./utils");
const porterUri = {
    mainnet: 'https://porter.nucypher.community',
    tapir: 'https://porter-tapir.nucypher.community',
    oryx: 'https://porter-oryx.nucypher.community',
    lynx: 'https://porter-lynx.nucypher.community',
};
exports.domains = {
    DEVNET: 'lynx',
    TESTNET: 'tapir',
    MAINNET: 'mainnet',
};
const getPorterUri = (domain) => {
    const uri = porterUri[domain];
    if (!uri) {
        throw new Error(`No default Porter URI found for domain: ${domain}`);
    }
    return porterUri[domain];
};
exports.getPorterUri = getPorterUri;
class PorterClient {
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
        const resp = await axios_1.default.get(new URL('/get_ursulas', this.porterUrl).toString(), {
            params,
            paramsSerializer: (params) => {
                return qs_1.default.stringify(params, { arrayFormat: 'comma' });
            },
        });
        return resp.data.result.ursulas.map((u) => ({
            checksumAddress: u.checksum_address,
            uri: u.uri,
            encryptingKey: nucypher_core_1.PublicKey.fromCompressedBytes((0, utils_1.fromHexString)(u.encrypting_key)),
        }));
    }
    async retrieveCFrags(treasureMap, retrievalKits, aliceVerifyingKey, bobEncryptingKey, bobVerifyingKey, conditionContextJSON = undefined) {
        const data = {
            treasure_map: (0, utils_1.toBase64)(treasureMap.toBytes()),
            retrieval_kits: retrievalKits.map((rk) => (0, utils_1.toBase64)(rk.toBytes())),
            alice_verifying_key: (0, utils_1.toHexString)(aliceVerifyingKey.toCompressedBytes()),
            bob_encrypting_key: (0, utils_1.toHexString)(bobEncryptingKey.toCompressedBytes()),
            bob_verifying_key: (0, utils_1.toHexString)(bobVerifyingKey.toCompressedBytes()),
            context: conditionContextJSON,
        };
        const resp = await axios_1.default.post(new URL('/retrieve_cfrags', this.porterUrl).toString(), data);
        return resp.data.result.retrieval_results.map(({ cfrags, errors }) => {
            const parsed = Object.keys(cfrags).map((address) => [
                address,
                nucypher_core_1.CapsuleFrag.fromBytes((0, utils_1.fromBase64)(cfrags[address])),
            ]);
            const cFrags = Object.fromEntries(parsed);
            return { cFrags, errors };
        });
    }
    async tacoDecrypt(encryptedRequests, threshold) {
        const data = {
            encrypted_decryption_requests: Object.fromEntries(Object.entries(encryptedRequests).map(([ursula, encryptedRequest]) => [
                ursula,
                (0, utils_1.toBase64)(encryptedRequest.toBytes()),
            ])),
            threshold,
        };
        const resp = await axios_1.default.post(new URL('/decrypt', this.porterUrl).toString(), data);
        const { encrypted_decryption_responses, errors } = resp.data.result.decryption_results;
        const decryptionResponses = Object.entries(encrypted_decryption_responses).map(([address, encryptedResponseBase64]) => {
            const encryptedResponse = nucypher_core_1.EncryptedThresholdDecryptionResponse.fromBytes((0, utils_1.fromBase64)(encryptedResponseBase64));
            return [address, encryptedResponse];
        });
        const encryptedResponses = Object.fromEntries(decryptionResponses);
        return { encryptedResponses, errors };
    }
}
exports.PorterClient = PorterClient;
//# sourceMappingURL=porter.js.map